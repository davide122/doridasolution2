//Metadata completi
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
    title: "Dorida Solution - Soluzioni Digitali e Servizi di Marketing",
    description: "Esplora una gamma di servizi digitali su misura: sviluppo web, marketing digitale, SEO, e-commerce e molto altro. Perfetti per aziende che cercano di innovare e ottimizzare la loro presenza online.",
    keywords: "soluzioni digitali, marketing digitale, sviluppo web, SEO, e-commerce, innovazione digitale",
    canonical: "https://www.doridasolution.com/services",
    openGraph: {
      type: 'website',
      locale: 'it_IT',
      url: 'https://www.doridasolution.com/services',
      title: 'Dorida Solution - Servizi Digitali e Marketing',
      description: 'Esplora una gamma di servizi digitali su misura: sviluppo web, marketing digitale, SEO, e-commerce e molto altro. Perfetti per aziende che cercano di innovare e ottimizzare la loro presenza online.',
      image: 'https://www.doridasolution.com/images/servizi-banner.jpg'
  }


}
export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}