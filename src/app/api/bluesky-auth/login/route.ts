import { blueskyServerClient } from "@/lib/blueskyServerAuth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const handle = searchParams.get('handle');
  const state = searchParams.get('state');

  if (!handle || !state) {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }

  const url = await blueskyServerClient.authorize(handle, {
    signal: request.signal,
    state,
    ui_locales: 'fr-CA fr en',
  });

  return NextResponse.json({ url: url.href });
}
