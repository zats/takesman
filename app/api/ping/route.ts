import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { message } = body;

  return NextResponse.json({
    received: message,
    serverResponse: 'pong',
    timestamp: new Date().toISOString(),
    serverSide: true,
  });
}
