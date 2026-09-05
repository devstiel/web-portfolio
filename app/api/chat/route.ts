import { NextResponse } from "next/server";
import { portfolioAnswer } from "@/data/portfolioAnswers";

/** Compatibility endpoint: a local content lookup, with no model or API key. */
export async function POST(request: Request) {
  const body = await request.text();
  if (body.length > 2000)
    return NextResponse.json(
      { error: "Request is too long." },
      { status: 413 },
    );
  let value: unknown;
  try {
    value = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { error: "Send a JSON object with a prompt." },
      { status: 400 },
    );
  }
  if (
    typeof value !== "object" ||
    value === null ||
    !("prompt" in value) ||
    typeof value.prompt !== "string" ||
    !value.prompt.trim() ||
    value.prompt.length > 500
  ) {
    return NextResponse.json(
      { error: "Prompt must contain between 1 and 500 characters." },
      { status: 400 },
    );
  }
  return NextResponse.json({ text: portfolioAnswer(value.prompt) });
}
