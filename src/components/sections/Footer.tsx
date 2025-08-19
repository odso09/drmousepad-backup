import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const openModalHandler = (modalType: string) => {
    setOpenModal(modalType);
  };

  const closeModal = () => {
    setOpenModal(null);
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-cyber">Dr Mousepad</h3>
            <p className="text-muted-foreground">
              La mejor calidad en mousepads gaming personalizados de Paraguay.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="btn-cyber">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="btn-cyber">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="btn-cyber">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neon">Legal</h4>
            <div className="space-y-2">
              <button
                onClick={() => openModalHandler('terms')}
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Términos y Condiciones
              </button>
              <button
                onClick={() => openModalHandler('privacy')}
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Política de Privacidad
              </button>
              <button
                onClick={() => openModalHandler('faq')}
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                FAQ
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neon">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Av. España 123, Asunción, Paraguay
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                info@drmousepad.com.py
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                +595 21 123-4567
              </div>
            </div>
          </div>

          {/* Contact Button */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neon">Soporte</h4>
            <Button 
              onClick={() => openModalHandler('contact')}
              className="btn-neon w-full"
            >
              Contáctanos
            </Button>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-border text-muted-foreground">
          <p>&copy; 2024 Dr Mousepad. Todos los derechos reservados.</p>
        </div>
      </div>

      {/* Terms Modal */}
      <Dialog open={openModal === 'terms'} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto scrollbar-gamer">
          <DialogHeader>
            <DialogTitle className="text-2xl text-cyber">Términos y Condiciones</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-semibold text-lg mb-2 text-neon">1. Introducción</h3>
              <p className="text-muted-foreground">
                Estos términos y condiciones regulan el uso de los servicios ofrecidos por Dr Mousepad. Al realizar una compra, aceptas estos términos.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold text-lg mb-2 text-neon">2. Propiedad Intelectual</h3>
              <p className="text-muted-foreground">
                El cliente es responsable de que las imágenes y diseños utilizados no infrinjan derechos de autor. Dr Mousepad no se hace responsable por infracciones de propiedad intelectual.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2 text-neon">3. Proceso de Compra</h3>
              <p className="text-muted-foreground">
                Una vez confirmado el pedido y el pago, se iniciará la producción. Los cambios posteriores pueden generar costos adicionales.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2 text-neon">4. Precios y Medios de Pago</h3>
              <p className="text-muted-foreground">
                Los precios están en Guaraníes (Gs) e incluyen IVA. Aceptamos Bancard, Tigo Money y Mercado Pago PY.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2 text-neon">5. Envíos y Entregas</h3>
              <p className="text-muted-foreground">
                Envío gratuito a todo Paraguay. Tiempo de producción: 3-5 días hábiles. Tiempo de entrega: 1-3 días adicionales según la ubicación.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2 text-neon">6. Cambios y Devoluciones</h3>
              <p className="text-muted-foreground">
                Por tratarse de productos personalizados, no se aceptan cambios ni devoluciones, excepto por defectos de fabricación.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2 text-neon">7. Garantías</h3>
              <p className="text-muted-foreground">
                Garantizamos la calidad de materiales y fabricación por 12 meses contra defectos de fábrica.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2 text-neon">8. Limitación de Responsabilidad</h3>
              <p className="text-muted-foreground">
                Dr Mousepad no se responsabiliza por daños indirectos o consecuenciales derivados del uso del producto.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2 text-neon">9. Ley Aplicable</h3>
              <p className="text-muted-foreground">
                Estos términos se rigen por las leyes de la República del Paraguay.
              </p>
            </section>
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Modal */}
      <Dialog open={openModal === 'privacy'} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto scrollbar-gamer">
          <DialogHeader>
            <DialogTitle className="text-2xl text-cyber">Política de Privacidad</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-semibold text-lg mb-2 text-neon">Datos Recolectados</h3>
              <p className="text-muted-foreground">
                Recolectamos nombre, email, teléfono, dirección de entrega e imágenes para personalización.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2 text-neon">Finalidades</h3>
              <p className="text-muted-foreground">
                Los datos se utilizan para procesar pedidos, comunicación, entrega y soporte post-venta.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2 text-neon">Base Legal</h3>
              <p className="text-muted-foreground">
                El tratamiento se basa en la ejecución contractual y consentimiento del cliente.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2 text-neon">Conservación</h3>
              <p className="text-muted-foreground">
                Los datos se conservan durante 5 años para cumplir obligaciones legales y comerciales.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2 text-neon">Derechos ARCO</h3>
              <p className="text-muted-foreground">
                Tienes derecho a acceder, rectificar, cancelar y oponerte al tratamiento de tus datos contactándonos.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2 text-neon">Cookies</h3>
              <p className="text-muted-foreground">
                Utilizamos cookies técnicas y de análisis para mejorar la experiencia del usuario.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2 text-neon">Terceros</h3>
              <p className="text-muted-foreground">
                Compartimos datos con proveedores de pago y logística únicamente para el cumplimiento del servicio.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2 text-neon">Seguridad</h3>
              <p className="text-muted-foreground">
                Implementamos medidas técnicas y organizativas para proteger la información personal.
              </p>
            </section>
          </div>
        </DialogContent>
      </Dialog>

      {/* FAQ Modal */}
      <Dialog open={openModal === 'faq'} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto scrollbar-gamer">
          <DialogHeader>
            <DialogTitle className="text-2xl text-cyber">Preguntas Frecuentes</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-sm">
            {[
              {
                q: "¿Cuánto tiempo toma la producción?",
                a: "El tiempo de producción es de 3-5 días hábiles una vez confirmado el pago."
              },
              {
                q: "¿Qué formatos de imagen aceptan?",
                a: "Aceptamos JPEG y PNG. Recomendamos resolución mínima de 300 DPI para mejor calidad."
              },
              {
                q: "¿Hay límites en el diseño?",
                a: "No hay límites creativos, pero el contenido debe ser apropiado y no infringir derechos de autor."
              },
              {
                q: "¿Cómo funcionan las luces RGB?",
                a: "Las luces RGB son LEDs programables que se sincronizan con efectos predefinidos y personalizables."
              },
              {
                q: "¿Puedo quitar el logo de Dr Mousepad?",
                a: "Sí, por un costo adicional de 30,000 Gs puedes remover nuestro logo del diseño."
              },
              {
                q: "¿Cómo cuidar el producto?",
                a: "Limpia con paño húmedo, no uses químicos abrasivos. Las luces RGB son resistentes al agua."
              },
              {
                q: "¿Qué medios de pago aceptan?",
                a: "Aceptamos Bancard, Tigo Money y Mercado Pago Paraguay."
              },
              {
                q: "¿Hacen envíos a todo el país?",
                a: "Sí, enviamos gratis a todo Paraguay. Tiempo de entrega: 1-3 días según ubicación."
              },
              {
                q: "¿Aceptan devoluciones?",
                a: "Por ser productos personalizados, solo aceptamos devoluciones por defectos de fabricación."
              },
              {
                q: "¿Cómo contactar soporte?",
                a: "Puedes contactarnos por email, teléfono o WhatsApp. Respondemos en menos de 24 horas."
              }
            ].map((faq, index) => (
              <div key={index} className="border-l-2 border-primary/20 pl-4">
                <h4 className="font-semibold text-neon mb-2">{faq.q}</h4>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Modal */}
      <Dialog open={openModal === 'contact'} onOpenChange={closeModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-cyber">Contáctanos</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" placeholder="Tu nombre completo" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" placeholder="+595 XXX XXX XXX" />
              </div>
              <div>
                <Label htmlFor="message">Mensaje</Label>
                <Textarea 
                  id="message" 
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  rows={4}
                />
              </div>
              <Button type="submit" className="btn-neon w-full">
                Enviar Mensaje
              </Button>
            </form>

            <div className="border-t pt-6">
              <h4 className="font-semibold text-neon mb-4">Contacto Directo</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>info@drmousepad.com.py</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+595 21 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">⏰</span>
                  <span>Lun-Vie: 8:00-18:00, Sáb: 8:00-12:00</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                * Respondemos en menos de 24 horas
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};