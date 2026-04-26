import { motion, AnimatePresence } from 'framer-motion';
import { User, Activity, Droplets, HeartPulse, Brain, Stethoscope, AlertTriangle, ShieldCheck } from 'lucide-react';

// Animasi Gelombang EKG 2D
const ECGWave = () => (
  <svg viewBox="0 0 200 100" className="w-full h-32 stroke-emerald-400 stroke-[3px] fill-none drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]">
    <motion.path
      d="M 0,50 L 40,50 L 50,20 L 60,90 L 75,10 L 85,60 L 95,50 L 200,50"
      initial={{ pathLength: 0, opacity: 0.5 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    />
  </svg>
);

// Animasi Lingkaran Ripple 2D
const RippleEffect = ({ color }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border-2"
        style={{ borderColor: color, width: '100px', height: '100px' }}
        initial={{ scale: 0.8, opacity: 1 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
      />
    ))}
  </div>
);

// Komponen Pengganti Visualisasi
export default function Medical3D({ step, values, result }) {
  const stepId = step?.id || (result ? 7 : 0);
  const isHighRisk = result?.risk === 'High';
  const resultColor = isHighRisk ? '#ef4444' : '#10b981';

  const scenes = [
    // Step 0: Usia
    <motion.div key="step0" className="relative flex flex-col items-center justify-center h-full w-full" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
      <RippleEffect color="#3b82f6" />
      <User className="w-32 h-32 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] relative z-10" />
    </motion.div>,

    // Step 1: Jenis Kelamin
    <motion.div key="step1" className="relative flex items-center justify-center h-full w-full gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div animate={{ scale: values?.sex === '1' ? 1.3 : 0.8, opacity: values?.sex === '1' ? 1 : 0.3 }} className="text-blue-400">
        <Activity className="w-24 h-24 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
      </motion.div>
      <motion.div animate={{ scale: values?.sex === '0' ? 1.3 : 0.8, opacity: values?.sex === '0' ? 1 : 0.3 }} className="text-pink-400">
        <User className="w-24 h-24 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
      </motion.div>
    </motion.div>,

    // Step 2: Tekanan Darah
    <motion.div key="step2" className="relative flex items-center justify-center h-full w-full" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <RippleEffect color="#ef4444" />
      <Droplets className="w-32 h-32 text-red-400 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)] relative z-10" />
    </motion.div>,

    // Step 3: Kolesterol
    <motion.div key="step3" className="relative flex items-center justify-center h-full w-full" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
      <div className="w-48 h-48 rounded-full border-8 border-orange-500/30 flex items-center justify-center relative overflow-hidden">
        <motion.div className="absolute bottom-0 w-full bg-orange-400/50" animate={{ height: ['40%', '60%', '40%'] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        <Activity className="w-20 h-20 text-orange-300 relative z-10 drop-shadow-md" />
      </div>
    </motion.div>,

    // Step 4: Gula Darah
    <motion.div key="step4" className="relative flex items-center justify-center h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <RippleEffect color="#a855f7" />
      <Brain className="w-32 h-32 text-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] relative z-10" />
    </motion.div>,

    // Step 5: EKG
    <motion.div key="step5" className="relative flex items-center justify-center h-full w-full px-8" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <ECGWave />
    </motion.div>,

    // Step 6: Detak Jantung
    <motion.div key="step6" className="relative flex items-center justify-center h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <RippleEffect color="#ef4444" />
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
        <HeartPulse className="w-40 h-40 text-red-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.9)] relative z-10" />
      </motion.div>
    </motion.div>,

    // Step 7: Hasil Prediksi
    <motion.div key="step7" className="relative flex flex-col items-center justify-center h-full w-full" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
      <RippleEffect color={resultColor} />
      <motion.div animate={isHighRisk ? { x: [-5, 5, -5] } : { y: [-10, 10, -10] }} transition={{ duration: isHighRisk ? 0.2 : 3, repeat: Infinity }}>
        {isHighRisk ? (
          <AlertTriangle className="w-40 h-40 text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.9)] relative z-10" />
        ) : (
          <ShieldCheck className="w-40 h-40 text-emerald-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.9)] relative z-10" />
        )}
      </motion.div>
    </motion.div>
  ];

  return (
    <div className="h-[500px] lg:h-[600px] w-full relative bg-slate-900/40 rounded-3xl overflow-hidden border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.1)] backdrop-blur-xl flex items-center justify-center">
      {/* Grid Background Halus */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {scenes[stepId]}
      </AnimatePresence>
    </div>
  );
}
