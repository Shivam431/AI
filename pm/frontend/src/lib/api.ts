import { type BoardData } from "./kanban";

export type AiChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AiChatResult = {
  status: string;
  message: string;
  boardUpdate?: BoardData;
  error?: string;
};

export const fetchBoard = async (username = "user"): Promise<BoardData> => {
  const res = await fetch("/api/board", {
    headers: {
      "x-user": username,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to load board: ${res.statusText}`);
  }

  return res.json();
};

export const saveBoard = async (
  board: BoardData,
  username = "user"
): Promise<{ status: string; board: BoardData }> => {
  const res = await fetch("/api/board", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-user": username,
    },
    body: JSON.stringify(board),
  });

  if (!res.ok) {
    throw new Error(`Failed to save board: ${res.statusText}`);
  }

  return res.json();
};

export const sendAiChatMessage = async (
  prompt: string,
  chatHistory: AiChatMessage[] = [],
  username = "user"
): Promise<AiChatResult> => {
  const res = await fetch("/api/ai/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user": username,
    },
    body: JSON.stringify({
      prompt,
      chatHistory,
    }),
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.error || `AI request failed: ${res.statusText}`);
  }

  return res.json();
};
