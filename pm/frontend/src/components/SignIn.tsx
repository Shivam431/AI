"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";

export const SignIn = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const success = login(username, password);
    if (!success) {
      setError("Invalid credentials. Use username 'user' and password 'password'.");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      {/* Background ambient lighting matching project palette */}
      <div className="pointer-events-none absolute left-0 top-0 h-[450px] w-[450px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,_rgba(32,157,215,0.22)_0%,_rgba(32,157,215,0.05)_55%,_transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(circle,_rgba(117,57,145,0.18)_0%,_rgba(117,57,145,0.05)_55%,_transparent_75%)]" />

      <div className="relative w-full max-w-md rounded-[32px] border border-[var(--stroke)] bg-white/90 p-8 shadow-[var(--shadow)] backdrop-blur sm:p-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--stroke)] bg-[var(--surface)] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gray-text)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-yellow)]" />
            Sign In
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold text-[var(--navy-dark)]">
            Kanban Studio
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--gray-text)]">
            Sign in to access your single-board project workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div
              role="alert"
              data-testid="auth-error"
              className="rounded-2xl border border-red-200 bg-red-50/80 p-3.5 text-xs font-medium text-red-700"
            >
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-xs font-semibold uppercase tracking-wider text-[var(--gray-text)]"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="user"
              className="mt-2 w-full rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--navy-dark)] outline-none transition focus:border-[var(--primary-blue)] focus:bg-white focus:ring-2 focus:ring-[var(--primary-blue)]/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-[var(--gray-text)]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="mt-2 w-full rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--navy-dark)] outline-none transition focus:border-[var(--primary-blue)] focus:bg-white focus:ring-2 focus:ring-[var(--primary-blue)]/20"
            />
          </div>

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center rounded-2xl bg-[var(--secondary-purple)] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95 active:scale-[0.99]"
          >
            Sign In
          </button>

          <p className="mt-1 text-center text-xs text-[var(--gray-text)]">
            Hint: Use username <span className="font-semibold text-[var(--navy-dark)]">user</span> and password{" "}
            <span className="font-semibold text-[var(--navy-dark)]">password</span>
          </p>
        </form>
      </div>
    </div>
  );
};
