
export const metadata = {
    title: "Dorida Solution Admin - Gestione e Amministrazione",
    description: "Accedi alla piattaforma amministrativa di Dorida Solution per gestire operazioni, comunicazioni e risorse interne. Strumenti dedicati per ottimizzare la gestione quotidiana.",
    canonical: "www.doridasolution/admin",
    openGraph: {
      type: 'website',
      locale: 'it_IT',
      url: 'www.doridasolution/admin',
      title: "Dorida Solution Admin - Gestione e Amministrazione",
      description: "Accedi alla dashboard amministrativa per gestire tutte le operazioni e le comunicazioni interne di Dorida Solution. Strumenti specifici per amministratori per migliorare l'efficienza.",
      image: 'https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/adminMeta/DoridaAdmin.png'  // Assicurati che l'URL punti a un'immagine appropriata per la pagina admin
    }
  }
export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
};