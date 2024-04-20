import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css'; // Aggiungi questa linea
import "./globals.css"
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dorida Solution - Soluzioni Digitali Innovative",
  description: "Creato dai professionisti per i professionisti. Scopri i nostri servizi innovativi di marketing digitale, sviluppo web e molto altro.",
  canonical: "www.doridasolution.com",
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'www.doridasolution.com',
    title: 'Dorida Solution - Soluzioni Digitali Innovative',
    description: 'Creato dai professionisti per i professionisti. Scopri i nostri servizi innovativi di marketing digitale, sviluppo web e molto altro.',
    image: 'https://www.tuosito.com/image.jpg'
  }}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
       <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
  <meta name="description" content={metadata.description} />
  <link rel="canonical" href={`https://${metadata.canonical}`} />
  <meta property="og:type" content={metadata.openGraph.type} />
  <meta property="og:locale" content={metadata.openGraph.locale} />
  <meta property="og:url" content={`https://${metadata.openGraph.url}`} />
  <meta property="og:title" content={metadata.openGraph.title} />
  <meta property="og:description" content={metadata.openGraph.description} />
  <meta property="og:image" content={metadata.openGraph.image} />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
