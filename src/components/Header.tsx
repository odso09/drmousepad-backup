import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import { ShoppingCart } from 'lucide-react';

export const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
        <div className="backdrop-blur-sm bg-black/40 border-b border-border">
        <div className="container mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Dr Mousepad" className="h-16" />
            <div>
              <div className="text-lg lg:text-xl font-extrabold tracking-widest text-neon">Dr Mousepad</div>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Inicio</Link>
            <Link to="/personalizar" className="text-sm text-muted-foreground hover:text-primary transition-colors">Personalización</Link>
            <button aria-label="Carrito" className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 hover:bg-primary/20">
              <ShoppingCart className="h-5 w-5 text-primary" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
