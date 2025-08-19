import { Button } from '@/components/ui/button';
import { ShoppingCart, Check, X } from 'lucide-react';
import { PricingInfo, LogoConfig } from '@/hooks/useCanvasState';
import { useState } from 'react';
import { toast } from 'sonner';

interface SidePanelProps {
  size: string;
  logo: LogoConfig;
  rgb: boolean;
  textCount: number;
  pricing: PricingInfo;
  onAddToCart: () => void;
}

export const SidePanel = ({
  size,
  logo,
  rgb,
  textCount,
  pricing,
  onAddToCart
}: SidePanelProps) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onAddToCart();
    toast.success('¡Producto agregado al carrito!', {
      description: 'Tu diseño personalizado ha sido guardado.',
    });
    
    setIsAdding(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PY').format(price);
  };

  return (
    <div className="sticky top-6">
      <div className="card-gamer">
        <h3 className="text-xl font-bold text-cyber mb-6">
          Resumen del Pedido
        </h3>

        <div className="space-y-4 mb-6">
          {/* Size */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Tamaño:</span>
            <span className="font-medium">{size} cm</span>
          </div>

          {/* Texts */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Textos:</span>
            <span className="font-medium">{textCount}</span>
          </div>

          {/* Logo */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Logo Dr Mousepad:</span>
            <div className="flex items-center gap-2">
              {logo.removed ? (
                <>
                  <X className="w-4 h-4 text-destructive" />
                  <span className="text-sm">Removido</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 text-accent" />
                  <span className="text-sm">Incluido</span>
                </>
              )}
            </div>
          </div>

          {/* RGB */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Luces RGB:</span>
            <div className="flex items-center gap-2">
              {rgb ? (
                <>
                  <Check className="w-4 h-4 text-accent" />
                  <span className="text-sm">Activado</span>
                </>
              ) : (
                <>
                  <X className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Desactivado</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="border-t border-border pt-4 space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span>Precio base:</span>
            <span>{formatPrice(pricing.basePrice)} Gs</span>
          </div>
          
          {pricing.logoRemovalCost > 0 && (
            <div className="flex justify-between text-sm">
              <span>Quitar logo:</span>
              <span>+{formatPrice(pricing.logoRemovalCost)} Gs</span>
            </div>
          )}
          
          {pricing.rgbCost > 0 && (
            <div className="flex justify-between text-sm">
              <span>Luces RGB:</span>
              <span>+{formatPrice(pricing.rgbCost)} Gs</span>
            </div>
          )}
          
          <div className="border-t border-border pt-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-neon">{formatPrice(pricing.total)} Gs</span>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="btn-hero w-full"
        >
          {isAdding ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Agregando...
            </div>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Agregar al Carrito
            </>
          )}
        </Button>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>✓ Envío gratis a todo Paraguay</p>
            <p>✓ Producción: 3-5 días hábiles</p>
            <p>✓ Garantía de 1 año</p>
          </div>
        </div>
      </div>
    </div>
  );
};