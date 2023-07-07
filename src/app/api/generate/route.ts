import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  const body = await request.json();
  const promptString = body.prompt;

  if (!promptString) {
    return NextResponse.json(
      {
        error: 'prompt is required',
      },
      {
        status: 400,
      }
    );
  }

  const aiResponse = await openai.createImage({
    prompt: promptString,
    n: 1,
    size: '512x512',
  });

  return NextResponse.json(
    {
      url: aiResponse.data.data[0].url,
    },
    {
      status: 200,
    }
  );
}
