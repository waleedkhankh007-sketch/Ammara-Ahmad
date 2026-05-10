import { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import VibeAgent from './components/VibeAgent';
import Cart from './components/Cart';
import { MenuItem, CartItem, MENU_ITEMS } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = useCallback((item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  }, []);

  const handleRemoveItem = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleAddVibeItems = useCallback((vibeItems: { id: string; quantity: number }[]) => {
    setCartItems(prev => {
      let newCart = [...prev];
      vibeItems.forEach(vi => {
        const menuItem = MENU_ITEMS.find(mi => mi.id === vi.id);
        if (menuItem) {
          const existingIdx = newCart.findIndex(item => item.id === vi.id);
          if (existingIdx > -1) {
            newCart[existingIdx].quantity += vi.quantity;
          } else {
            newCart.push({ ...menuItem, quantity: vi.quantity });
          }
        }
      });
      return newCart;
    });
    setIsCartOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-white/90 selection:bg-[#e4002b] selection:text-white">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
      />
      
      <main className="bg-[#0a0a0a]">
        <Hero />
        <Menu onAddToCart={handleAddToCart} />
      </main>

      <footer className="bg-[#0f0f0f] text-white py-32 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
          <div>
            <span className="font-black text-5xl block mb-8 tracking-tighter text-[#e4002b]">KFC <span className="text-white font-light">AI</span></span>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-medium">
              Hand-breaded. Freshly prepared. Since 1952. The Colonel's vision lives on in every bucket. Experience ordering evolved.
            </p>
          </div>
          
          <div>
             <h5 className="font-black mb-8 uppercase tracking-[0.3em] text-[10px] text-white/20">Experience</h5>
             <ul className="space-y-5 text-white/60 text-xs font-black tracking-widest uppercase">
               <li><a href="#" className="hover:text-[#e4002b] transition-colors">Digital Menu</a></li>
               <li><a href="#" className="hover:text-[#e4002b] transition-colors">Vibe Agent</a></li>
               <li><a href="#" className="hover:text-[#e4002b] transition-colors">Colonel Club</a></li>
               <li><a href="#" className="hover:text-[#e4002b] transition-colors">Deals</a></li>
             </ul>
          </div>

          <div>
             <h5 className="font-black mb-8 uppercase tracking-[0.3em] text-[10px] text-white/20">The Brand</h5>
             <ul className="space-y-5 text-white/60 text-xs font-black tracking-widest uppercase">
               <li><a href="#" className="hover:text-[#e4002b] transition-colors">Our Kitchen</a></li>
               <li><a href="#" className="hover:text-[#e4002b] transition-colors">Heritage</a></li>
               <li><a href="#" className="hover:text-[#e4002b] transition-colors">Sustainability</a></li>
               <li><a href="#" className="hover:text-[#e4002b] transition-colors">Contact</a></li>
             </ul>
          </div>

          <div>
            <h5 className="font-black mb-8 uppercase tracking-[0.3em] text-[10px] text-white/20">Colonel Club</h5>
            <div className="flex gap-3">
              <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded-full px-6 py-4 text-xs focus:outline-none focus:border-[#e4002b] flex-1 transition-colors" />
              <button className="bg-white text-black p-4 rounded-full hover:bg-[#e4002b] hover:text-white transition-all font-black uppercase text-[10px] tracking-widest px-8">Join</button>
            </div>
            <p className="mt-6 text-[9px] text-white/20 leading-tight uppercase font-bold tracking-widest">By joining, you agree to our Privacy Policy.</p>
          </div>
        </div>

        {/* Decorative background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-[35vw] text-[#e4002b]/[0.01] -z-0 pointer-events-none select-none tracking-tighter whitespace-nowrap uppercase">
          11 Herbs
        </div>
      </footer>

      <VibeAgent onAddItems={handleAddVibeItems} />
      
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
      />
    </div>
  );
}
