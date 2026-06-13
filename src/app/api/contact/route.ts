const requiredFields = ["name", "email", "projectType", "message"] as const;

type ContactPayload = Record<(typeof requiredFields)[number], string>;

function isContactPayload(payload: unknown): payload is ContactPayload {
  if (!payload || typeof payload !== "object") return false;

  return requiredFields.every((field) => {
    const value = (payload as Record<string, unknown>)[field];
    return typeof value === "string" && value.trim().length > 0;
  });
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!isContactPayload(payload)) {
    return Response.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "businesswithchirag267@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "EcomXpertStudio <onboarding@resend.dev>";

  if (!resendApiKey) {
    return Response.json({ ok: true, delivered: false, fallback: "mailto-whatsapp" });
  }

  const text = [
    "New EcomXpertStudio project brief",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Project type: ${payload.projectType}`,
    "",
    "Project details:",
    payload.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: payload.email,
      subject: `New ${payload.projectType} inquiry from ${payload.name}`,
      text,
    }),
  });

  if (!response.ok) {
    return Response.json({ ok: false, delivered: false }, { status: 502 });
  }

  return Response.json({ ok: true, delivered: true });
}
