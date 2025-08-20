import { Hero } from "@/components/sections/Hero";
import Header from "@/components/Header";
import { Gallery } from "@/components/sections/Gallery";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20"> {/* offset for fixed header */}
        <Hero />
      </div>
      <Gallery />
      <Features />
      {/* Botón Empieza a Personalizar antes de los comentarios */}
      <div className="flex justify-center py-12">
        <Link to="/personalizar">
          <Button className="btn-hero text-lg px-8 py-6">
            Empieza a Personalizar
          </Button>
        </Link>
      </div>
      <Testimonials />
  <Footer />
    </div>
  );
};

export default Index;