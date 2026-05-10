import { ShoppingCart, Menu, User, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-black tracking-tighter text-[#e4002b]">
              KFC <span className="text-white font-light">AI</span>
            </div>
          </div>
          
          <div className="hidden md:flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Ordering from</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-[#e4002b]" />
              <span className="text-xs font-bold">Lexington Ave, NYC • <span className="text-green-400">Open</span></span>
            </div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-10 font-bold text-[10px] tracking-widest text-white/60">
          <a href="#menu" className="hover:text-white transition-colors uppercase">Menu</a>
          <a href="#" className="hover:text-white transition-colors uppercase">Deals</a>
          <a href="#" className="hover:text-white transition-colors uppercase">Colonel Club</a>
        </nav>

        <div className="flex items-center gap-6">
           <div className="hidden sm:block text-right">
            <div className="text-xs font-black">4,250 PTS</div>
            <div className="text-[10px] text-[#e4002b] font-black tracking-widest uppercase">Colonel Club</div>
          </div>

          <button className="text-white/60 hover:text-white transition-all">
            <User className="w-5 h-5" />
          </button>
          
          <button 
            onClick={onOpenCart}
            className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10 transition-all relative group"
          >
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-black text-[10px] tracking-widest">CART</span>
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-[#e4002b] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0f0f0f] font-black"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
