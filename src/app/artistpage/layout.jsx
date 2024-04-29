export const metadata = {
  icons: {
    icon: {
      url: "/favicon.ico", // Utilizzo del favicon standard
      type: "image/x-icon"
    },
    shortcut: {
      url: "/favicon.ico",
      type: "image/x-icon"
    },
  },
  title: "Dashboard Artista - Dorida Solution",
  description: "Accedi alla tua dashboard personale su Dorida Solution per gestire i tuoi album e la tua presenza musicale online.",
  keywords: "Digitalizzazione, Web agency digitale, Sviluppo siti web, Marketing digitale, Branding aziendale, Video marketing, Smart home solutions, Gestione sponsorizzazioni, Produzione jingle pubblicitari, Editoria digitale, Automazione B&B, Inclusione digitale, Innovazione ospitalità, Il Bentornato Emigrato, Social media strategy, Condivisione profitti, Sviluppo sostenibile, Community engagement, Tecnologie avanzate, Supporto reciproco, Gestione inventari, Progetti no-profit, Soluzioni B2B, Web design full-stack, Marketing influencer, Gestione contenuti digitali, Campagne pubblicitarie creative, Innovazione tecnologica, Soluzioni marketing personalizzate, Espansione comunitaria, SEO, social media management, pubblicità online, analisi dati, sicurezza informatica, consulenza IT, soluzioni e-commerce, ottimizzazione dei motori di ricerca, marketing dei contenuti, strategie di branding, automazione del marketing, sviluppo app, web design",
  canonical: "https://www.doridasolution.com/artistpage",
  og: {
      title: "Dashboard Artista su Dorida Solution",
      type: "website",
      url: "https://www.doridasolution.com/artistpage",
      image: "https://www.doridasolution.com/assets/images/artist-dashboard-og-image.jpg",
      description: "Gestisci i tuoi album, aggiorna il tuo profilo e connettiti con i tuoi fan su Dorida Solution.",
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
  