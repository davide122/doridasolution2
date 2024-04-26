
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
  title: "Login",
  description: "Login to Dorida Solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
