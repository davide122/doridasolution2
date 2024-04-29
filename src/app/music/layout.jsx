
export const metadata = {
  icons: {
    icon: {
      url: "/favicon.ico", // Corretto il percorso
      type: "image/x-icon" // Cambiato in tipo più comune per .ico
    },
    shortcut: {
      url: "/favicon.ico", // Corretto il percorso
      type: "image/x-icon" // Cambiato in tipo più comune per .ico
    },
  },
    title: "Dorida Music - Promuovendo l'Arte Musicale",
    description: "Scopri i nostri eventi, rilasci musicali e talenti emergenti. Dorida Music porta l'innovazione nel mondo della musica.",
    keywords: "Digitalizzazione, Web agency digitale, Sviluppo siti web, Marketing digitale, Branding aziendale, Video marketing, Smart home solutions, Gestione sponsorizzazioni, Produzione jingle pubblicitari, Editoria digitale, Automazione B&B, Inclusione digitale, Innovazione ospitalità, Il Bentornato Emigrato, Social media strategy, Condivisione profitti, Sviluppo sostenibile, Community engagement, Tecnologie avanzate, Supporto reciproco, Gestione inventari, Progetti no-profit, Soluzioni B2B, Web design full-stack, Marketing influencer, Gestione contenuti digitali, Campagne pubblicitarie creative, Innovazione tecnologica, Soluzioni marketing personalizzate, Espansione comunitaria, SEO, social media management, pubblicità online, analisi dati, sicurezza informatica, consulenza IT, soluzioni e-commerce, ottimizzazione dei motori di ricerca, marketing dei contenuti, strategie di branding, automazione del marketing, sviluppo app, web design",
  canonical: "https://www.doridasolution.com/music",
    openGraph: {
      type: 'website',
      locale: 'it_IT',
      url: 'https://www.doridasolution.com/music',
      title: "Dorida Music - Promuovendo l'Arte Musicale",
      description: "Scopri i nostri eventi, rilasci musicali e talenti emergenti. Dorida Music porta l'innovazione nel mondo della musica.",
      image: 'https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/doridaMeta/Dorida+music.png'  // Aggiorna l'URL con l'immagine appropriata
    }
  }
  
export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
};