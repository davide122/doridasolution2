import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css'; // Aggiungi questa linea
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({ subsets: ["latin"] });

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
  title: "Dorida Solution - Leader in Soluzioni Digitali e Marketing Online",
  description: "Dorida Solution offre servizi professionali di marketing digitale, sviluppo web, SEO, gestione dei social media, pubblicità online, analisi dei dati, e sicurezza informatica. Scopri come possiamo trasformare la tua presenza digitale.",
  keywords: "marketing digitale, sviluppo web, SEO, social media management, pubblicità online, analisi dati, sicurezza informatica, consulenza IT, soluzioni e-commerce, ottimizzazione dei motori di ricerca, marketing dei contenuti, strategie di branding, automazione del marketing, sviluppo app, web design",
  canonical: "https://www.doridasolution.com",
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://www.doridasolution.com',
    title: 'Dorida Solution - Leader in Soluzioni Digitali e Marketing Online',
    description: 'Offriamo una gamma completa di servizi digitali: dal marketing digitale al web development, SEO, e oltre. Scopri i vantaggi delle nostre soluzioni innovative.',
    image: 'https://www.doridasolution.com/images/seo-marketing.jpg'
  }}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <SpeedInsights/>

      <body className={inter.className}>{children}</body>
    
    </html>
  );
}
