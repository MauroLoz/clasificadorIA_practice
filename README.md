## AI Email Classifier (Flask)

Flask web application that:
- Classifies emails as Productive/Unproductive using Gemini (google-genai)
- Generates a suggested reply
- Allows entering text or uploading .txt/.pdf files


### Requirements
- Python 3.10+ recommended
- Pip
- Google AI Studio (Gemini) account and API Key


### Project structure
```
Practice/
  app.py
  models/
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
If your `requirements.txt` does not include these libraries yet, add the following lines:

flask
gunicorn
pdfplumber
google-genai

Then install:

pip install -r requirements.txt


### 2) Configure Gemini API Key
Get your API Key from Google AI Studio and export it as an environment variable (recommended). In PowerShell:

$env:GEMINI_API_KEY = "YOUR_API_KEY"

Note: In `app.py` there is a line that sets the variable in code. For best practices, remove that assignment and rely on the environment variable.


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


### Troubleshooting
- Gemini authentication: if you get authentication errors, ensure `GEMINI_API_KEY` is set in the same PowerShell session where you run `python app.py`.
- PDF without text: some PDFs are scans (images). `pdfplumber` does not perform OCR. Consider converting to text first.


### Deploy on Render (Free tier tips)
- Use a Web Service with Build Command: `pip install -r requirements.txt`.
- Start Command is taken from `Procfile`: `web: gunicorn app:app --workers=1 --threads=2 --timeout=120`.
- Environment: add `GEMINI_API_KEY`.
- Memory: this project is tuned for 512Mi by removing heavy NLP models and limiting PDF parsing. If you still hit OOM, reduce `--threads` to 1 and ensure uploaded PDFs are small (< 5 pages).


### Development
- Runs in debug mode (already enabled in `app.py`).
- Changes in `templates/index.html`, `static/css/index.css`, and `static/js/index.js` are applied on refresh.

### Extras
- The project includes a language selector for a better experience (Spanish/Portuguese/English).

### License
Practice project.


