## AI Email Classifier (Flask)

Flask web application that:
- Classifies emails as Productive/Unproductive using a trained machine learning model
- Generates a suggested reply
- Allows entering text or uploading .txt/.pdf files
- Includes a model trainer script for custom training


### Requirements
- Python 3.10+ recommended
- Pip
- scikit-learn (for machine learning model)
- pandas (for data handling)


### Project structure
```
Practice/
  app.py
  entrenar_modelo.py
  modelo_clasificacion.pkl
  mails_training.csv
  static/
    css/
      index.css
    js/
      index.js
    img/
      test.png
  templates/
    index.html
  uploads/
  requirements.txt
  README.md
```


### 1) Dependencies
Install the required libraries:

pip install -r requirements.txt

### 2) Train the Model (IMPORTANT - Run this first!)
Before running the application, you must train the machine learning model:

python entrenar_modelo.py

This will create `modelo_clasificacion.pkl` which is required by the application.

#### Customizing the Training Data
- Edit `entrenar_modelo.py` to add more training examples
- The current dataset includes basic examples of productive/unproductive emails
- You can replace the data dictionary with your own examples or load from a CSV file
- More training data generally leads to better classification accuracy

### 3) Run the application

python app.py

The app will start in development mode at: `http://127.0.0.1:5000/`


### Usage
1. Open the main page.
2. Enter the email content in the textarea or upload a `.txt`/`.pdf` file.
3. Click "Classify email".
4. You will see the detected category and a suggested reply. You can switch the UI language with the flag button.


### Notes
- Uploaded files are stored in the `uploads/` folder.
- `pdfplumber` is used to extract text from PDFs in a simple way.
- The frontend includes `static/js/index.js` for form clearing and language switching, and `static/css/index.css` for styles.
- The model uses scikit-learn with TF-IDF vectorization and Logistic Regression for classification.


### Troubleshooting
- Model not found: Make sure you run `python entrenar_modelo.py` before starting the app.
- PDF without text: some PDFs are scans (images). `pdfplumber` does not perform OCR. Consider converting to text first.
- Training data: You can modify `entrenar_modelo.py` to use your own training data or add more examples to improve accuracy.


### Deploy on Render (Free tier tips)
- Use a Web Service with Build Command: `pip install -r requirements.txt && python entrenar_modelo.py`.
- Start Command is taken from `Procfile`: `web: gunicorn app:app --workers=1 --threads=2 --timeout=120`.
- Memory: this project is tuned for 512Mi by using lightweight ML models and limiting PDF parsing. If you still hit OOM, reduce `--threads` to 1 and ensure uploaded PDFs are small (< 5 pages).


### Development
- Runs in debug mode (already enabled in `app.py`).
- Changes in `templates/index.html`, `static/css/index.css`, and `static/js/index.js` are applied on refresh.

### Extras
- The project includes a language selector for a better experience (Spanish/Portuguese/English).

### License
Practice project.


