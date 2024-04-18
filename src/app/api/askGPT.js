///api/askGPT.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const question = req.body.question;
    const openAIKey = process.env.REACT_APP_OPENAI_KEY;

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
      res.status(200).json({ message });
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
