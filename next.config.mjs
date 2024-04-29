/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,  // Abilita la modalità strict per React
    poweredByHeader: false, // Disabilita l'intestazione "X-Powered-By" per le risposte del server
    images: {
      domains: ['doridasolutionbucket.s3.eu-north-1.amazonaws.com', "m.media-amazon.com","cdn.venngage.com","www.repstatic.it","letsenhance.io","www.nationalgeographic.it"],  // Specifica quali domini esterni possono servire immagini
    }
  };
  
  export default nextConfig;
  