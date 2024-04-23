import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css'; // Aggiungi questa linea
import "./globals.css"

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
