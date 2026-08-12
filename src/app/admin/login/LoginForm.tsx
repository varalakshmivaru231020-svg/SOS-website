"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/actions/auth";

export default function LoginForm({ from }: { from: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="admin-form">
      <input type="hidden" name="from" value={from} />
      <label>
        Email
        <input name="email" type="email" autoComplete="username" required autoFocus />
      </label>
      <label>
        Password
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {state.error && (
        <p role="alert" style={{ color: "#a33", fontSize: 13.5 }}>
          {state.error}
        </p>
      )}
      <button type="submit" className="btn-admin" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
