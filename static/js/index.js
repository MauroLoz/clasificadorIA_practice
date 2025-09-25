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

// Funcion para reiniciar completamente la app (recargar la página)
// Função para reiniciar completamente o app (recarregar a página)
// Function to fully reset the app (reload the page)
document.getElementById("btn-limpiar").addEventListener("click", function() {
    window.location.reload();
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