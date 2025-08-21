import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type Star = {
  angle: number;
  radius: number;
  speed: number;
  orbitRadius: number;
  baseR: number;
  twinkleOffset: number;
};

const D3Galaxy: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = () => container.clientWidth || window.innerWidth;
    const height = () => container.clientHeight || window.innerHeight;

    const svg = d3
      .select(container)
      .append('svg')
      .attr('class', 'w-full h-full')
      .attr('preserveAspectRatio', 'xMidYMid slice')
      .style('display', 'block')
      .style('position', 'absolute')
      .style('inset', '0');

    svgRef.current = svg.node();

    const center = () => [width() / 2, height() / 2] as const;

    let stars: Star[] = [];
    let circles: d3.Selection<SVGCircleElement, Star, SVGGElement, unknown>;

    const setup = () => {
      svg.attr('width', width()).attr('height', height());
      const [cx, cy] = center();
      const count = Math.max(80, Math.floor((width() * height()) / (1000 * 0.8)));

      stars = d3.range(count).map(() => {
        const orbitRadius = Math.random() * Math.min(cx, cy) * (0.2 + Math.random() * 0.8);
        return {
          angle: Math.random() * Math.PI * 2,
          radius: Math.random() * 1.6 + 0.3,
          speed: (0.0002 + Math.random() * 0.0006) * (Math.random() < 0.5 ? -1 : 1),
          orbitRadius,
          baseR: Math.random() * 1.2 + 0.4,
          twinkleOffset: Math.random() * Math.PI * 2,
        };
      });

      svg.selectAll('*').remove();

      // soft radial gradient backdrop to suggest nebula
      const defs = svg.append('defs');
      const grad = defs
        .append('radialGradient')
        .attr('id', 'nebula-gradient')
        .attr('cx', '50%')
        .attr('cy', '40%');

      grad.append('stop').attr('offset', '0%').attr('stop-color', '#0b1220').attr('stop-opacity', 0.92);
      grad.append('stop').attr('offset', '40%').attr('stop-color', '#0f1530').attr('stop-opacity', 0.75);
      grad.append('stop').attr('offset', '100%').attr('stop-color', '#06070a').attr('stop-opacity', 0.92);

      svg
        .append('rect')
        .attr('width', width())
        .attr('height', height())
        .attr('fill', 'url(#nebula-gradient)');

      // subtle color clouds using blurs
      const clouds = defs.append('filter').attr('id', 'clouds-blur');
      clouds.append('feGaussianBlur').attr('stdDeviation', 40);

      const cloudGroup = svg.append('g').attr('filter', 'url(#clouds-blur)').attr('opacity', 0.06);
      for (let i = 0; i < 6; i++) {
        cloudGroup
          .append('ellipse')
          .attr('cx', cx + (Math.random() - 0.5) * cx)
          .attr('cy', cy + (Math.random() - 0.6) * cy)
          .attr('rx', Math.random() * cx * 0.8)
          .attr('ry', Math.random() * cy * 0.4)
          .attr('fill', ['#6b3b8f', '#8a2be2', '#243b6b', '#8f3b9b'][Math.floor(Math.random() * 4)]);
      }

      // star layer
      const starLayer = svg.append('g').attr('class', 'star-layer');

      circles = starLayer
        .selectAll('circle')
        .data(stars)
        .enter()
        .append('circle')
        .attr('r', (d) => d.baseR)
        .attr('fill', () => (Math.random() < 0.08 ? '#ffe9a3' : '#ffffff'))
        .attr('opacity', 0.8)
        .attr('cx', () => cx + (Math.random() - 0.5) * 10)
        .attr('cy', () => cy + (Math.random() - 0.5) * 10)
        .style('mix-blend-mode', 'screen');
    };

    setup();

    const start = d3.now();

    const tick = () => {
      const [cx, cy] = center();
      const t = (d3.now() - start) / 1000;

      circles.each(function (d: Star) {
        d.angle += d.speed * 60; // scale speed for visible motion
        // small inward/outward gentle oscillation
        const wobble = Math.sin(t * 0.4 + d.twinkleOffset) * (d.orbitRadius * 0.02);
        const r = d.orbitRadius + wobble;
        const x = cx + Math.cos(d.angle) * r;
        const y = cy + Math.sin(d.angle) * r * 0.65;
        d3.select(this).attr('cx', x).attr('cy', y);

        // twinkle
        const tw = 0.5 + 0.5 * Math.sin(t * 6 + d.twinkleOffset);
        const scale = 0.6 + tw * 0.8;
        d3.select(this).attr('r', Math.max(0.2, d.baseR * scale)).attr('opacity', 0.4 + tw * 0.6);
      });
    };

    const timer = d3.timer(() => tick());

    const ro = new ResizeObserver(() => {
      setup();
    });
    ro.observe(container);

    return () => {
      timer.stop();
      ro.disconnect();
      svg.remove();
    };
  }, []);

  return <div ref={containerRef} className={`${className} pointer-events-none`} />;
};

export default D3Galaxy;
