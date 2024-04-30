
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
      title: "Dorida solution - Register",
      description: "Register to Dorida Solution",
    };
    
    export default function RootLayout({ children }) {
      return (
        <html lang="en">
          <body>{children}</body>
        </html>
      );
    }
    