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
  title: "Termini e Condizioni - Dorida Solution",
  description: "Leggi i Termini e le Condizioni di utilizzo dei servizi offerti da Dorida Solution, inclusi sviluppo web, marketing digitale e soluzioni e-commerce.",
  keywords: "termini e condizioni, privacy, dorida solution, servizi digitali, legale, politiche",
  canonical: "https://www.doridasolution.com/terms",
  openGraph: {
      type: 'website',
      locale: 'it_IT',
      url: 'https://www.doridasolution.com/terms',
      title: 'Termini e Condizioni di Dorida Solution',
      description: 'Scopri i termini di utilizzo dei servizi digitali e delle soluzioni di marketing offerti da Dorida Solution. Assicurati di comprendere le nostre politiche prima di utilizzare i nostri servizi.',
      image: 'https://www.doridasolution.com/images/terms-conditions-banner.jpg'
  }
}

export default function RootLayout({ children }) {
    return (
      <html lang="it">
        <body>{children}</body>
  
      </html>
    )
  };