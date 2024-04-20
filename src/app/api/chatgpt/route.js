import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
    const { question } = await request.json();
    const openAIKey = process.env.OPENAI_KEY;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [{ role: "user", content: question }],
                max_tokens: 400,
            },
            {
                headers: {
                    'Authorization': `Bearer ${openAIKey}`,
                }
            }
        );

        const message = response.data.choices[0].message.content.slice(0, 200);
        return new NextResponse(JSON.stringify({ message }), { status: 200 });
    } catch (error) {
        console.error('Error calling OpenAI:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to fetch response from OpenAI' }), { status: 500 });
    }
}

// Ensure to handle methods other than POST
export function middleware(request) {
    if (request.method !== 'POST') {
        return new NextResponse(null, { status: 405 });
    }
}
