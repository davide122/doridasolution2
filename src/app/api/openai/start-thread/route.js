import { NextResponse } from 'next/server';
import axios from 'axios';

// Crea un nuovo thread
export async function POST() {
  const openAIKey = process.env.OPENAI_KEY;

  try {
    const res = await axios.post(
      'https://api.openai.com/v1/threads',
      {},
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
