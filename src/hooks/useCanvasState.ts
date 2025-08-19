import { useState, useMemo } from 'react';

export interface CanvasImage {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export interface CanvasText {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
  rotation: number;
}

export interface LogoConfig {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  removed: boolean;
}

export interface PricingInfo {
  basePrice: number;
  logoRemovalCost: number;
  rgbCost: number;
  total: number;
}

export const useCanvasState = () => {
  const [size, setSize] = useState<string>('90x40');
  const [images, setImages] = useState<CanvasImage[]>([]);
  const [texts, setTexts] = useState<CanvasText[]>([]);
  const [logo, setLogo] = useState<LogoConfig>({
    position: 'bottom-right',
    removed: false
  });
  const [rgb, setRgb] = useState<boolean>(false);

  const pricing = useMemo<PricingInfo>(() => {
    const basePrice = 200000; // 200,000 Gs
    const logoRemovalCost = logo.removed ? 30000 : 0;
    const rgbCost = rgb ? 50000 : 0;
    const total = basePrice + logoRemovalCost + rgbCost;

    return {
      basePrice,
      logoRemovalCost,
      rgbCost,
      total
    };
  }, [logo.removed, rgb]);

  return {
    size,
    setSize,
    images,
    setImages,
    texts,
    setTexts,
    logo,
    setLogo,
    rgb,
    setRgb,
    pricing
  };
};