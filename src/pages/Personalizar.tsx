import { useState, useRef, useCallback } from 'react';
import { CanvasEditor } from '@/components/canvas/CanvasEditor';
import { SidePanel } from '@/components/canvas/SidePanel';
import { useCanvasState } from '@/hooks/useCanvasState';
import { Header } from '@/components/Header';

const Personalizar = () => {
  const {
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
  } = useCanvasState();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-28">
        <div className="container mx-auto p-6">
          <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyber mb-2">
            Personaliza Tu Mousepad
          </h1>
          <p className="text-muted-foreground">
            Diseña tu mousepad gamer perfecto con nuestro editor avanzado
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <CanvasEditor
              size={size}
              setSize={setSize}
              images={images}
              setImages={setImages}
              texts={texts}
              setTexts={setTexts}
              logo={logo}
              setLogo={setLogo}
              rgb={rgb}
              setRgb={setRgb}
            />
          </div>
          
          <div className="lg:col-span-1">
            <SidePanel
              size={size}
              logo={logo}
              rgb={rgb}
              textCount={texts.length}
              pricing={pricing}
              onAddToCart={() => {
                // Handle add to cart
                console.log('Added to cart:', {
                  size, images, texts, logo, rgb, pricing
                });
              }}
            />
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Personalizar;