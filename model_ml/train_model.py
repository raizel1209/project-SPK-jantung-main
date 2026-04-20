import pickle
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
import pandas as pd

# (Asumsi X dan y sudah diekstrak dari dataset UCI Heart Disease)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Inisialisasi dan pelatihan model
model = DecisionTreeClassifier()
model.fit(X_train, y_train)

# Menyimpan model yang sudah pintar ke dalam format file
with open('model_ml/model_jantung.pkl', 'wb') as file:
    pickle.dump(model, file)