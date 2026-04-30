import { Resend } from "resend";

// Lazily instantiate so missing API key only fails at send-time, not at import.
function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY is not set — email sending is disabled.");
    return null;
  }
  return new Resend(key);
}

const FROM = "Bitcoin Facts <notifications@bitcoinbeyond66.com>";
const ADMIN_TO = "glenn@bitcoinbeyond66.com";
const SITE_URL = "https://facts.bitcoinbeyond66.com";
const CONFERENCE_URL = "https://www.bitcoinbeyond66.com";

// ─── Submission notification (existing) ──────────────────────────────────────
interface SubmissionEmailFields {
  inputType: "url" | "text";
  inputUrl?: string | null;
  inputText?: string | null;
  displayName?: string | null;
  contributorEmail?: string | null;
  submissionId: string;
}

export async function sendSubmissionEmail(fields: SubmissionEmailFields): Promise<void> {
  const client = getClient();
  if (!client) return;

  const subjectKind = fields.inputType === "url" ? "Link" : "Text";
  const subject = `New source submission (${subjectKind}) — ${fields.displayName || "Anonymous"}`;

  const escapedText = (fields.inputText || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto;">
      <h2 style="color: #1f2937;">New submission via /contribute</h2>
      <table style="border-collapse: collapse; width: 100%; margin-top: 16px;">
        <tr><td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; width: 140px;">From</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${fields.displayName || "Anonymous"}${fields.contributorEmail ? ` &lt;${fields.contributorEmail}&gt;` : ""}</td></tr>
        <tr><td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Type</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${fields.inputType}</td></tr>
        ${fields.inputUrl ? `<tr><td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Link</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;"><a href="${fields.inputUrl}" style="color: #d97706;">${fields.inputUrl}</a></td></tr>` : ""}
        <tr><td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Submission ID</td>
          <td style="padding: 8px 12px; font-family: monospace; font-size: 12px; color: #6b7280;">${fields.submissionId}</td></tr>
      </table>
      ${fields.inputText ? `<div style="margin-top: 24px;">
        <h3 style="color: #1f2937; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Text</h3>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${escapedText}</div>
      </div>` : ""}
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
        Review at <a href="${SITE_URL}/admin/submissions" style="color: #d97706;">/admin/submissions</a>.
      </div>
    </div>
  `;

  const text = [
    `New submission via /contribute`,
    ``,
    `From: ${fields.displayName || "Anonymous"}${fields.contributorEmail ? ` <${fields.contributorEmail}>` : ""}`,
    `Type: ${fields.inputType}`,
    fields.inputUrl ? `Link: ${fields.inputUrl}` : null,
    `Submission ID: ${fields.submissionId}`,
    ``,
    fields.inputText ? `--- Text ---\n${fields.inputText}` : null,
    ``,
    `Review at: ${SITE_URL}/admin/submissions`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await client.emails.send({
      from: FROM,
      to: ADMIN_TO,
      subject,
      html,
      text,
      replyTo: fields.contributorEmail || undefined,
    });
  } catch (err) {
    console.error("Failed to send submission email:", err);
  }
}

// ─── Newsletter: confirmation + daily fact + unsubscribe-confirm ─────────────

/** Common HTML email shell with conference promo footer. */
function emailShell(content: string, unsubscribeUrl?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>The Bitcoin Evidence Base</title>
</head>
<body style="margin: 0; padding: 0; background: #faf6ee; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 32px 24px;">
    <div style="text-align: center; margin-bottom: 24px;">
      <a href="${SITE_URL}" style="text-decoration: none;">
        <span style="font-family: Georgia, 'Times New Roman', serif; font-size: 18px; font-weight: bold; color: #0f1733;">The Bitcoin</span>
        <span style="font-family: Georgia, 'Times New Roman', serif; font-size: 18px; font-weight: 600; color: #b8861b;">Evidence Base</span>
      </a>
    </div>
    <div style="background: #ffffff; border: 1px solid #e8d9b5; border-radius: 12px; padding: 28px;">
      ${content}
    </div>
    <div style="margin-top: 24px; padding: 20px; background: #fff8e8; border: 1px solid #e8d9b5; border-radius: 12px; text-align: center;">
      <p style="margin: 0 0 8px 0; font-size: 13px; color: #6b6356; font-weight: 600;">Powered by</p>
      <a href="${CONFERENCE_URL}?utm_source=newsletter&utm_medium=email&utm_campaign=daily" style="text-decoration: none;">
        <p style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 16px; font-weight: bold; color: #0f1733;">Bitcoin Beyond 66</p>
        <p style="margin: 4px 0; font-size: 13px; color: #6b6356;">Norway's Bitcoin conference · August 14, 2026 · Above the Arctic Circle</p>
        <p style="margin: 8px 0 0 0; font-size: 13px; color: #b8861b; font-weight: 600;">Get tickets →</p>
      </a>
    </div>
    <div style="margin-top: 16px; text-align: center; font-size: 11px; color: #9b9387;">
      <p style="margin: 0;">You're receiving this because you signed up at facts.bitcoinbeyond66.com.</p>
      ${unsubscribeUrl ? `<p style="margin: 8px 0 0 0;"><a href="${unsubscribeUrl}" style="color: #9b9387;">Unsubscribe</a></p>` : ""}
    </div>
  </div>
</body>
</html>`;
}

/**
 * Sends the double-opt-in confirmation email to a new subscriber.
 * They must click the link to become 'active' and start receiving daily emails.
 */
export async function sendConfirmationEmail(email: string, confirmationToken: string): Promise<boolean> {
  const client = getClient();
  if (!client) return false;

  const confirmUrl = `${SITE_URL}/api/subscribe/confirm?token=${confirmationToken}`;

  const content = `
    <h1 style="margin: 0 0 16px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 24px; color: #0f1733;">Confirm your subscription</h1>
    <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #2d2920;">
      Thanks for signing up. Click the button below to confirm your email address — you'll start receiving a daily Bitcoin claim and the evidence to debunk it.
    </p>
    <div style="text-align: center; margin: 28px 0;">
      <a href="${confirmUrl}" style="display: inline-block; padding: 14px 28px; background: #b8861b; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">Confirm subscription</a>
    </div>
    <p style="margin: 16px 0 0 0; font-size: 13px; color: #6b6356; line-height: 1.6;">
      If the button doesn't work, paste this link into your browser:<br>
      <span style="font-family: monospace; font-size: 12px; color: #9b9387; word-break: break-all;">${confirmUrl}</span>
    </p>
    <p style="margin: 24px 0 0 0; padding-top: 16px; border-top: 1px solid #e8d9b5; font-size: 13px; color: #6b6356;">
      Didn't sign up? Just ignore this email — no further action needed.
    </p>
  `;

  try {
    await client.emails.send({
      from: FROM,
      to: email,
      subject: "Confirm your Bitcoin Evidence Base subscription",
      html: emailShell(content),
      text: `Confirm your subscription to The Bitcoin Evidence Base:\n\n${confirmUrl}\n\nDidn't sign up? Just ignore this email.`,
    });
    return true;
  } catch (err) {
    console.error("Failed to send confirmation email:", err);
    return false;
  }
}

/**
 * Sends the daily Bitcoin claim + evidence email.
 * Includes the FUD claim, the evidence-based reality, source, and the Batten "how to use" tip.
 */
interface DailyFactEmailFields {
  email: string;
  unsubscribeToken: string;
  claim: string;
  reality: string;
  source: string;
  sourceUrl?: string | null;
  battenTip?: string | null;
  categoryName: string;
  categoryIcon: string;
}

export async function sendDailyFactEmail(fields: DailyFactEmailFields): Promise<boolean> {
  const client = getClient();
  if (!client) return false;

  const unsubscribeUrl = `${SITE_URL}/api/subscribe/unsubscribe?token=${fields.unsubscribeToken}`;
  const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const content = `
    <div style="display: inline-block; padding: 4px 10px; background: #fff8e8; border: 1px solid #e8d9b5; border-radius: 999px; font-size: 11px; font-weight: 700; color: #b8861b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 16px;">
      ${fields.categoryIcon} ${escape(fields.categoryName)}
    </div>

    <div style="display: inline-block; padding: 3px 8px; background: #fef2f2; border: 1px solid #fca5a5; border-radius: 999px; font-size: 10px; font-weight: 700; color: #b91c1c; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px;">
      ⚠ Common claim
    </div>

    <h1 style="margin: 0 0 24px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 22px; color: #0f1733; line-height: 1.4; font-style: italic;">
      &ldquo;${escape(fields.claim)}&rdquo;
    </h1>

    <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px 18px; margin-bottom: 20px;">
      <div style="font-size: 11px; font-weight: 700; color: #166534; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">✓ What the evidence shows</div>
      <p style="margin: 0; font-size: 15px; line-height: 1.65; color: #2d2920;">${escape(fields.reality)}</p>
    </div>

    ${fields.battenTip ? `<div style="background: #fff8e8; border: 1px solid #e8d9b5; border-radius: 8px; padding: 16px 18px; margin-bottom: 20px;">
      <div style="font-size: 11px; font-weight: 700; color: #b8861b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">💡 How to use this in a discussion</div>
      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #2d2920;">${escape(fields.battenTip)}</p>
    </div>` : ""}

    <p style="margin: 16px 0 0 0; font-size: 13px; color: #6b6356;">
      <strong>Source:</strong>
      ${fields.sourceUrl ? `<a href="${fields.sourceUrl}" style="color: #b8861b; text-decoration: none;">${escape(fields.source)}</a>` : escape(fields.source)}
    </p>

    <div style="text-align: center; margin: 28px 0 0 0; padding-top: 20px; border-top: 1px solid #e8d9b5;">
      <a href="${SITE_URL}/agent?utm_source=newsletter&utm_medium=email" style="display: inline-block; padding: 12px 24px; background: #b8861b; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
        Try the AI research tool →
      </a>
    </div>
  `;

  const subject = `🟠 ${fields.claim}`;
  const textBody = [
    `Today's Bitcoin claim:`,
    `"${fields.claim}"`,
    ``,
    `What the evidence shows:`,
    fields.reality,
    ``,
    fields.battenTip ? `How to use this:\n${fields.battenTip}\n` : null,
    `Source: ${fields.source}${fields.sourceUrl ? ` (${fields.sourceUrl})` : ""}`,
    ``,
    `Try the research tool: ${SITE_URL}/agent`,
    ``,
    `---`,
    `Unsubscribe: ${unsubscribeUrl}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await client.emails.send({
      from: FROM,
      to: fields.email,
      subject,
      html: emailShell(content, unsubscribeUrl),
      text: textBody,
    });
    return true;
  } catch (err) {
    console.error("Failed to send daily fact email to", fields.email, err);
    return false;
  }
}
