// Funcion para mostrar el archivo cargado en el input
// Função para mostrar o arquivo carregado no input
// Function to show the uploaded file in the input
document.getElementById("file-upload").addEventListener("change", function() {
    const fileLabelContent = document.getElementById("file-label-content");
    if (this.files && this.files.length > 0) {
        fileLabelContent.innerHTML = `
            <p><strong>Archivo seleccionado:</strong> ${this.files[0].name}</p>
        `;
    }
});

// Funcion para limpar campos 
// Função para limpar campos
// Function to clear fields
document.getElementById("btn-limpiar").addEventListener("click", function() {
    const form = document.getElementById("mailForm");
    form.reset();

    const fileLabel = document.getElementById("file-label-content");
    fileLabel.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
             viewBox="0 0 24 24" fill="none" stroke="currentColor" 
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
             class="lucide lucide-upload w-8 h-8 text-gray-400 mx-auto mb-2">
            <path d="M12 3v12"></path>
            <path d="m17 8-5-5-5 5"></path>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        </svg>
        <p>Haz clic para seleccionar un archivo</p>
        <small>Formatos: .txt, .eml, .msg</small>
    `;

    document.querySelectorAll(".mailForm_email, .mailForm_response").forEach(el => el.remove());
});

// Funcion para la traduccion de la app en 3 idiomas, Español, Portogues, Ingles
// Função para tradução do app em 3 idiomas: Espanhol, Português, Inglês
// Function for app translation in 3 languages: Spanish, Portuguese, English
document.addEventListener('DOMContentLoaded', () => { 
    const btnLang = document.getElementById("btn-lang");
    let langIndex = 0;
    
    const textos = {
        es: {
            titulo: "Clasificador de Correos IA",
            subtitulo: "Análisis inteligente de correos electrónicos",
            contenido: "Contenido del correo",
            archivo: "O cargar archivo",
            textareaPlaceholder: "Pega aquí el contenido del correo electrónico que quieres clasificar...",
            fileText: "Haz clic para seleccionar un archivo",
            fileFormat: "Formatos: .txt, .pdf",
            btnEnviar: "Clasificar correo",
            btnLimpiar: "Limpiar",
            resultadoContenidoLabel: "Contenido del correo",
            respuestaSugeridaLabel: "Respuesta sugerida",
            categoria: "Categoría",
            categorias: {
                Productivo: "Productivo",
                Improductivo: "Improductivo"
            },
            flag: "🇪🇸"
        },
        pt: {
            titulo: "Classificador de E-mails IA",
            subtitulo: "Análise inteligente de e-mails",
            contenido: "Conteúdo do e-mail",
            archivo: "Ou carregar arquivo",
            textareaPlaceholder: "Cole aqui o conteúdo do e-mail que deseja classificar...",
            fileText: "Clique para selecionar um arquivo",
            fileFormat: "Formatos: .txt, .pdf",
            btnEnviar: "Classificar e-mail",
            btnLimpiar: "Limpar",
            resultadoContenidoLabel: "Conteúdo do e-mail",
            respuestaSugeridaLabel: "Resposta sugerida",
            categoria: "Categoria",
            categorias: {
                Productivo: "Produtivo",
                Improductivo: "Improdutivo"
            },
            flag: "🇧🇷"
        },
        en: {
            titulo: "AI Email Classifier",
            subtitulo: "Smart analysis of emails",
            contenido: "Email content",
            archivo: "Or upload file",
            textareaPlaceholder: "Paste here the email content you want to classify...",
            fileText: "Click to select a file",
            fileFormat: "Formats: .txt, .pdf",
            btnEnviar: "Classify email",
            btnLimpiar: "Clear",
            resultadoContenidoLabel: "Email content",
            respuestaSugeridaLabel: "Suggested reply",
            categoria: "Category",
            categorias: {
                Productivo: "Productive",
                Improductivo: "Unproductive"
            },
            flag: "🇺🇸"
        }
    };

    function setLanguage(lang) {
        document.getElementById("titulo").textContent = textos[lang].titulo;
        document.getElementById("subtitulo").textContent = textos[lang].subtitulo;
        document.getElementById("lbl-contenido").textContent = textos[lang].contenido;
        document.getElementById("lbl-archivo").textContent = textos[lang].archivo;
        document.getElementById("textarea-correo").placeholder = textos[lang].textareaPlaceholder;
        document.getElementById("file-text").textContent = textos[lang].fileText;
        document.getElementById("file-format").textContent = textos[lang].fileFormat;
        document.getElementById("btn-enviar-text").textContent = textos[lang].btnEnviar;
        document.getElementById("btn-limpiar").textContent = textos[lang].btnLimpiar;
        btnLang.textContent = textos[lang].flag;

        const lblResultadoContenido = document.getElementById("lbl-resultado-contenido");
        if (lblResultadoContenido) lblResultadoContenido.textContent = textos[lang].resultadoContenidoLabel;

        const lblRespuestaSugerida = document.getElementById("lbl-respuesta-sugerida");
        if (lblRespuestaSugerida) lblRespuestaSugerida.textContent = textos[lang].respuestaSugeridaLabel;

        const lblCategoria = document.getElementById("lbl-categoria");
        if (lblCategoria) {
            const rawCategoria = lblCategoria.dataset.categoria || "";
            const categoriaTraducida = textos[lang].categorias[rawCategoria] || rawCategoria;
            lblCategoria.textContent = `${textos[lang].categoria}: ${categoriaTraducida}`;
        }
    }

    btnLang.addEventListener("click", () => {
        langIndex = (langIndex + 1) % 3;
        const langs = ["es", "pt", "en"];
        setLanguage(langs[langIndex]);
    });

    setLanguage("es");
});