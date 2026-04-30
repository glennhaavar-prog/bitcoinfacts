import Link from "next/link";
import { Check, AlertCircle, ArrowRight } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ status?: string; error?: string }>;
}

export default async function UnsubscribePage({ searchParams }: PageProps) {
  const params = await searchParams;

  let icon: React.ReactNode;
  let title: string;
  let body: string;

  if (params.error === "missing-token" || params.error === "invalid-token") {
    icon = <AlertCircle className="w-8 h-8 text-eb-red" />;
    title = "Link not valid";
    body = "This unsubscribe link is missing or invalid. If you'd like to unsubscribe, click the link from any of our emails — or contact us directly.";
  } else if (params.error === "server") {
    icon = <AlertCircle className="w-8 h-8 text-eb-red" />;
    title = "Something went wrong";
    body = "We hit a snag processing your unsubscribe. Please try the link again, or contact us at glenn@bitcoinbeyond66.com.";
  } else if (params.status === "already-out") {
    icon = <Check className="w-8 h-8 text-eb-muted" />;
    title = "Already unsubscribed";
    body = "You're already off the list. No further emails will be sent.";
  } else {
    icon = <Check className="w-8 h-8 text-eb-green" />;
    title = "You're unsubscribed";
    body = "We've removed your email from the daily list. Sorry to see you go — if you change your mind, you can re-subscribe any time.";
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="card p-8 sm:p-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-eb-surface-2 border border-eb-border flex items-center justify-center mx-auto mb-5">
          {icon}
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-eb-navy mb-3">
          {title}
        </h1>
        <p className="text-eb-muted leading-relaxed mb-8">{body}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-eb-surface-2 hover:bg-eb-border text-eb-slate text-sm font-medium rounded-lg border border-eb-border transition-colors"
        >
          Back to home
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
