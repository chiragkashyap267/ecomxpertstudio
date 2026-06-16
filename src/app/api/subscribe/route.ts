import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

/* ─── Brevo transactional email helper ───────────────────── */
async function sendWelcomeEmail(email: string) {
  const BREVO_API_KEY    = process.env.BREVO_API_KEY;
  const SENDER_EMAIL     = process.env.BREVO_SENDER_EMAIL ?? "hello@ecomxpertstudio.com";
  const SENDER_NAME      = process.env.BREVO_SENDER_NAME  ?? "EcomXpertStudio";

  if (!BREVO_API_KEY) {
    console.warn("[subscribe] BREVO_API_KEY not set — skipping email send");
    return;
  }

  const body = {
    sender:     { name: SENDER_NAME, email: SENDER_EMAIL },
    to:         [{ email }],
    subject:    "Welcome to EcomXpertStudio 🚀",
    htmlContent: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to EcomXpertStudio</title>
</head>
<body style="margin:0;padding:0;background:#020617;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0b56a6 0%,#0ea5e9 100%);border-radius:16px 16px 0 0;padding:40px 40px 32px;text-align:center;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(224,242,254,0.7);">PREMIUM DIGITAL STUDIO</p>
              <h1 style="margin:0;font-size:32px;font-weight:900;color:#fff;letter-spacing:-0.02em;">Ecom<span style="color:#7dd3fc;">Xpert</span>Studio</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#0f172a;padding:40px;border-left:1px solid rgba(14,165,233,0.15);border-right:1px solid rgba(14,165,233,0.15);">
              <h2 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#fff;">You're in. Welcome! 🎉</h2>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:rgba(148,163,184,0.9);">
                Thank you for joining the EcomXpertStudio insider list. You'll be the first to know about:
              </p>
              <ul style="margin:0 0 24px;padding-left:20px;color:rgba(148,163,184,0.9);font-size:15px;line-height:2;">
                <li>🎨 New premium design and mockup drops</li>
                <li>🌐 Web and app project showcases</li>
                <li>📦 Packaging and A+ content case studies</li>
                <li>🎬 Motion and video campaign samples</li>
                <li>💡 Tips for scaling ecommerce brands</li>
              </ul>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin:28px 0;">
                <tr>
                  <td style="background:linear-gradient(135deg,#0ea5e9,#6366f1);border-radius:10px;padding:1px;">
                    <a href="https://ecomxpertstudio.com/portfolio" style="display:block;padding:14px 32px;background:linear-gradient(135deg,#0ea5e9,#6366f1);border-radius:10px;font-size:14px;font-weight:700;color:#fff;text-decoration:none;text-align:center;">
                      View Our Portfolio →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:rgba(148,163,184,0.65);">
                Want to discuss a project right now? 
                <a href="https://calendly.com/businesswithchirag267" style="color:#0ea5e9;text-decoration:none;font-weight:600;">Book a free 30-min call</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#020617;border-radius:0 0 16px 16px;border:1px solid rgba(14,165,233,0.1);border-top:none;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:rgba(148,163,184,0.45);">
                © ${new Date().getFullYear()} EcomXpertStudio · 46 Mahdi Road, Roorkee, Uttarakhand 247667
              </p>
              <p style="margin:0;font-size:11px;color:rgba(148,163,184,0.35);">
                You received this because you subscribed on our website. 
                <a href="#" style="color:rgba(148,163,184,0.5);">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  };

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[subscribe] Brevo error:", res.status, text);
  }
}

/* ─── API Route ──────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json() as { email?: string; source?: string };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const emailLower = email.toLowerCase().trim();

    // 1. Check for duplicate
    const existing = await adminDb
      .collection("subscribers")
      .where("email", "==", emailLower)
      .limit(1)
      .get();

    if (!existing.empty) {
      return NextResponse.json({ message: "already_subscribed" }, { status: 200 });
    }

    // 2. Save to Firestore
    await adminDb.collection("subscribers").add({
      email:     emailLower,
      source:    source ?? "website_popup",
      createdAt: new Date().toISOString(),
      ip:        req.headers.get("x-forwarded-for") ?? "unknown",
    });

    // 3. Send welcome email via Brevo (non-blocking)
    sendWelcomeEmail(emailLower).catch((err) =>
      console.error("[subscribe] Failed to send welcome email:", err)
    );

    return NextResponse.json({ message: "subscribed" }, { status: 201 });
  } catch (err) {
    console.error("[subscribe] Error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
