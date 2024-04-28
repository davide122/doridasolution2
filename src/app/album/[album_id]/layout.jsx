

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
    title: "About - Dorida Solution",
    description: "Scopri di più su Dorida Solution, una web agency innovativa impegnata nella digitalizzazione e nel miglioramento della vita quotidiana attraverso tecnologie avanzate e un forte impegno sociale.",
    keywords: "Dorida Solution, digitalizzazione, tecnologia, impegno sociale, web agency",
    og: {
        title: "Scopri Dorida Solution",
        type: "website",
        url: "http://www.doridasolution.com/about",
        image: "http://www.doridasolution.com/assets/images/about-og-image.jpg",
        description: "Visita la pagina About di Dorida Solution per esplorare come ci impegniamo a trasformare la digitalizzazione in un vantaggio accessibile e a promuovere il benessere comunitario.",
        site_name: "Dorida Solution"
    },
      
    };
    
    export default function RootLayout({ children, albumData}) {
      return (
        <html lang="en">
        
          <body>{children}</body>
        </html>
      );
    }
    