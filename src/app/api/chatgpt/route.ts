import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt, instructions="" } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
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
          { role: 'system', content: instructions},
          { role: 'user', content: prompt },
        ],
      }),
    });
    const data = await openaiRes.json();
    if (!openaiRes.ok) {
      return NextResponse.json({ error: data.error?.message || 'OpenAI error' }, { status: openaiRes.status });
    }
    return NextResponse.json({ response: data.choices?.[0]?.message?.content || 'No response' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
