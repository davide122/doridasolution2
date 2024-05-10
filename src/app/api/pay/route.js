// /pages/api/create-payment-intent.js

// /src/app/api/pay/route.js
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// Crea un'istanza di Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

// Gestione della richiesta POST
export async function POST(request) {
  try {
    // Estrai il titolo dell'album dal corpo della richiesta
    const { album_title } = await request.json();

    // Crea un intento di pagamento con Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 50, // 10 euro in centesimi
      currency: 'eur',
      description: `Pagamento per l'aggiunta dell'album: ${album_title}`,
    });

    // Rispondi con il client_secret per completare il pagamento lato client
    return NextResponse.json({ client_secret: paymentIntent.client_secret }, { status: 200 });
  } catch (error) {
    console.error('Errore durante la creazione del pagamento:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
