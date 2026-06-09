import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Khwahish Taneja's personal LinkedIn outreach assistant. Khwahish is a CHRP-certified career coach and active hiring manager who helps internationally-trained professionals land jobs in Canada.

Your job is to draft warm, professional, and concise LinkedIn replies on Khwahish's behalf. The tone should be helpful, confident, and human — not salesy or robotic. Replies should be short enough to feel conversational (2–5 sentences max unless the situation requires more).

Key context about Khwahish's work:
- She offers 1:1 career coaching, resume rewrites, interview prep, and strategy sessions
- She also sells digital resources (resume templates, interview guides, 30-day job search playbook)
- She runs workshops for colleges and universities serving international students
- She books free 15-minute intro calls via Cal.com

Guidelines for replies:
- Match the energy and formality of the incoming message
- Never be pushy or aggressive about booking a call
- If someone isn't a fit, be gracious and wish them well
- If someone has a specific question, answer it briefly and naturally
- Always sound like a real person, not a template
- Do not use em-dashes excessively
- Do not start with "Great question!" or generic openers`;

export async function POST(req: NextRequest) {
  const password = process.env.ASSISTANT_PASSWORD ?? "khwahish2026";

  let body: { message?: string; stage?: string; authPassword?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (body.authPassword !== password) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const { message, stage } = body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ ok: false, error: "Message is required." }, { status: 400 });
  }
  if (!stage || typeof stage !== "string") {
    return NextResponse.json({ ok: false, error: "Stage is required." }, { status: 400 });
  }

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Conversation stage: ${stage}. Incoming message: ${message.trim()}. Draft a reply.`,
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json({ ok: false, error: "No response generated." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, reply: textBlock.text });
  } catch (err) {
    console.error("Anthropic API error:", err);
    return NextResponse.json({ ok: false, error: "Failed to generate reply. Check your API key." }, { status: 500 });
  }
}
