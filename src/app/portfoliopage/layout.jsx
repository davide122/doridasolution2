
export const metadata = {
    icons: {
        icon: {
            url: "/favicon.ico",
            type: "image/x-icon"
        },
        shortcut: {
            url: "/favicon.ico",
            type: "image/x-icon"
        },
    },
    title: "Dorida Solution - Portfolio",
    description: "Scopri i nostri progetti: Gestione Social, E-commerce, Creazione Jingle Musicali, Analisi di Mercato, Creazione Web App Streaming, E-commerce Ceramiche, Gestionale Aziendale e Ottimizzazione Lead. Innoviamo con passione.",
    keywords: "Digitalizzazione, Web agency, Sviluppo siti web, Marketing digitale, Branding aziendale, Video marketing, Gestione social, E-commerce, Creazione jingle, Analisi di mercato, Web app streaming, Ceramiche artigianali, Gestionale aziendale, Ottimizzazione lead, Progetti innovativi, Community engagement, Tecnologie avanzate, Supporto reciproco, SEO, social media management, pubblicità online, analisi dati, sicurezza informatica, consulenza IT, soluzioni e-commerce, ottimizzazione motori di ricerca, marketing contenuti, strategie branding, automazione marketing, sviluppo app, web design",
    canonical: "https://www.doridasolution.com/portfolio",
    openGraph: {
        type: 'website',
        locale: 'it_IT',
        url: 'https://www.doridasolution.com/portfolio',
        title: "Dorida Solution - Portfolio",
        description: "Esplora i nostri progetti innovativi: Gestione Social, E-commerce, Creazione Jingle Musicali, Analisi di Mercato, Creazione Web App Streaming, E-commerce Ceramiche, Gestionale Aziendale e Ottimizzazione Lead. Dorida Solution porta l'innovazione nel mondo digitale.",
        image: 'https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/Portfolio/portfolio-cover.png'  // Aggiorna l'URL con l'immagine appropriata
    },
    twitter: {
        card: "summary_large_image",
        site: "@DoridaSolution",
        title: "Dorida Solution - Portfolio",
        description: "Esplora i nostri progetti: Gestione Social, E-commerce, Creazione Jingle Musicali, Analisi di Mercato, Creazione Web App Streaming, E-commerce Ceramiche, Gestionale Aziendale e Ottimizzazione Lead.",
        image: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/Portfolio/portfolio-cover.png"  // Aggiorna l'URL con l'immagine appropriata
    }
};
  export default function RootLayout({ children }) {
    return (
      <html lang="it">
        <body>{children}</body>
      </html>
    )
  };