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
  MessageSquare,
} from "lucide-react";

type AdminRole = "admin" | "moderator" | "trainer";

const allNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "moderator"] as AdminRole[] },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox, roles: ["admin", "moderator"] as AdminRole[] },
  { href: "/admin/fakta", label: "Fakta", icon: Database, roles: ["admin", "moderator", "trainer"] as AdminRole[] },
  { href: "/admin/quick-add", label: "Quick Add", icon: PlusCircle, roles: ["admin"] as AdminRole[] },
  { href: "/admin/examples", label: "Examples", icon: MessageSquare, roles: ["admin", "trainer"] as AdminRole[] },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState<AdminRole>("admin");
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
        // Try by auth_user_id first
        let { data: admin } = await supabase
          .from("admins")
          .select("id, role, auth_user_id")
          .eq("auth_user_id", session.user.id)
          .single();

        // Fallback: match by email and auto-link auth_user_id
        if (!admin && session.user.email) {
          const { data: byEmail } = await supabase
            .from("admins")
            .select("id, role, auth_user_id")
            .eq("email", session.user.email)
            .single();

          if (byEmail && !byEmail.auth_user_id) {
            await supabase
              .from("admins")
              .update({ auth_user_id: session.user.id })
              .eq("id", byEmail.id);
            admin = { ...byEmail, auth_user_id: session.user.id };
          } else if (byEmail) {
            admin = byEmail;
          }
        }

        if (admin) {
          setAuthenticated(true);
          setRole(admin.role as AdminRole);
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
        let { data: admin } = await supabase
          .from("admins")
          .select("id, role, auth_user_id")
          .eq("auth_user_id", session.user.id)
          .single();

        if (!admin && session.user.email) {
          const { data: byEmail } = await supabase
            .from("admins")
            .select("id, role, auth_user_id")
            .eq("email", session.user.email)
            .single();

          if (byEmail && !byEmail.auth_user_id) {
            await supabase
              .from("admins")
              .update({ auth_user_id: session.user.id })
              .eq("id", byEmail.id);
            admin = { ...byEmail, auth_user_id: session.user.id };
          } else if (byEmail) {
            admin = byEmail;
          }
        }

        if (admin) {
          setAuthenticated(true);
          setRole(admin.role as AdminRole);
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
                Check your email
              </h2>
              <p className="text-dark-300 text-sm">
                We sent a login link to{" "}
                <strong className="text-white">{loginEmail}</strong>
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-white mb-2 text-center">
                Log in
              </h2>
              <p className="text-dark-400 text-sm text-center mb-6">
                Magic link — no password needed.
              </p>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="your@email.com"
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
                  Send login link
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
          {allNavItems.filter((item) => item.roles.includes(role)).map((item) => (
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
            Log out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 ml-64 p-6 sm:p-8">{children}</div>
    </div>
  );
}
