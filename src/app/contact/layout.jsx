
export const metadata = {
  icons: {
    icon: {
      url: "/favicon.ico", // Assicurati che il percorso sia corretto
      type: "image/x-icon"
    },
    shortcut: {
      url: "/favicon.ico", // Assicurati che il percorso sia corretto
      type: "image/x-icon"
    },
  },
  title: "Contatti Dorida Solution - Contattaci per Soluzioni Digitali",
  description: "Hai domande o hai bisogno di assistenza? Visita la nostra pagina Contatti per ottenere supporto o informazioni su Dorida Solution e i nostri servizi.",
  keywords: "Digitalizzazione, Web agency digitale, Sviluppo siti web, Marketing digitale, Branding aziendale, Video marketing, Smart home solutions, Gestione sponsorizzazioni, Produzione jingle pubblicitari, Editoria digitale, Automazione B&B, Inclusione digitale, Innovazione ospitalità, Il Bentornato Emigrato, Social media strategy, Condivisione profitti, Sviluppo sostenibile, Community engagement, Tecnologie avanzate, Supporto reciproco, Gestione inventari, Progetti no-profit, Soluzioni B2B, Web design full-stack, Marketing influencer, Gestione contenuti digitali, Campagne pubblicitarie creative, Innovazione tecnologica, Soluzioni marketing personalizzate, Espansione comunitaria, SEO, social media management, pubblicità online, analisi dati, sicurezza informatica, consulenza IT, soluzioni e-commerce, ottimizzazione dei motori di ricerca, marketing dei contenuti, strategie di branding, automazione del marketing, sviluppo app, web design",
  canonical: "https://www.doridasolution.com/contact",
  og: {
      title: "Contattaci - Dorida Solution",
      type: "website",
      url: "http://www.doridasolution.com/contact", // Cambia con l'URL corretto
      image: "http://www.doridasolution.com/assets/images/contact-og-image.jpg", // Cambia con un'immagine pertinente
      description: "Contattaci per scoprire di più sui nostri servizi digitali e soluzioni personalizzate. Siamo qui per aiutarti a navigare nel mondo digitale.",
      site_name: "Dorida Solution"
  },
};
    
    export default function RootLayout({ children }) {
      return (
        <html lang="en">
          <body>{children}</body>
        </html>
      );
    }
    