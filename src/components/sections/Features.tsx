import { Paintbrush, Type, Layers, Zap } from "lucide-react";

const features = [
  {
    icon: Paintbrush,
    title: "1. Seleccionar Tamaño",
    description: "Elige entre 5 tamaños diferentes, desde 60×30 hasta 90×40 cm"
  },
  {
    icon: Layers,
    title: "2. Subir Imagen",
    description: "Carga tu imagen favorita con controles avanzados de edición"
  },
  {
    icon: Type,
    title: "3. Agregar Texto",
    description: "Personaliza con texto usando más de 10 fuentes gaming"
  },
  {
    icon: Zap,
    title: "4. Activar RGB",
    description: "Agrega efectos de luces RGB para un look más gamer"
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-cyber mb-4">
            Proceso de Personalización
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cuatro pasos simples para crear tu mousepad gamer perfecto
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card-gamer text-center group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-neon">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

  {/* Sección RGB avanzada movida a Index.tsx */}
      </div>
    </section>
  );
};