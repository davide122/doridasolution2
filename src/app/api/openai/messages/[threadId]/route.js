import { NextResponse } from 'next/server';
import axios from 'axios';

// Invia un messaggio a un thread esistente
export async function POST(req, { params }) {
  const { threadId } = params;
  const openAIKey = process.env.OPENAI_KEY;
  const body = await req.json();

  try {
    const res = await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      {
        role: 'user',
        content: body.content,
      },
      {
        headers: {
          Authorization: `Bearer ${openAIKey}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2',
        },
      }
    );
    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req, { params }) {
    const { threadId } = params; // Ottieni l'ID del thread dalla richiesta
    const openAIKey = process.env.OPENAI_KEY;
  
    try {
      // Richiedi i messaggi da OpenAI per quel thread
      const res = await axios.get(
        `https://api.openai.com/v1/threads/${threadId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${openAIKey}`,
            'Content-Type': 'application/json',
            'OpenAI-Beta':'assistants=v2',
          },
        }
      );
  
      // Restituisci i messaggi ottenuti come risposta JSON
      return NextResponse.json(res.data, { status: 200 });
    } catch (error) {
      // Gestisci gli errori restituendo un messaggio di errore con codice 500
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
