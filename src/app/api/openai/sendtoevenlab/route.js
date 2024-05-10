// app/api/elevenlabs/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  // Chiave API di ElevenLabs (meglio utilizzare variabili d'ambiente per la sicurezza)
  const elevenLabsApiKey = process.env.ELEVENLABS_KEY;
  const body = await req.json(); // Ottieni il testo dalla richiesta

  // Verifica che il testo sia fornito
  if (!body.text) {
    return NextResponse.json({ error: 'Text is required.' }, { status: 400 });
  }

  try {
    // Richiesta a ElevenLabs per la sintesi vocale
    const response = await axios.post(
      'https://api.elevenlabs.io/v1/text-to-speech/eUyfQOl1LW94ySVToNWD',
      {
        text: body.text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.7,
          similarity_boost: 0.7,
          style: 0.0,
          use_speaker_boost: true,
        },
      },
      {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
          'xi-api-key': elevenLabsApiKey,
        },
      }
    );

    // Converti l'audio in base64 per facilitarne il trasferimento
    const audioBase64 = Buffer.from(response.data).toString('base64');

    // Restituisci il risultato come un oggetto JSON
    return NextResponse.json({ audio: audioBase64 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
