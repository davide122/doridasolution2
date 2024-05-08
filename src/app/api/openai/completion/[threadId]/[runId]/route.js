import { NextResponse } from 'next/server';
import axios from 'axios';

// Controlla lo stato di completamento della run
export async function GET(req, { params }) {
  const { threadId, runId } = params;
  const openAIKey = process.env.OPENAI_KEY;

  try {
    const res = await axios.get(
      `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
      {
        headers: {
          Authorization: `Bearer ${openAIKey}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v1',
        },
      }
    );
    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
