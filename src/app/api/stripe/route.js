// pages/api/payment.js

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async function post(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { title, description, price } = req.body;

    // Creazione della sessione di pagamento con Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: title,
              description,
            },
            unit_amount: price * 100, // Il prezzo deve essere in centesimi
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'www.doridasolution.com/successpayment', // URL di reindirizzamento dopo il successo del pagamento
      cancel_url: 'www.doridasolution.com/cancelpayment', // URL di reindirizzamento dopo l'annullamento del pagamento
    });

    return res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error during payment:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
