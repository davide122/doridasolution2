import NextResponse from 'next';
import fetch from 'node-fetch';


export async function POST(request) {
    if (request.method !== 'POST') {
      return new NextResponse(null, { status: 405 });
    }
  
    try {
      const { message } = await request.json();
      if (!message) {
        return new NextResponse(JSON.stringify({ error: 'Message is required' }), { status: 400 });
      }
  
      // Crea un nuovo thread (se non hai già un ID thread salvato)
      const threadResponse = await callOpenAI('https://api.openai.com/v1/threads', 'POST', {
        assistant_id: 'asst_ryDX834UsWaMAUSVrk80X1Th'
      });
  
      // Invia un messaggio al chatbot
      const sendMessageResponse = await callOpenAI(`https://api.openai.com/v1/threads/${threadResponse.data.id}/messages`, 'POST', {
        messages: [{ role: "user", content: message }]
      });
  
      // (Opzionale) Gestisci runs se necessario
      const runResponse = await callOpenAI(`https://api.openai.com/v1/threads/${threadResponse.data.id}/runs`, 'POST', {});
  
      return new NextResponse(JSON.stringify({ threadResponse: sendMessageResponse, runResponse }), { status: 200 });
    } catch (error) {
      console.error('Error processing request:', error);
      return new NextResponse(JSON.stringify({ error: 'Internal Server Error', details: error.message }), { status: 500 });
    }
  }
  