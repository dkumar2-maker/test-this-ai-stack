import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const runtime = 'edge'

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'OpenAI API key not configured. Add OPENAI_API_KEY to .env.local' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const { messages } = await req.json()

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages,
  })

  return result.toTextStreamResponse()
}
