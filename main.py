import pickle
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="API Deteksi Penyakit Jantung RSU Aulia")

# Memuat model saat server pertama kali menyala ('rb' berarti read binary)
with open('model_ml/model_jantung.pkl', 'rb') as file:
    model_jantung = pickle.load(file)

class DataPasien(BaseModel):
    usia: int
    jenis_kelamin: int          
    tekanan_darah: int          
    kolesterol: float           
    gula_darah_puasa: float     
    hasil_ekg: int              
    detak_jantung_max: int      

@app.post("/prediksi")
def prediksi_risiko(data: DataPasien):
    # 1. Menyusun data ke format 2 dimensi
    data_input = [[
        data.usia,
        data.jenis_kelamin,
        data.tekanan_darah,
        data.kolesterol,
        data.gula_darah_puasa,
        data.hasil_ekg,
        data.detak_jantung_max
    ]]
    
    # 2. Prediksi dengan model
    hasil_prediksi = model_jantung.predict(data_input)
    
    # 3. Menerjemahkan hasil (menggunakan kode Anda)
    if hasil_prediksi[0] == 1:
        status = "Risiko Tinggi"
    else:
        status = "Risiko Rendah"
    
    # 4. Mengembalikan respons
    return {
        "pesan": "Diagnosis berhasil diproses",
        "status_risiko": status
    }