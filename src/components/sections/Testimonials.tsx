import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Carlos González",
    city: "Asunción",
    rating: 5,
    comment: "¡Increíble calidad! El RGB es espectacular y la personalización quedó perfecta. Muy recomendado.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "María Fernández",
    city: "Ciudad del Este",
    rating: 5,
    comment: "El proceso de diseño es súper fácil y el resultado superó mis expectativas. ¡El mousepad es hermoso!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Diego Ramírez",
    city: "Encarnación",
    rating: 5,
    comment: "Excelente servicio y calidad premium. Las luces RGB dan un toque profesional a mi setup gaming.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Ana López",
    city: "San Lorenzo",
    rating: 5,
    comment: "¡Perfecto para mi setup! La calidad de impresión es excelente y llegó súper rápido.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-cyber mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-xl text-muted-foreground">
            Miles de gamers ya confían en Dr Mousepad
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card-gamer">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 ring-2 ring-primary/20"
                />
                <div>
                  <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.city}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                "{testimonial.comment}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="w-5 h-5 fill-primary text-primary" />
            <span className="font-semibold">4.9/5</span>
            <span>basado en 2,847 reseñas</span>
          </div>
        </div>
      </div>
    </section>
  );
};