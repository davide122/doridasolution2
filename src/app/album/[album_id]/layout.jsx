

export const metadata = {
  icons: {
    icon: {
      url: "/favicon.ico", // Mantenuto il percorso corretto
      type: "image/x-icon" // Tipo comune per .ico
    },
    shortcut: {
      url: "/favicon.ico", // Mantenuto il percorso corretto
      type: "image/x-icon" // Tipo comune per .ico
    },
  },
  title: "Album Music - Dorida Solution",
  description: "Esplora la nostra collezione esclusiva di album musicali. Dorida Solution offre una varietà unica di generi musicali che connettono culture e passioni.",
  keywords: "Dorida Solution, album musicali, generi musicali, cultura musicale, collezione esclusiva",
  canonical:"http://www.doridasolution.com/music",
  og: {
      title: "Esplora gli Album Musicali di Dorida Solution",
      type: "website",
      url: "http://www.doridasolution.com/music",
      image: "http://www.doridasolution.com/assets/images/albums-og-image.jpg",
      description: "Visita la nostra sezione album per scoprire collezioni musicali uniche che attraversano diverse culture e generazioni.",
      site_name: "Dorida Solution"
  },
};
    export default function RootLayout({ children}) {
      return (
        <html lang="en">
        
          <body>{children}</body>
        </html>
      );
    }
    