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
const TO = "glenn@bitcoinbeyond66.com";

interface SubmissionEmailFields {
  inputType: "url" | "text";
  inputUrl?: string | null;
  inputText?: string | null;
  displayName?: string | null;
  contributorEmail?: string | null;
  submissionId: string;
}

/**
 * Sends a notification email to the admin when a new contribution arrives via /contribute.
 * Failures are logged but never thrown — we don't want a Resend hiccup to break the
 * submit flow. The submission is already stored in Supabase as a permanent record.
 */
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
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; width: 140px;">From</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${fields.displayName || "Anonymous"}${fields.contributorEmail ? ` &lt;${fields.contributorEmail}&gt;` : ""}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Type</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${fields.inputType}</td>
        </tr>
        ${fields.inputUrl ? `
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Link</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;"><a href="${fields.inputUrl}" style="color: #d97706;">${fields.inputUrl}</a></td>
        </tr>` : ""}
        <tr>
          <td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Submission ID</td>
          <td style="padding: 8px 12px; font-family: monospace; font-size: 12px; color: #6b7280;">${fields.submissionId}</td>
        </tr>
      </table>
      ${fields.inputText ? `
      <div style="margin-top: 24px;">
        <h3 style="color: #1f2937; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Text</h3>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${escapedText}</div>
      </div>` : ""}
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
        Review and process at
        <a href="https://facts.bitcoinbeyond66.com/admin/submissions" style="color: #d97706;">/admin/submissions</a>
        — or paste the source into the chat with Claude for high-quality fact extraction.
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
    `Review at: https://facts.bitcoinbeyond66.com/admin/submissions`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await client.emails.send({
      from: FROM,
      to: TO,
      subject,
      html,
      text,
      replyTo: fields.contributorEmail || undefined,
    });
  } catch (err) {
    console.error("Failed to send submission email:", err);
    // Swallow — submission is already saved in DB.
  }
}
