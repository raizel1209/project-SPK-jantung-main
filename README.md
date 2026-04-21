# Sistem Pendukung Keputusan (SPK) Risiko Penyakit Jantung Dini [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Python 3.12](https://img.shields.io/badge/Python-3.12-blue.svg)](https://www.python.org/) [![React 18](https://img.shields.io/badge/React-18-green.svg)](https://reactjs.org/)

## Overview
Web app modern untuk deteksi dini risiko penyakit jantung menggunakan **Decision Tree ML**. Dibangun dengan dataset UCI Heart Disease. Fitur: UI aesthetic dengan animasi 3D medis, wizard prediksi, dashboard hasil, dan API FastAPI.

![Demo](https://via.placeholder.com/1200x600/0f172a/ffffff?text=SPK+Jantung+Demo) <!-- Ganti dengan screenshot UI -->

## ✨ Fitur
- Prediksi risiko jantung (accuracy ~85%)
- Visualisasi 3D jantung (React Three Fiber)
- Animasi hasil (Framer Motion)
- Responsive dashboard
- API RESTful dengan metrics

## 🛠 Tech Stack
| Backend | Frontend | ML | Tools |
|---------|----------|----|-------|
| Python 3.12 | React 18.3.1 | scikit-learn 1.5.2 | Vite 5.4.8 |
| FastAPI 0.115 | TailwindCSS 3.4.13 | pandas, numpy | Git, venv |

## 📁 Project Structure
```
project-SPK-jantung-main/
├── backend/          # FastAPI + ML
│   ├── main.py       # API server
│   ├── model.py      # Train Decision Tree
│   ├── model.joblib  # Trained model
│   └── requirements.txt
├── frontend/         # Vite + React
│   ├── src/
│   │   ├── components/  # 3D, Animations
│   │   └── pages/       # Home, Predict, Dashboard
│   ├── package.json
│   └── tailwind.config.js
├── dataset/          # UCI heart.csv
├── README.md
└── .gitignore
```

## 🚀 Quick Start (Windows)

### 1. Backend (ML API)
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python model.py  # Train & save model.joblib
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
**Backend ready**: http://localhost:8000/docs (Swagger UI)

### 2. Frontend (UI)
```bash
cd frontend
npm install
npm run dev
```
**Frontend ready**: http://localhost:5173

### Test API
```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d "{\"age\":63,\"sex\":1,\"cp\":1,\"trestbps\":145,\"chol\":233,\"fbs\":1,\"restecg\":2,\"thalach\":150}"
```

## 📊 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/predict` | Prediksi risiko (JSON input: age,sex,cp,trestbps,chol,fbs,restecg,thalach,exang,oldpeak, slope,ca,thal) |
| GET | `/metrics` | Model accuracy, precision, recall, confusion matrix |

## 💾 Dataset
- **UCI Cleveland Heart Disease**: `dataset/heart.csv` (303 samples, 14 features)
- Preprocessed & Decision Tree trained (max_depth=5)

## 🏃 Demo
- **Backend**: http://localhost:8000
- **Frontend**: http://localhost:5173
- Live prediction: Home → Predict Wizard → Hasil animasi

## 🤝 Contributing
1. Fork & clone repo
2. Install deps (see Quick Start)
3. Buat branch `feat/your-feature`
4. Commit & PR

## 📄 License
This project is MIT licensed. See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments
- UCI ML Repository
- Tailwind, React Three Fiber, Framer Motion contributors

