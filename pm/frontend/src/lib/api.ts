import { type BoardData } from "./kanban";

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
