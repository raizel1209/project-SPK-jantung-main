import { motion } from 'framer-motion';
import { HeartPulse, BarChart3, AlertCircle, Activity, Zap } from 'lucide-react';

const stats = [
  { name: 'Ukuran Dataset', value: '303', icon: BarChart3, color: 'from-emerald-400 to-teal-500', suffix: 'Sampel' },
  { name: 'Akurasi Model', value: '82%', icon: Zap, color: 'from-emerald-500 to-green-500', suffix: 'DT' },
  { name: 'Risiko Tinggi', value: '52%', icon: AlertCircle, color: 'from-red-500 to-orange-500', suffix: 'Kasus' },
  { name: 'Prediksi', value: '1.2K', icon: Activity, color: 'from-blue-400 to-emerald-500', suffix: 'Total' },
];

const infoJantung = [
  { title: 'Usia & Risiko', desc: 'Usia >55 tahun meningkatkan risiko kardiovaskular 3x lipat.', icon: '👴' },
  { title: 'Jenis Kelamin', desc: 'Pria memiliki risiko 2x lebih tinggi dibanding wanita di usia muda.', icon: '♂️♀️' },
  { title: 'Tekanan Darah', desc: 'trestbps >140 mmHg indikasi hipertensi tahap 1.', icon: '📈' },
  { title: 'Kolesterol', desc: 'chol >240 mg/dl kategori tinggi, target <200 mg/dl.', icon: '🧪' },
  { title: 'Gula Darah', desc: 'fbs >120 mg/dl diabetes, faktor risiko jantung No.1.', icon: '💉' },
  { title: 'EKG Istirahat', desc: 'restecg abnormal (1,2) sinyal hipertrofi ventrikel.', icon: '📡' },
];

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
      {/* Background Scan Lines - Medical green/teal */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scan-line scan-line-anim absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400/60 via-teal-400/40 to-transparent"></div>
        <div className="scan-line scan-line-anim absolute top-[25%] left-0 w-full h-1 bg-gradient-to-r from-teal-500/40 via-emerald-400/30 to-transparent" style={{animationDelay: '1s'}}></div>
        <div className="scan-line scan-line-anim absolute top-[50%] left-0 w-full h-1 bg-gradient-to-r from-emerald-500/50 via-green-400/40 to-transparent" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20 relative z-10"
      >
        <div className="inline-flex items-center gap-3 mb-6 px-8 py-4 bg-emerald-500/10 backdrop-blur-xl rounded-full border border-emerald-500/40 shadow-heart-glow">
          <Zap className="w-6 h-6 text-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-mono uppercase tracking-wider text-sm">Analitik Real-Time</span>
        </div>
        <h2 className="text-7xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent mb-8 leading-relaxed tracking-tight shadow-heart-glow">
          Pusat Kontrol
        </h2>
        <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
          Monitor kesehatan jantung secara real-time dengan AI Decision Tree. 303 sampel dataset UCI, akurasi 82%.
        </p>
      </motion.div>

      {/* Main Stats Grid - Medical colors */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className="group glass-card cursor-pointer relative overflow-hidden hover:rotate-1 hover:-skew-x-1"
              whileHover={{ y: -20 }}
            >
              <div className="scan-line scan-line-anim absolute top-0 left-0 w-full h-px bg-gradient-to-r from-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/10 via-white/10 to-teal-400/10 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all" />
              <div className={`p-6 rounded-2xl bg-gradient-to-br ${stat.color} w-fit mb-8 shadow-xl group-hover:shadow-heart-glow transform group-hover:rotate-12 transition-all duration-500`}>
                <Icon className="w-16 h-16 text-white/95 drop-shadow-lg animate-pulse" />
              </div>
              <div className="space-y-2">
                <p className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-300 drop-shadow-lg group-hover:from-emerald-300 group-hover:to-teal-400">
                  {stat.value}
                </p>
                <p className="text-white/80 text-lg uppercase tracking-[2px] font-mono group-hover:text-emerald-300 transition-colors">
                  {stat.name}
                </p>
                <span className="text-xs text-emerald-300/80 font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-all">
                  {stat.suffix}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Interactive 2D Heartbeat Monitor */}
      <div className="text-center mb-24">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="w-64 h-64 mx-auto mb-12 rounded-full bg-slate-900/60 border border-emerald-500/30 backdrop-blur-xl p-12 flex items-center justify-center relative shadow-[0_0_50px_rgba(16,185,129,0.1)]">
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping" style={{ animationDuration: '2s' }}></div>
              <div className="absolute inset-4 rounded-full border border-teal-500/30 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-full h-full flex items-center justify-center"
              >
                <HeartPulse className="w-32 h-32 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
              </motion.div>
            </div>
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent mb-4 tracking-tight shadow-heart-glow"
            >
              Monitor Denyut 2D
            </motion.h3>
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-light tracking-wide">
              Visualisasi detak jantung interaktif dengan desain flat modern
            </p>
          </div>
        </div>
      </div>

      {/* Feature Info Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {infoJantung.map((info, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, rotateY: index % 2 === 0 ? 15 : -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: (index * 0.1) + 0.5, duration: 0.8 }}
            className="glass-card hover:rotate-x-5 cursor-pointer group border border-emerald-500/20 hover:border-emerald-400/40"
            whileHover={{ scale: 1.02, rotateX: 5 }}
          >
            <div className="text-4xl mb-6 opacity-90 drop-shadow-lg">{info.icon}</div>
            <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-all duration-300">{info.title}</h4>
            <p className="text-lg text-white/85 leading-relaxed tracking-wide">{info.desc}</p>
            <div className="mt-6 pt-6 border-t border-white/10">
              <span className="inline-flex items-center gap-2 text-emerald-400 text-sm font-mono uppercase tracking-wider group-hover:shadow-heart-glow hover:neon-glow transition-all">
                Pelajari Lebih Lanjut <Zap className="w-4 h-4 group-hover:animate-pulse" />
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Status Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-24 p-8 bg-emerald-500/5 backdrop-blur-xl rounded-3xl border border-emerald-500/30 shadow-heart-glow text-center"
      >
        <p className="text-lg text-emerald-200 font-mono tracking-wider uppercase mb-4">Status Sistem</p>
        <div className="flex flex-wrap justify-center gap-8 text-sm">
          <span className="flex items-center gap-2 px-6 py-3 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl shadow-emerald-glow hover:shadow-heart-glow">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            Model ML Aktif
          </span>
          <span className="flex items-center gap-2 px-6 py-3 bg-teal-500/20 border border-teal-500/50 rounded-2xl shadow-ecg-glow hover:shadow-heart-glow">
            <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
            API Real-Time
          </span>
          <span className="flex items-center gap-2 px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-2xl shadow-emerald-glow hover:shadow-heart-glow">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            Akurasi 82%
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
