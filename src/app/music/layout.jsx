
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
    canonical: "www.doridasolution/doridamusic",
    openGraph: {
      type: 'website',
      locale: 'it_IT',
      url: 'www.doridasolution/doridamusic',
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