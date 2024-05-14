import { NextResponse } from 'next/server';
import axios from 'axios';

// Avvia una run per un thread specifico
export async function POST(req, { params }) {
  const { threadId } = params;
  const openAIKey = process.env.OPENAI_KEY;
  const body = await req.json();

  try {
    const res = await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/runs`,
      {
        assistant_id: body.assistantId,
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
