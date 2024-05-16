import { marked } from 'marked';
import hljs from 'highlight.js';

const formatText = (text) => {
  // Configura marked per una conversione personalizzata
  marked.setOptions({
    gfm: true, // Abilita GitHub Flavored Markdown
    breaks: true, // Abilita linee spezzate
    highlight: function(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  });

  // Aggiungi una classe personalizzata per evidenziare il testo
  const renderer = new marked.Renderer();
  renderer.paragraph = (text) => {
    return `<p class="custom-paragraph">${text}</p>`;
  };

  // Converte il testo Markdown in HTML
  return marked(text, { renderer });
};

export default formatText;
