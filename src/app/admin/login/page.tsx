import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import "../admin.css";

export const metadata: Metadata = { title: "Sign in — Supreme One Software Admin", robots: { index: false } };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="wordmark" style={{ marginBottom: 6 }}>
          Supreme One Software<b>.</b>
        </div>
        <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>Admin panel — sign in to continue.</p>
        <LoginForm from={from ?? "/admin"} />
      </div>
    </div>
  );
}
