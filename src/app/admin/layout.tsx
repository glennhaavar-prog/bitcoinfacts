"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Inbox,
  Database,
  PlusCircle,
  LogOut,
  Loader2,
  Zap,
} from "lucide-react";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox },
  { href: "/admin/fakta", label: "Fakta", icon: Database },
  { href: "/admin/quick-add", label: "Quick Add", icon: PlusCircle },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSent, setLoginSent] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // Verify user is admin
        const { data: admin } = await supabase
          .from("admins")
          .select("id")
          .eq("auth_user_id", session.user.id)
          .single();

        if (admin) {
          setAuthenticated(true);
          setEmail(session.user.email || "");
        }
      }
      setLoading(false);
    }

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        const { data: admin } = await supabase
          .from("admins")
          .select("id")
          .eq("auth_user_id", session.user.id)
          .single();

        if (admin) {
          setAuthenticated(true);
          setEmail(session.user.email || "");
        }
      } else if (event === "SIGNED_OUT") {
        setAuthenticated(false);
        setEmail("");
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");

    const { error } = await supabase.auth.signInWithOtp({
      email: loginEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    if (error) {
      setLoginError(error.message);
    } else {
      setLoginSent(true);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-bitcoin animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card p-8 max-w-md w-full">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <div className="w-8 h-8 rounded-lg bg-bitcoin flex items-center justify-center">
              <Zap className="w-5 h-5 text-dark-950" />
            </div>
            <span className="font-bold text-lg text-white">Admin</span>
          </div>

          {loginSent ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-2">
                Sjekk e-posten din
              </h2>
              <p className="text-dark-300 text-sm">
                Vi har sendt en innloggingslenke til{" "}
                <strong className="text-white">{loginEmail}</strong>
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-white mb-2 text-center">
                Logg inn
              </h2>
              <p className="text-dark-400 text-sm text-center mb-6">
                Magic link — ingen passord.
              </p>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="din@epost.no"
                  required
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-bitcoin"
                />
                {loginError && (
                  <p className="text-red-400 text-sm">{loginError}</p>
                )}
                <button
                  type="submit"
                  className="w-full py-3 bg-bitcoin hover:bg-bitcoin-dark text-dark-950 font-semibold rounded-lg transition-colors"
                >
                  Send innloggingslenke
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-900 border-r border-dark-800 flex flex-col fixed top-16 bottom-0">
        <nav className="flex-1 p-4 space-y-1">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                pathname === item.href
                  ? "bg-bitcoin/10 text-bitcoin font-medium"
                  : "text-dark-300 hover:text-white hover:bg-dark-800"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-dark-800">
          <p className="text-xs text-dark-500 mb-2 truncate">{email}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-dark-400 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logg ut
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 ml-64 p-6 sm:p-8">{children}</div>
    </div>
  );
}
