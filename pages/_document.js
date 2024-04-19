// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/public/favicon.ico" />
        {/* Puoi aggiungere qui altri tag meta, link o script che sono comuni a tutte le pagine */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
