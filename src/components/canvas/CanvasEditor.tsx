import { useState, useRef, useCallback } from 'react';
import { Upload, Type, Image as ImageIcon, Palette, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CanvasImage, CanvasText, LogoConfig } from '@/hooks/useCanvasState';

interface CanvasEditorProps {
  size: string;
  setSize: (size: string) => void;
  images: CanvasImage[];
  setImages: (images: CanvasImage[]) => void;
  texts: CanvasText[];
  setTexts: (texts: CanvasText[]) => void;
  logo: LogoConfig;
  setLogo: (logo: LogoConfig) => void;
  rgb: boolean;
  setRgb: (rgb: boolean) => void;
}

const sizes = [
  { value: '90x40', label: '90×40 cm', width: 900, height: 400 },
  { value: '80x40', label: '80×40 cm', width: 800, height: 400 },
  { value: '80x30', label: '80×30 cm', width: 800, height: 300 },
  { value: '70x30', label: '70×30 cm', width: 700, height: 300 },
  { value: '60x30', label: '60×30 cm', width: 600, height: 300 },
];

const fonts = [
  'Arial Black', 'Impact', 'Orbitron', 'Rajdhani', 'Exo 2',
  'Roboto Condensed', 'Bebas Neue', 'Teko', 'Anton', 'Russo One'
];

export const CanvasEditor = ({
  size,
  setSize,
  images,
  setImages,
  texts,
  setTexts,
  logo,
  setLogo,
  rgb,
  setRgb
}: CanvasEditorProps) => {
  const [activeStep, setActiveStep] = useState(1);
  const [newText, setNewText] = useState('');
  const [selectedFont, setSelectedFont] = useState('Arial Black');
  const [textColor, setTextColor] = useState('#ffffff');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentSize = sizes.find(s => s.value === size) || sizes[0];
  const canvasWidth = Math.min(800, currentSize.width);
  const canvasHeight = (canvasWidth * currentSize.height) / currentSize.width;

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const newImage: CanvasImage = {
        id: Date.now().toString(),
        src,
        x: 50,
        y: 50,
        width: 200,
        height: 150,
        rotation: 0
      };
      setImages([...images, newImage]);
    };
    reader.readAsDataURL(file);
  }, [images, setImages]);

  const handleAddText = useCallback(() => {
    if (!newText.trim()) return;

    const text: CanvasText = {
      id: Date.now().toString(),
      text: newText,
      x: 100,
      y: 100,
      fontSize: 32,
      color: textColor,
      fontFamily: selectedFont,
      rotation: 0
    };
    setTexts([...texts, text]);
    setNewText('');
  }, [newText, textColor, selectedFont, texts, setTexts]);

  const removeImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  const removeText = (id: string) => {
    setTexts(texts.filter(text => text.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Size Selection & Image Upload Side by Side */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Selección de tamaño */}
        <div className="card-gamer w-full md:w-1/2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
              1
            </div>
            <h3 className="text-xl font-bold">Seleccionar Tamaño</h3>
          </div>
          <Select value={size} onValueChange={setSize}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sizes.map(sizeOption => (
                <SelectItem key={sizeOption.value} value={sizeOption.value}>
                  {sizeOption.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Subir imagen */}
        <div className="card-gamer w-full md:w-1/2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold">
              2
            </div>
            <h3 className="text-xl font-bold">Subir Imagen</h3>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="btn-cyber w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            Seleccionar Imagen
          </Button>
        </div>
      </div>

      {/* Canvas Preview */}
      <div className="card-gamer">
        <h3 className="text-xl font-bold mb-4">Vista Previa</h3>
        
        <div className="flex justify-center">
          <div 
            className={`border-2 border-dashed border-primary/30 rounded-lg relative overflow-hidden bg-gradient-to-br from-muted/20 to-muted/5 ${
              rgb ? 'animate-rgb-pulse' : ''
            }`}
            style={{ width: canvasWidth, height: canvasHeight }}
          >
            {/* Background Images */}
            {images.map(image => (
              <div
                key={image.id}
                className="absolute cursor-move group"
                style={{
                  left: image.x,
                  top: image.y,
                  width: image.width,
                  height: image.height,
                  transform: `rotate(${image.rotation}deg)`
                }}
              >
                <img
                  src={image.src}
                  alt="Canvas element"
                  className="w-full h-full object-cover rounded"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(image.id)}
                >
                  ×
                </Button>
              </div>
            ))}

            {/* Text Elements */}
            {texts.map(text => (
              <div
                key={text.id}
                className="absolute cursor-move group select-none"
                style={{
                  left: text.x,
                  top: text.y,
                  color: text.color,
                  fontSize: text.fontSize,
                  fontFamily: text.fontFamily,
                  transform: `rotate(${text.rotation}deg)`,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {text.text}
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeText(text.id)}
                >
                  ×
                </Button>
              </div>
            ))}

            {/* Logo */}
            {!logo.removed && (
              <div 
                className={`absolute text-xs font-bold text-primary/70 ${
                  logo.position === 'top-left' ? 'top-2 left-2' :
                  logo.position === 'top-right' ? 'top-2 right-2' :
                  logo.position === 'bottom-left' ? 'bottom-2 left-2' :
                  'bottom-2 right-2'
                }`}
              >
                Dr Mousepad
              </div>
            )}
          </div>
        </div>
      </div>

  {/* ...el resto del código permanece igual... */}

      {/* Opciones: Agregar Texto, Logo, RGB en línea */}
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        {/* Agregar Texto */}
        <div className="card-gamer flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold">3</div>
            <h3 className="text-base font-bold">Agregar Texto</h3>
          </div>
          <div className="space-y-2">
            <Label>Texto</Label>
            <Input value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="Ingresa tu texto..." />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Fuente</Label>
                <Select value={selectedFont} onValueChange={setSelectedFont}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {fonts.map(font => (
                      <SelectItem key={font} value={font} style={{ fontFamily: font }}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Color</Label>
                <div className="flex gap-2">
                  <Input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-10 h-8" />
                  <Input value={textColor} onChange={(e) => setTextColor(e.target.value)} className="flex-1" />
                </div>
              </div>
            </div>
            <Button onClick={handleAddText} className="btn-neon w-full"><Type className="w-4 h-4 mr-2" />Agregar Texto</Button>
          </div>
        </div>
        {/* Logo Dr Mousepad */}
        <div className="card-gamer flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-cyber-orange rounded-full flex items-center justify-center text-background font-bold">4</div>
            <h3 className="text-base font-bold">Logo Dr Mousepad</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Quitar logo (+30,000 Gs)</Label>
              <Switch checked={logo.removed} onCheckedChange={(checked) => setLogo({ ...logo, removed: checked })} />
            </div>
            {!logo.removed && (
              <div>
                <Label>Posición del logo</Label>
                <Select value={logo.position} onValueChange={(position: any) => setLogo({ ...logo, position })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top-left">Superior Izquierda</SelectItem>
                    <SelectItem value="top-right">Superior Derecha</SelectItem>
                    <SelectItem value="bottom-left">Inferior Izquierda</SelectItem>
                    <SelectItem value="bottom-right">Inferior Derecha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
        {/* Luces RGB */}
        <div className="card-gamer flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-neon-pink rounded-full flex items-center justify-center text-background font-bold">5</div>
            <h3 className="text-base font-bold">Luces RGB</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Activar RGB (+50,000 Gs)</Label>
              <p className="text-xs text-muted-foreground">Añade efectos de luces LED sincronizables</p>
            </div>
            <Switch checked={rgb} onCheckedChange={setRgb} />
          </div>
        </div>
      </div>
    </div>
  );
};