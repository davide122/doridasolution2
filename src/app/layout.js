import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css"; // Aggiungi questa linea
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { AlertProvider } from "../components/AlertComponent/AlertContext"; // Adjust the path as needed
import Providers from "./store/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  icons: {
    icon: {
      url: "/favicon.ico", // Corretto il percorso
      type: "image/x-icon", // Cambiato in tipo più comune per .ico
    },
    shortcut: {
      url: "/favicon.ico", // Corretto il percorso
      type: "image/x-icon", // Cambiato in tipo più comune per .ico
    },
  },
  title: "Dorida Solution - Leader in Soluzioni Digitali e Marketing Online ad Agrigento",
  description:
    "Dorida Solution, con sede ad Agrigento offre servizi professionali di marketing digitale, sviluppo web, SEO, gestione dei social media, pubblicità online, analisi dei dati, e sicurezza informatica. Scopri come possiamo trasformare la tua presenza digitale.",
  keywords:
    "Digitalizzazione, Web agency digitale, Sviluppo siti web, Marketing digitale, Branding aziendale, Video marketing, Smart home solutions, Gestione sponsorizzazioni, Produzione jingle pubblicitari, Editoria digitale, Automazione B&B, Inclusione digitale, Innovazione ospitalità, Il Bentornato Emigrato, Social media strategy, Condivisione profitti, Sviluppo sostenibile, Community engagement, Tecnologie avanzate, Supporto reciproco, Gestione inventari, Progetti no-profit, Soluzioni B2B, Web design full-stack, Marketing influencer, Gestione contenuti digitali, Campagne pubblicitarie creative, Innovazione tecnologica, Soluzioni marketing personalizzate, Espansione comunitaria, SEO, social media management, pubblicità online, analisi dati, sicurezza informatica, consulenza IT, soluzioni e-commerce, ottimizzazione dei motori di ricerca, marketing dei contenuti, strategie di branding, automazione del marketing, sviluppo app, web design",
  canonical: "https://www.doridasolution.com",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.doridasolution.com",
    title: "Dorida Solution - Leader in Soluzioni Digitali e Marketing Online ad Agrigento",
    description:
      "Offriamo una gamma completa di servizi digitali: dal marketing digitale al web development, SEO, e oltre. Scopri i vantaggi delle nostre soluzioni innovative.",
    image: "https://www.doridasolution.com/images/seo-marketing.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <SpeedInsights />
      <Analytics></Analytics>
      <AlertProvider>
        <body className={inter.className}>
          <Providers>
           {children}
          </Providers>
        </body>
      </AlertProvider>
    </html>
  );
}
