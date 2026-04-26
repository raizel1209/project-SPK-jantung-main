import { motion } from 'framer-motion';
import { HeartPulse, Zap, Activity, ShieldCheck } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Floating Particles - Medical colors */}
      <div className="particle absolute top-20 left-10 w-2 h-2 bg-red-400 animate-float" style={{animationDelay: '0s'}}></div>
      <div className="particle absolute top-40 right-20 w-3 h-3 bg-emerald-400 animate-float" style={{animationDelay: '1s'}}></div>
      <div className="particle absolute bottom-32 left-1/4 w-2 h-2 bg-teal-400 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="particle absolute bottom-20 right-10 w-4 h-4 bg-blue-400 animate-float" style={{animationDelay: '0.5s'}}></div>
      <div className="particle absolute top-1/2 left-5 w-1 h-1 bg-emerald-300 animate-float" style={{animationDelay: '1.5s'}}></div>

      <div className="text-center max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="scan-line bg-emerald-400 opacity-75"
        />
        <motion.h1 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-8xl md:text-9xl lg:text-[12rem] font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-600 bg-clip-text text-transparent mb-8 leading-relaxed shadow-heart-glow"
        >
          SPK Jantung
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl text-white mb-12 leading-loose font-light max-w-4xl mx-auto tracking-wide"
        >
          Sistem Deteksi Dini Penyakit Jantung Berbasis AI
          <span className="block text-2xl md:text-3xl text-emerald-200/90 font-mono tracking-widest mt-4">Decision Tree | Dataset UCI | Analisis Real-Time</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-16"
        >
          <motion.a 
            href="/predict"
            whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary text-3xl px-24 py-12 shadow-3xl relative overflow-hidden group"
          >
            <HeartPulse className="w-12 h-12 inline mr-4 group-hover:animate-pulse group-hover:shadow-heart-glow transition-all" />
            <span>Prediksi AI Sekarang</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-white/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-all blur" />
          </motion.a>
          <motion.a 
            href="/dashboard"
            whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
            className="glass-card text-white px-16 py-8 rounded-3xl font-bold text-xl border border-emerald-500/30 hover:border-emerald-400/50 hover:bg-emerald-500/5 backdrop-blur-xl shadow-ecg-glow group relative hover:shadow-heart-glow"
          >
            <span className="block transition-all group-hover:text-emerald-300">Dashboard Medis</span>
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-400/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-all rounded-3xl" />
          </motion.a>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex flex-wrap justify-center gap-6 text-sm text-emerald-400/90 uppercase tracking-[3px] font-mono bg-black/30 py-4 px-8 rounded-full backdrop-blur-xl border border-emerald-500/40 shadow-heart-glow hover:shadow-emerald-glow"
        >
          <span>Dibuat dengan AI</span>
          <span>•</span>
          <span>Decision Tree ML</span>
          <span>•</span>
          <span>303 Sampel UCI</span>
          <span>•</span>
          <span>Akurasi 82%</span>
        </motion.div>
      </div>

      {/* Floating 2D Widgets */}
      <motion.div 
        className="absolute right-16 top-1/4 flex flex-col gap-6 opacity-40 lg:opacity-60"
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="bg-slate-900/50 backdrop-blur border border-emerald-500/30 p-6 rounded-2xl flex items-center gap-4 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
          <Activity className="w-10 h-10 text-emerald-400" />
          <div>
            <div className="h-2 w-16 bg-emerald-500/50 rounded-full mb-2"></div>
            <div className="h-2 w-10 bg-emerald-500/30 rounded-full"></div>
          </div>
        </div>
        <div className="bg-slate-900/50 backdrop-blur border border-blue-500/30 p-6 rounded-2xl flex items-center gap-4 shadow-[0_0_30px_rgba(59,130,246,0.15)] ml-8">
          <ShieldCheck className="w-10 h-10 text-blue-400" />
          <div>
            <div className="h-2 w-16 bg-blue-500/50 rounded-full mb-2"></div>
            <div className="h-2 w-10 bg-blue-500/30 rounded-full"></div>
          </div>
        </div>
      </motion.div>

      {/* Left Side Glow Orb - Medical green */}
      <motion.div 
        className="absolute left-20 top-1/2 w-32 h-32 bg-gradient-radial from-emerald-500/40 to-transparent rounded-full blur-xl opacity-60 shadow-heart-glow"
        animate={{ scale: [1, 1.1, 1], y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}

export default Home;
