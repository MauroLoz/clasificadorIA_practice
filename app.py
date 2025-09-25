# Importaciones necesarias
# Importações necessárias
# Necessary imports
import os
import re
import pdfplumber
from flask import Flask, render_template, request
from google import genai

# Crear aplicación Flask y definir carpeta uploads para guardar archivos
# Criar aplicação Flask e definir pasta uploads para salvar arquivos
# Create Flask application and define uploads folder to store files
app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Definir API Key de IA Gemini
# Definir API Key da IA Gemini
# Define Gemini AI API Key
os.environ["GEMINI_API_KEY"] = "AIzaSyBmS_Ev4l9jlK1Nh2RnWfpY3uwWdpy38vk"
client = genai.Client()

# Función para procesar el texto (PNL)
# Função para processar o texto (PNL)
# Function to process text (NLP)
def preprocesar_texto(texto: str) -> str:
    """
    Preprocesamiento ligero para reducir uso de memoria:
    - Minúsculas
    - Elimina caracteres no alfanuméricos básicos
    - Normaliza espacios
    """
    texto = texto.lower()
    texto = re.sub(r"[^a-záéíóúñü0-9\s]", " ", texto, flags=re.IGNORECASE)
    texto = re.sub(r"\s+", " ", texto).strip()
    return texto

# Funcion donde se define el prompt para consultar a la IA y que clasifique el correo
# Função onde se define o prompt para consultar a IA e classificar o e-mail
# Function where the prompt is defined to query AI and classify the email
def clasificar_correo(texto):
    prompt = f"""
    Clasifica el siguiente correo electrónico como "Productivo" o "Improductivo".
    Devuelve solo la categoría como texto plano.
    
    Correo:
    {texto}
    """
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return response.text.strip()

# Funcion donde se define el prompt para generar respuesta de acuerdo al correo ingresado
# Função onde se define o prompt para gerar resposta de acordo com o e-mail inserido
# Function where the prompt is defined to generate a reply according to the input email
def generar_respuesta(texto, categoria):
    prompt = f"""
    Eres un asistente que genera respuestas automáticas para correos electrónicos.
    El correo está clasificado como "{categoria}".
    
    IMPORTANTE: La respuesta debe estar siempre en el siguiente formato:

    Asunto: <asunto de la respuesta, comenzando con 'Re:' si aplica>
    Mensaje:
    <mensaje corto y claro de respuesta>

    Correo original:
    {texto}
    """
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return response.text.strip()

# ruta global /
# rota global /
# global route /
@app.route("/", methods=["GET", "POST"])
def index():
    resultado = None

    if request.method == "POST":
        texto_correo = request.form.get("correo_texto", "").strip()
        archivo = request.files.get("correo_archivo")

        contenido = ""

        # validar si se ingreso por textarea
        # validar se foi inserido texto diretamente
        # validate if text was entered in textarea
        if texto_correo:
            contenido = texto_correo

        # validar si se cargo archivo 
        # validar se um arquivo foi carregado
        # validate if a file was uploaded 
        elif archivo:
            ruta_archivo = os.path.join(UPLOAD_FOLDER, archivo.filename)
            archivo.save(ruta_archivo)

            # dsitincion entre .txt y .pdf
            # distinção entre .txt e .pdf
            # distinction between .txt and .pdf
            if archivo.filename.endswith(".txt"):
                with open(ruta_archivo, "r", encoding="utf-8", errors="ignore") as f:
                    contenido = f.read()

            elif archivo.filename.endswith(".pdf"):
                with pdfplumber.open(ruta_archivo) as pdf:
                    # Limitar a primeras 5 páginas y tamaño de texto para ahorrar memoria
                    max_pages = 5
                    max_chars = 20000
                    for idx, pagina in enumerate(pdf.pages[:max_pages]):
                        contenido += (pagina.extract_text() or "")
                        if len(contenido) >= max_chars:
                            contenido = contenido[:max_chars]
                            break

            else:
                contenido = "Formato no soportado."

        # Ejecutar funciones PNL e IA
        # Executar funções PLN e IA
        # Run NLP and AI functions
        if contenido.strip():
            contenido_procesado = preprocesar_texto(contenido)
            categoria = clasificar_correo(contenido_procesado[:2000])  
            respuesta = generar_respuesta(contenido[:2000], categoria)

            # resultado es lo que devolvemos a la renderizacion index.html
            # resultado é o que devolvemos para a renderização index.html
            # result is what we return to the index.html rendering
            resultado = {
                "contenido": contenido[:1000] + "..." if len(contenido) > 1000 else contenido,
                "contenido_procesado": contenido_procesado,
                "categoria": categoria,
                "respuesta": respuesta
            }

    # Renderizamos plantilla
    # Renderizamos template
    # Render template
    return render_template("index.html", resultado=resultado)

if __name__ == "__main__":
    app.run(debug=True)