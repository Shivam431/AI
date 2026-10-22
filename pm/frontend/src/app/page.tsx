"use client";

import { useAuth } from "@/lib/auth";
import { SignIn } from "@/components/SignIn";
import { KanbanBoard } from "@/components/KanbanBoard";

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--primary-blue)] border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <SignIn />;
  }

  return <KanbanBoard />;
}
