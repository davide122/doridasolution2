import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { text } = await request.json(); 
    const response = await axios.post(
      'https://api.elevenlabs.io/v1/text-to-speech/EiNlNiXeDU1pqqOPrYMO',
      {
        text: text,
        model_id: "eleven_turbo_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.5,
          use_speaker_boost: true,
        }
      },
      {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
          'xi-api-key': process.env.ELEVENLABS_KEY // Utilizza una variabile d'ambiente sicura per la chiave API
        }
      }
    );

    // Converte i dati blob in URL creabile e lo invia al client
    return new NextResponse(URL.createObjectURL(response.data));
  } catch (error) {
    // Registra l'errore completo per la diagnosi
    console.error('Error calling ElevenLabs API:', error);

    // Invia una risposta dettagliata dell'errore al client
    return new NextResponse(JSON.stringify({
      message: 'Error calling ElevenLabs API',
      error: error.message,
      response: error.response ? {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      } : null
    }), { status: 500 });
  }
}
