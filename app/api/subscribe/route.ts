import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  if (!email || !name) {
    return NextResponse.json({ ok: false, message: "Name and email are required." }, { status: 400 });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey || !groupId) {
    console.error("Missing MAILERLITE_API_KEY or MAILERLITE_GROUP_ID env vars");
    return NextResponse.json({ ok: false, message: "Server configuration error." }, { status: 500 });
  }

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      email,
      fields: { name },
      groups: [groupId],
    }),
  });

  // 200 = updated existing subscriber, 201 = new subscriber, 409 = already subscribed
  if (res.status === 200 || res.status === 201 || res.status === 409) {
    return NextResponse.json({ ok: true });
  }

  const body = await res.json().catch(() => ({}));

  // MailerLite also returns a 422 with "already_subscribed" in some cases
  const message = (body?.message ?? "") as string;
  if (message.toLowerCase().includes("already") || message.toLowerCase().includes("subscribed")) {
    return NextResponse.json({ ok: true });
  }

  console.error("MailerLite error:", res.status, body);
  return NextResponse.json({ ok: false, message: "Something went wrong. Please try again." }, { status: 500 });
}
