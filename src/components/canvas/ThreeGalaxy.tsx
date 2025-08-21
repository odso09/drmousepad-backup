import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Top-down panoramic starfield. Stars are distributed across an XZ plane and drift
// slowly to create a continuous panorama; camera sits above looking down.
const ThreeGalaxy: React.FC<{ className?: string; starCount?: number }> = ({ className = '', starCount = 18000 }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const frameId = useRef<number | null>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;
    const width = () => el.clientWidth || window.innerWidth;
    const height = () => el.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(width(), height());
    renderer.setClearColor(0x000000, 0); // transparent
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // camera above, looking down to create panoramic top-down view
    const camera = new THREE.PerspectiveCamera(60, width() / height(), 0.1, 4000);
    camera.position.set(0, 180, 0);
    camera.lookAt(0, 0, 0);

    // Parameters for the panoramic plane
    const planeWidth = 2000;
    const planeDepth = 2000;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const speeds = new Float32Array(starCount);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      // distribute on XZ plane with slight Y jitter
      const x = (Math.random() - 0.5) * planeWidth;
      const z = (Math.random() - 0.5) * planeDepth;
      const y = (Math.random() - 0.5) * 6; // small vertical variance

      positions[i3 + 0] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      // star colors mostly white with subtle tinting
      const isWarm = Math.random() < 0.06;
      const color = new THREE.Color(isWarm ? 0xffe9a3 : 0xffffff);
      // add slight cool/purple tint variations
      const tint = Math.random() * 0.12;
      color.offsetHSL(-0.08 + tint, 0.0, -0.05 + tint * 0.02);

      colors[i3 + 0] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // small per-star speed for drift along -Z (towards camera view edge)
      speeds[i] = 0.2 + Math.random() * 1.2;

      sizes[i] = 0.6 + Math.random() * 1.8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: {
        uPixelRatio: { value: window.devicePixelRatio || 1 },
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float uPixelRatio;
        uniform float uTime;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float distZ = -mvPosition.z;
          float pulse = 1.0 + 0.35 * sin(uTime * 1.8 + position.x * 0.005);
          gl_PointSize = size * uPixelRatio * (180.0 / max(12.0, distZ)) * pulse;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          float alpha = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // minimal ambient to keep subtle background
    scene.background = new THREE.Color(0x01010a);

    // animation loop: drift stars along Z, wrapping to create continuous panorama
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    const speedAttr = geometry.getAttribute('speed') as THREE.BufferAttribute;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove);

    let last = performance.now();
    const animate = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;

      // parallax: tilt camera slightly based on mouse, but keep top-down feel
      camera.position.x += (mouse.current.x * 40 - camera.position.x) * 0.06;
      camera.position.z += (mouse.current.y * 20 - camera.position.z) * 0.04;
      camera.lookAt(0, 0, 0);

      // update positions: move stars along +Z so they appear to scroll under camera
      const count = posAttr.count;
      for (let i = 0; i < count; i++) {
        const idx = i * 3 + 2; // z component
        let z = posAttr.array[idx] as number;
        const sp = (speedAttr.array[i] as number) * (10 * delta); // speed scaled
        z += sp;
        // wrap when beyond plane depth/2
        if (z > planeDepth / 2) z -= planeDepth;
        posAttr.array[idx] = z;
      }
      posAttr.needsUpdate = true;

      (material.uniforms as any).uTime.value = now * 0.001;

      renderer.render(scene, camera);
      frameId.current = requestAnimationFrame(animate);
    };
    frameId.current = requestAnimationFrame(animate);

    const onResize = () => {
      const w = width();
      const h = height();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      (material.uniforms as any).uPixelRatio.value = window.devicePixelRatio || 1;
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(el);

    return () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      scene.clear();
      if (renderer.domElement && renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }
    };
  }, [starCount]);

  return <div ref={mountRef} className={`${className} pointer-events-none`} />;
};

export default ThreeGalaxy;
