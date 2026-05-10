import { motion } from 'motion/react';
import { Plus, Flame, Star } from 'lucide-react';
import { MenuItem, MENU_ITEMS } from '../types';

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function Menu({ onAddToCart }: MenuProps) {
  return (
    <section id="menu" className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="flex items-center gap-3 text-[#e4002b] mb-4">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-xs font-black uppercase tracking-[0.3em]">The Colonel's Select</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase leading-none">
              OUR <span className="text-[#e4002b]">CRAFTSMANSHIP</span>
            </h2>
            <p className="text-white/40 max-w-md font-medium">Every piece is hand-breaded and freshly prepared in-store, just for you. No compromises.</p>
          </div>
          
          <div className="flex gap-4 p-1.5 bg-white/5 rounded-full border border-white/10 overflow-x-auto whitespace-nowrap">
            {['ALL', 'BUCKETS', 'BURGERS', 'WINGS', 'SIDES'].map((cat) => (
              <button 
                key={cat}
                className="px-8 py-3 rounded-full text-[10px] font-black tracking-[0.2em] text-white/40 hover:text-white hover:bg-[#e4002b] transition-all uppercase"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {MENU_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-[#121212] rounded-[3rem] border border-white/5 p-8 hover:border-[#e4002b]/30 transition-all duration-700 relative overflow-hidden"
            >
              {item.popular && (
                <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-[#e4002b] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em]">
                  <Flame className="w-3 h-3 fill-current" />
                  Trending
                </div>
              )}
              
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 bg-black/40 border border-white/5">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex justify-between items-start mb-3">
                <h3 className="font-black text-2xl text-white tracking-tighter uppercase">{item.name}</h3>
                <span className="font-mono font-bold text-xl text-[#e4002b] tracking-tighter">${item.price.toFixed(2)}</span>
              </div>
              
              <p className="text-white/40 text-sm mb-8 font-medium leading-relaxed">
                {item.description}
              </p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onAddToCart(item)}
                className="w-full py-5 bg-white text-black rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-[#e4002b] hover:text-white transition-all duration-300 group/btn"
              >
                <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform" />
                ADD TO BUCKET
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
