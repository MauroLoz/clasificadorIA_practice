import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import joblib
import nltk
from nltk.corpus import stopwords

# Importamos el CSV de entrenamiento
# Importamos o CSV de treinamento
# Load training CSV
df = pd.read_csv("mails_training.csv")

X = df["text"]
y = df["class"]

modelo = Pipeline([
    ("tfidf", TfidfVectorizer(stop_words="english")),  
    ("clf", LogisticRegression(max_iter=2000, solver="lbfgs"))
])

# Entrenamos el modelo con los datos (textos y clases)
# Treinamos o modelo com os dados (textos e classes)
# Train the model using texts and classes
modelo.fit(X, y)

# Guardamos el modelo entrenado 
# Salvamos o modelo treinado
# Save the trained model
joblib.dump(modelo, "modelo_clasificacion.pkl")
