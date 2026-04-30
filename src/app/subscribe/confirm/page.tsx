import Link from "next/link";
import { Check, AlertCircle, BookOpen, ArrowRight } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ status?: string; error?: string }>;
}

/**
 * Landing page after the user clicks the confirmation link in their email.
 * Shows success or a friendly error explanation. The actual state change
 * happened in /api/subscribe/confirm before this page renders.
 */
export default async function ConfirmPage({ searchParams }: PageProps) {
  const params = await searchParams;

  let icon: React.ReactNode;
  let title: string;
  let body: string;

  if (params.error === "missing-token" || params.error === "invalid-token") {
    icon = <AlertCircle className="w-8 h-8 text-eb-red" />;
    title = "Confirmation link not valid";
    body = "This confirmation link is missing or has expired. Try signing up again, or contact us if the issue persists.";
  } else if (params.error === "server") {
    icon = <AlertCircle className="w-8 h-8 text-eb-red" />;
    title = "Something went wrong";
    body = "We hit a snag confirming your subscription. Please try the link again, or sign up fresh.";
  } else if (params.status === "already-active") {
    icon = <Check className="w-8 h-8 text-eb-green" />;
    title = "Already confirmed";
    body = "Your subscription is already active. You'll receive your next daily email tomorrow morning.";
  } else {
    icon = <Check className="w-8 h-8 text-eb-green" />;
    title = "You're in. Welcome to the daily.";
    body = "Your subscription is confirmed. Tomorrow morning, you'll get your first claim + the evidence to debunk it. While you wait — try the research tool to test it on a claim you've seen.";
  }

  const success = !params.error;

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="card p-8 sm:p-10 text-center">
        <div className={`w-16 h-16 rounded-2xl ${success ? "bg-eb-green-faint border-eb-green/20" : "bg-eb-red-faint border-eb-red/20"} border flex items-center justify-center mx-auto mb-5`}>
          {icon}
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-eb-navy mb-3">
          {title}
        </h1>
        <p className="text-eb-muted leading-relaxed mb-8">{body}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/agent"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-eb-gold hover:bg-eb-gold-dark text-white font-semibold text-sm rounded-lg transition-colors"
          >
            Try the research tool
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/facts"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-eb-surface-2 hover:bg-eb-border text-eb-slate text-sm font-medium rounded-lg border border-eb-border transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Browse the database
          </Link>
        </div>
      </div>
    </div>
  );
}
