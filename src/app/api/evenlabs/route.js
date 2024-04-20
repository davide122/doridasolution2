// /app/api/sendToEvenlabs.js
import axios from 'axios';

export async function POST(request) {
  const { text } = await request.json(); // Assumi che 'text' venga passato nel body della richiesta
  const response = await axios.post(
    'https://api.elevenlabs.io/v1/text-to-speech/efJVaDDMBq2ch2Qf4phN',
    {
      text: text,
      model_id: "eleven_multilingual_v2",
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
}
