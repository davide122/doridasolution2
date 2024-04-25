/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,  // Abilita la modalità strict per React
    poweredByHeader: false, // Disabilita l'intestazione "X-Powered-By" per le risposte del server
    images: {
      domains: ['https://eu-north-1.console.aws.amazon.com/'],  // Specifica quali domini esterni possono servire immagini
    }
  };
  
  export default nextConfig;
  