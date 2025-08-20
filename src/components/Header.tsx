import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import { ShoppingCart } from 'lucide-react';

export const Header = () => {
	return (
	<header className="fixed inset-x-0 top-0 z-50 transform -translate-y-1">
	<div className="backdrop-blur-sm bg-black/40 border-b border-border py-0 overflow-visible">
	<div className="container mx-auto px-6 py-0 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<img src={logo} alt="Dr Mousepad" className="h-32" />
						<div>
							<div className="text-2xl lg:text-3xl font-extrabold tracking-wide text-neon">Dr Mousepad</div>
						</div>
					</div>

					<nav className="flex items-center gap-6">
						<Link to="/" className="text-base lg:text-lg text-muted-foreground hover:text-primary transition-colors">Inicio</Link>
						<Link to="/personalizar" className="text-base lg:text-lg text-muted-foreground hover:text-primary transition-colors">Personalización</Link>
						<button aria-label="Carrito" className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 hover:bg-primary/20">
							<ShoppingCart className="h-6 w-6 text-primary" />
						</button>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
