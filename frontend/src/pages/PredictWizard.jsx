import { useForm, useWatch } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, AlertCircle, Zap, User, Activity, Droplets, Brain, Stethoscope, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ResultAnimation from '../components/ResultAnimation.jsx';
import Medical3D from '../components/Medical3D.jsx';

const STEPS = [
  { 
    id: 0, 
    title: 'Usia', 
    field: 'age', 
    icon: User, 
    min: { value: 20, message: 'Minimal 20 tahun' }, 
    max: { value: 100, message: 'Maksimal 100 tahun' },
    unit: 'tahun',
    description: 'Masukkan usia Anda (20-100 tahun)',
    placeholder: '52',
    type: 'number'
  },
  { 
    id: 1, 
    title: 'Jenis Kelamin', 
    field: 'sex', 
    icon: Activity,
    description: 'Pilih jenis kelamin',
    options: [
      { value: '1', label: 'Laki-laki', icon: Activity, desc: 'Nilai: 1' },
      { value: '0', label: 'Perempuan', icon: User, desc: 'Nilai: 0' }
    ],
    type: 'radio'
  },
  { 
    id: 2, 
    title: 'Tekanan Darah', 
    field: 'trestbps', 
    icon: Droplets, 
    min: { value: 90, message: 'Minimal 90 mmHg' },
    max: { value: 250, message: 'Maksimal 250 mmHg' },
    unit: 'mmHg',
    description: 'Tekanan darah istirahat (mmHg)',
    placeholder: '120',
    type: 'number'
  },
  { 
    id: 3, 
    title: 'Kolesterol', 
    field: 'chol', 
    icon: HeartPulse, 
    min: { value: 100, message: 'Minimal 100 mg/dl' },
    max: { value: 600, message: 'Maksimal 600 mg/dl' },
    unit: 'mg/dl',
    description: 'Kadar kolesterol serum (mg/dl)',
    placeholder: '250',
    type: 'number'
  },
  { 
    id: 4, 
    title: 'Gula Darah', 
    field: 'fbs', 
    icon: Brain,
    description: 'Gula darah puasa > 120 mg/dl?',
    options: [
      { value: '0', label: 'Normal (≤ 120)', icon: Brain },
      { value: '1', label: 'Tinggi (> 120)', icon: AlertCircle }
    ],
    type: 'radio'
  },
  { 
    id: 5, 
    title: 'Hasil EKG', 
    field: 'restecg', 
    icon: Stethoscope,
    description: 'Elektrokardiogram istirahat:\n• Normal: Hasil EKG normal\n• ST-T Abnormal: Gangguan gelombang ST-T\n• Hipertrofi: Pembesaran ventrikel kiri',
    options: [
      { value: '0', label: 'Normal', icon: HeartPulse, desc: 'EKG normal' },
      { value: '1', label: 'ST-T Abnormal', icon: Activity, desc: 'Gangguan ST-T' },
      { value: '2', label: 'Hipertrofi', icon: AlertCircle, desc: 'Ventrikel membesar' }
    ],
    type: 'radio'
  },
  { 
    id: 6, 
    title: 'Detak Jantung', 
    field: 'thalach', 
    icon: HeartPulse, 
    min: { value: 70, message: 'Minimal 70 bpm' },
    max: { value: 220, message: 'Maksimal 220 bpm' },
    unit: 'bpm',
    description: 'Maksimum denyut jantung (bpm)',
    placeholder: '150',
    type: 'number'
  }
];

function PredictWizard() {
  const formMethods = useForm({
    defaultValues: {
      age: '',
      sex: '',
      trestbps: '',
      chol: '',
      fbs: '',
      restecg: '',
      thalach: ''
    },
    mode: 'onChange'
  });
  
  const { register, handleSubmit, formState, control, watch, trigger, reset } = formMethods;
  const { errors } = formState;

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const watchedAge = useWatch({ control, name: 'age' });
  const watchedSex = useWatch({ control, name: 'sex' });
  const watchedField = useWatch({ control, name: STEPS[currentStep]?.field });
  const formValues = watch();

  const step = STEPS[currentStep];

  const getAgeCategory = (age) => {
    const numAge = parseInt(age);
    if (isNaN(numAge)) return 'unknown';
    if (numAge < 30) return 'teen';
    if (numAge < 60) return 'adult';
    return 'elderly';
  };

  // Improved validation check to handle NaN from empty valueAsNumber inputs
  const isStepValid = !errors[step.field] && 
                      watchedField !== '' && 
                      watchedField !== undefined && 
                      !Number.isNaN(watchedField);

  const nextStep = async () => {
    const isCurrentFieldValid = await trigger(step.field);
    if (!isCurrentFieldValid || !isStepValid) return;
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  const onSubmit = async (data) => {
    const isFormValid = await trigger();
    if (!isFormValid) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:8000/predict', data, { timeout: 10000 });
      setResult(response.data);
    } catch (err) {
      console.error('Prediction error:', err);
      setError('Backend tidak jalan. Coba jalankan: cd backend && python -m uvicorn main:app --reload');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result) {
      setLoading(false);
    }
  }, [result]);

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans text-slate-200 bg-slate-950/80">
      {/* Subtle Futuristic Medical Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {result && <ResultAnimation result={result} />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex flex-col lg:flex-row gap-10 lg:gap-16 relative z-10 lg:items-start">
        
        {/* Left Column: 3D Hologram Area */}
        <motion.div 
          className="w-full lg:w-5/12 sticky top-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative group rounded-3xl p-1 bg-gradient-to-b from-emerald-500/20 to-transparent">
            <motion.div 
              className="absolute inset-x-0 h-[2px] bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] z-20 pointer-events-none"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 5, ease: "linear", repeat: Infinity }}
            />
            <Medical3D step={STEPS[currentStep]} values={formValues} result={result} />
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-emerald-500/30 font-mono text-[10px] text-emerald-300 tracking-widest uppercase">
              {result ? 'DIAGNOSTIC COMPLETE' : `BIO-SCAN: STAGE_0${currentStep + 1}`}
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
              <span className="font-mono text-[10px] text-emerald-500 tracking-[0.3em]">LIVE</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interaction Console */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center min-h-[600px]">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="mb-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-950/30 backdrop-blur-md rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] mb-4">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-mono text-xs uppercase tracking-[0.15em] font-semibold">
                {result ? 'AI Analysis Complete' : `Bio-Scan Proses: ${currentStep + 1}/7`}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-br from-white via-emerald-100 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
              {result ? 'Laporan Visual 2D' : step.title}
            </h1>
            {!result && (
              <p className="mt-4 text-slate-400 text-lg">{step.description}</p>
            )}
          </motion.div>

          {!result ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="flex-1"
              >
                {/* Futuristic Progress Tracker */}
                <div className="flex gap-2 mb-10">
                  {STEPS.map((s, index) => (
                    <div key={s.id} className="flex-1">
                      <div className={`h-1.5 rounded-full transition-all duration-500 ${index === currentStep ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]' : index < currentStep ? 'bg-emerald-800' : 'bg-slate-800'}`} />
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  {step.type === 'number' && (
                    <div className="relative max-w-sm mx-auto z-10">
                      <motion.input 
                        {...register(step.field, { 
                          required: `${step.title} wajib diisi`, 
                          min: step.min, 
                          max: step.max,
                          valueAsNumber: true
                        })} 
                        type="number" 
                        placeholder={step.placeholder}
                        className={`w-full bg-slate-950/80 border-2 rounded-2xl px-6 py-8 text-4xl font-mono font-bold text-center text-white outline-none transition-all duration-300 ${
                          errors[step.field] 
                            ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] focus:border-red-400' 
                            : 'border-emerald-500/30 focus:border-emerald-400 focus:shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                        }`}
                      />
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-emerald-500/50 font-mono font-bold">{step.unit}</div>
                    </div>
                  )}

                  {step.type === 'radio' && (
                    <div className={`grid ${step.options.length === 2 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3'} gap-4 relative z-10`}>
                      {step.options.map((option) => {
                        const isSelected = watch(step.field) === option.value;
                        return (
                          <label key={option.value} className="cursor-pointer group">
                            <input 
                              type="radio" 
                              value={option.value} 
                              {...register(step.field, { required: `${step.title} wajib dipilih` })} 
                              className="sr-only"
                            />
                            <motion.div 
                              className={`h-full p-6 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                                isSelected 
                                  ? 'bg-emerald-500/10 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.2)]' 
                                  : 'bg-slate-950/50 border-slate-700/50 group-hover:border-emerald-500/50'
                              }`}
                              whileTap={{ scale: 0.95 }}
                            >
                              <option.icon className={`w-10 h-10 mb-3 ${isSelected ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'text-slate-500 group-hover:text-emerald-300'}`} />
                              <span className={`font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>{option.label}</span>
                            </motion.div>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {errors[step.field] && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 relative z-10 flex items-center justify-center gap-2 text-red-400 bg-red-950/30 py-3 px-4 rounded-xl border border-red-500/20">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-semibold text-sm">{errors[step.field].message}</span>
                    </motion.div>
                  )}
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-4 mt-8">
                  <button 
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-6 py-4 rounded-xl font-bold bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-slate-600/50"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    type="button"
                    onClick={currentStep === 6 ? handleSubmit(onSubmit) : nextStep}
                    disabled={!isStepValid || loading}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold uppercase tracking-widest transition-all bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(52,211,153,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-3 border-slate-900/30 border-t-slate-950 rounded-full animate-spin" />
                    ) : currentStep === 6 ? (
                      <>Proses Analisis <Brain className="w-5 h-5" /></>
                    ) : (
                      <>Lanjut <ChevronRight className="w-5 h-5" /></>
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/60 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.1)] relative z-10"
            >
              <div className="text-center mb-8">
                <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg mb-2">
                  {result.risk}
                </h2>
                <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Tingkat Risiko Prediksi</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-emerald-500/10 w-0 group-hover:w-full transition-all duration-500" />
                  <span className="block text-4xl font-black text-emerald-400 mb-1 relative z-10">{Math.round(result.probability.low * 100)}%</span>
                  <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest relative z-10">Probabilitas Rendah</span>
                </div>
                <div className="p-6 rounded-2xl bg-red-950/40 border border-red-500/20 text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-red-500/10 w-0 group-hover:w-full transition-all duration-500" />
                  <span className="block text-4xl font-black text-red-400 mb-1 relative z-10">{Math.round(result.probability.high * 100)}%</span>
                  <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest relative z-10">Probabilitas Tinggi</span>
                </div>
              </div>
              
              <div className="p-6 bg-slate-950/50 rounded-2xl border-l-2 border-emerald-500 mb-8">
                <h3 className="text-emerald-400 font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Stethoscope className="w-4 h-4" /> Saran Medis
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm lg:text-base">{result.advice}</p>
              </div>
              
              <button
                onClick={() => {
                  setResult(null);
                  setCurrentStep(0);
                  reset();
                }}
                className="w-full py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              >
                Mulai Scan Baru
              </button>
            </motion.div>
          )}

          {error && (
            <div className="mt-6 p-6 bg-red-950/40 border border-red-500/30 rounded-2xl text-center">
              <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
              <p className="text-red-200">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PredictWizard;