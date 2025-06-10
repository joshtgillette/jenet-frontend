import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { prompt, instructions } = body;
  if (!prompt) {
    return new Response(JSON.stringify({ error: 'Missing prompt' }), { status: 400 });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: instructions || 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
      }),
    });
    const data = await openaiRes.json();
    if (!openaiRes.ok) {
      return new Response(JSON.stringify({ error: data.error?.message || 'OpenAI error' }), { status: openaiRes.status });
    }
    return new Response(JSON.stringify({ response: data.choices?.[0]?.message?.content || 'No response' }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Server error' }), { status: 500 });
  }
}
