// PaymentForm.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Form, Button, Alert } from 'react-bootstrap';

const stripePromise = loadStripe('pk_live_51PEVEOAgwduzB1fONehY35oyxja1K5XquGKoW5UP2E53Ge7udr2d2sIW7IyyBRrRf8ATRWfJ66vO3PEvgJuDl2a300pYMK8jc1');

const PaymentForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [albumDetails, setAlbumDetails] = useState({
    title: '',
    release_date: '',
    cover_url: '',
    description: ''
  });

  const cardElementOptions = {
    style: {
        base: {
          color: '#ffffff', // Bianco
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '20px', // Dimensione del testo
          '::placeholder': {
            color: '#ffff', // Azzurro chiaro
          },
 // Nero o grigio scuro come sfondo per un contrasto
          padding: '10px', // Margini interni
          borderRadius: '8px', // Bordi arrotondati
        },
        invalid: {
            iconColor:"#fa755a",
          color: '#fa755a', // Rosso chiaro per errori
        },
        complete: {
            color: '#4caf50', // Colore del testo per campi completati
            iconColor: '#4caf50', // Colore dell'icona per campi completati
          },
      },
    };
  
  const handlePayment = async (e) => {
    e.preventDefault();

    // Ottieni il client_secret dal server
    const response = await fetch('/api/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ album_title: albumDetails.title }),
    });
    // http://localhost:3000/artistpage
    if (!response.ok) {
      setMessage('Errore durante la creazione del pagamento.');
      return;
    }

    const { client_secret } = await response.json();
    const card = elements.getElement(CardElement);

    // Conferma il pagamento con Stripe
    const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: card,
      },
    });

    if (error) {
      setMessage(`Errore durante il pagamento: ${error.message}`);
    } else if (paymentIntent.status === 'succeeded') {
      setMessage('Pagamento effettuato con successo!');

      // Invia i dettagli dell'album all'API per l'aggiunta
      const token = localStorage.getItem('token');
      const albumResponse = await fetch('/api/songs/album', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(albumDetails),
      });

      if (albumResponse.ok) {
        onPaymentSuccess();
      } else {
        setMessage('Errore durante l\'aggiunta dell\'album.');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlbumDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handlePayment} className="p-3  ">
      <h2 className="mb-4 text-center Titolo text-white fs-3">Aggiungi Nuovo Album</h2>
      <Form.Group controlId="formTitle" className="mb-3 ">
        <Form.Control
          name="title"
          value={albumDetails.title}
          onChange={handleInputChange}
          required
          placeholder="Titolo dell'album"
        />
      </Form.Group>
      <Form.Group controlId="formReleaseDate" className="mb-3">
        <Form.Control
          type="date"
          name="release_date"
          value={albumDetails.release_date}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formCoverUrl" className="mb-3">
        <Form.Control
          name="cover_url"
          value={albumDetails.cover_url}
          onChange={handleInputChange}
          required
          placeholder="URL dell'immagine di copertina"
        />
      </Form.Group>
      <Form.Group controlId="formDescription" className="mb-3">
        <Form.Control
          as="textarea"
          name="description"
          value={albumDetails.description}
          onChange={handleInputChange}
          required
          placeholder="Descrizione dell'album"
        />
      </Form.Group>

      <Form.Group controlId="formCardElement" className="mb-3">
        <div className="credit-card p-2 border rounded">
          <CardElement className='text-white' options={cardElementOptions}/>
        </div>
      </Form.Group>

      <Button type="submit" variant="primary" disabled={!stripe} className="w-100 mb-3">
        Paga 10 Euro e Aggiungi Album
      </Button>

      {message && <Alert variant={message.includes('errore') ? 'danger' : 'success'}>{message}</Alert>}
    </Form>
  );
};

const WrappedPaymentForm = ({ onPaymentSuccess }) => (
  <Elements stripe={stripePromise}>
    <PaymentForm onPaymentSuccess={onPaymentSuccess} />
  </Elements>
);

export default WrappedPaymentForm;
