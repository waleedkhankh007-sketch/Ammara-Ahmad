import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border-l border-white/10 h-full flex flex-col shadow-2xl shadow-black"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#0f0f0f]">
              <div>
                <h2 className="font-black text-3xl tracking-tighter text-white uppercase">Your Bucket</h2>
                <p className="text-[10px] text-white/30 font-black tracking-widest uppercase mt-1">Colonel Club Exclusive</p>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Trash2 className="w-10 h-10 text-white/10" />
                  </div>
                  <p className="font-black text-white/20 uppercase tracking-[0.3em] text-xs">Bucket is currently empty</p>
                  <button onClick={onClose} className="mt-4 text-[#e4002b] font-black text-xs hover:underline tracking-widest">START ORDER</button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    className="flex gap-6 group"
                  >
                    <div className="w-24 h-24 rounded-3xl overflow-hidden flex-shrink-0 bg-black border border-white/5">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-black text-white tracking-tighter uppercase truncate pr-4 text-lg">{item.name}</h4>
                        <span className="font-mono font-black text-[#e4002b] shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center bg-white/5 rounded-2xl p-1 border border-white/10">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1.5 hover:bg-white/10 rounded-xl transition-all text-white/40 hover:text-[#e4002b] disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-mono font-bold text-sm text-white">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1.5 hover:bg-white/10 rounded-xl transition-all text-white/40 hover:text-[#e4002b]"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="p-2 text-white/10 hover:text-[#e4002b] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-10 border-t border-white/5 bg-[#0f0f0f] space-y-8">
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-white/40 font-black tracking-widest text-[10px] uppercase">
                        <span>Subtotal</span>
                        <span className="font-mono">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-white/60 font-black tracking-widest text-[10px] uppercase">Est. Total</span>
                        <span className="text-4xl font-black text-white tracking-tighter">${subtotal.toFixed(2)}</span>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <button className="w-full py-6 bg-white text-black rounded-full font-black text-lg flex items-center justify-center gap-4 shadow-2xl shadow-black hover:bg-[#e4002b] hover:text-white transition-all active:scale-95">
                        QUICK CHECKOUT
                        <ArrowRight className="w-6 h-6" />
                    </button>
                    <p className="text-center text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">Taxes calculated at next step</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
