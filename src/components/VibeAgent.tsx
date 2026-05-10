import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, X, Bot, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { processVibeOrder } from '../services/geminiService';
import { MenuItem, MENU_ITEMS } from '../types';

interface VibeAgentProps {
  onAddItems: (items: { id: string; quantity: number }[]) => void;
}

export default function VibeAgent({ onAddItems }: VibeAgentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
    { role: 'bot', content: "I'm the Vibe Agent. Use natural language: 'I have $30 and want lunch for 3'. I'll assemble the perfect bucket." }
  ]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const result = await processVibeOrder(userMsg);
      setMessages(prev => [...prev, { role: 'bot', content: result.explanation }]);
      
      if (result.items.length > 0) {
        onAddItems(result.items);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I hit a snag. Care to try again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[150]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
            className="mb-6 w-[350px] sm:w-[420px] bg-[#121212] rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col h-[550px] shadow-black/80"
          >
            {/* Header */}
            <div className="bg-[#0f0f0f] border-b border-white/5 p-8 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-tr from-[#e4002b] to-black rounded-2xl flex items-center justify-center rotate-3 group">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-[0.2em] text-white">Gemini 3.1 Pro</h4>
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-[0.1em]">Agentic Vibe Order Mode</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/5 p-2.5 rounded-full transition-colors text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-black/20">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-5 rounded-[2rem] text-xs font-medium leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-white text-black rounded-tr-none' 
                      : 'bg-white/5 text-white/80 rounded-tl-none border border-white/5 italic'
                  }`}>
                    {m.content}
                    {m.role === 'bot' && i > 0 && !isLoading && (
                        <button className="mt-4 w-full bg-[#e4002b] text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-[#e4002b] transition-all">
                            Apply to Cart
                        </button>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-5 rounded-[2rem] flex items-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin text-[#e4002b]" />
                    <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">Processing Vibe...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-8 bg-[#0f0f0f] border-t border-white/5">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask for your vibe..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-8 pr-16 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-[#e4002b] transition-all"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-3 top-3 bottom-3 aspect-square bg-[#e4002b] text-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#e4002b] transition-all focus:scale-95 shadow-lg shadow-[#e4002b]/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(prev => !prev)}
        className="w-20 h-20 bg-[#e4002b] text-white rounded-[2rem] shadow-2xl flex items-center justify-center hover:bg-black transition-all group shadow-[#e4002b]/30"
      >
        <Sparkles className="w-10 h-10 group-hover:scale-110 transition-transform" />
      </motion.button>
    </div>
  );
}
