import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block bg-[#e4002b] text-white text-[10px] font-black px-4 py-1.5 rounded-sm mb-6 tracking-[0.3em] uppercase">
          Trending Near You
        </span>
        
        <h1 className="text-7xl lg:text-[7rem] font-black leading-[0.85] tracking-tighter text-white mb-10">
          ORIGINAL<br/>
          <span className="text-[#e4002b] italic">RECIPE®</span><br/>
          BUCKET
        </h1>
        
        <p className="text-xl text-white/50 max-w-md mb-12 leading-relaxed font-medium">
          12 pieces of the world-famous chicken that started it all. Hand-breaded with 11 herbs and spices.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-white text-black rounded-full font-black flex items-center justify-center gap-4 shadow-2xl shadow-white/5 hover:bg-[#e4002b] hover:text-white transition-all text-lg"
          >
            ORDER NOW — $24.99
            <ArrowRight className="w-6 h-6" />
          </motion.button>
          
          <div className="flex items-center gap-5 px-8 py-4 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
            <div className="relative">
                <Clock className="w-6 h-6 text-[#e4002b]" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Est. Wait Time</p>
              <p className="font-mono font-bold text-white text-lg tracking-tighter">12-18 MINS</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#e4002b]/5 rounded-full blur-[120px] -z-10" />
        
        <div className="relative group">
            <img 
              src="https://picsum.photos/seed/kfc-hero-dark/1200/1200" 
              alt="KFC Bucket Hero"
              className="w-full h-auto drop-shadow-[0_20px_50px_rgba(228,0,43,0.2)] group-hover:scale-105 transition-transform duration-1000 ease-out"
              referrerPolicy="no-referrer"
            />
            
            {/* Visual Persuasion Badge */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -top-10 -right-4 bg-[#121212] p-6 rounded-[2.5rem] shadow-2xl border border-white/5 flex items-center gap-4 backdrop-blur-xl"
            >
              <div className="w-14 h-14 bg-[#e4002b]/10 rounded-full flex items-center justify-center text-3xl">🍗</div>
              <div>
                <p className="text-[10px] items-center uppercase font-black text-[#e4002b] tracking-[0.2em] mb-1">Imagen 4 Quality</p>
                <p className="font-black text-white text-xl tracking-tighter">SUPER CRISPY</p>
              </div>
            </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
