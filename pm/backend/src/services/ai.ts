import dotenv from "dotenv";
import path from "node:path";
import { type BoardData } from "../db.js";

// Load .env from project root or backend
dotenv.config({ path: path.resolve(process.cwd(), "..", ".env") });
dotenv.config();

export interface AiChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AiChatResponse {
  message: string;
  boardUpdate?: BoardData;
}

// Configurable model: supports OPENROUTER_MODEL env var or defaults to configured nemotron model
export const DEFAULT_AI_MODEL =
  process.env.OPENROUTER_MODEL || "nemotron-3-ultra-550b-a55b";
export const FALLBACK_AI_MODEL = "nvidia/nemotron-3.5-lightning:free";

export const callOpenRouter = async (
  messages: AiChatMessage[],
  model = DEFAULT_AI_MODEL
): Promise<string> => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set in environment or .env file.");
  }

  // Attempt primary model first, fallback to free nemotron model if 403 (unfunded free tier key)
  const attemptCall = async (modelToUse: string) => {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Kanban Studio",
      },
      body: JSON.stringify({
        model: modelToUse,
        messages,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return { ok: false as const, status: res.status, errorText, modelToUse };
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content || "";
    return { ok: true as const, content };
  };

  const primaryResult = await attemptCall(model);
  if (primaryResult.ok) {
    return primaryResult.content;
  }

  // If primary model failed due to key budget/limit or 403/404, fallback to active free nemotron model
  if (primaryResult.status === 403 || primaryResult.status === 404) {
    console.warn(
      `Primary model '${model}' failed with status ${primaryResult.status}. Falling back to '${FALLBACK_AI_MODEL}'.`
    );
    const fallbackResult = await attemptCall(FALLBACK_AI_MODEL);
    if (fallbackResult.ok) {
      return fallbackResult.content;
    }
    throw new Error(
      `OpenRouter API error (${fallbackResult.status}): ${fallbackResult.errorText}`
    );
  }

  throw new Error(
    `OpenRouter API error (${primaryResult.status}): ${primaryResult.errorText}`
  );
};

export const generateKanbanAiResponse = async (
  userPrompt: string,
  currentBoard: BoardData,
  chatHistory: AiChatMessage[] = []
): Promise<AiChatResponse> => {
  const systemPrompt = `You are an expert agile project manager AI assistant integrated into a single-board Kanban web app named "Kanban Studio".
The Kanban board consists of columns and cards.
Current Board JSON:
${JSON.stringify(currentBoard, null, 2)}

You can converse with the user and help manage their project.
If the user asks to add, rename, move, delete, or organize cards or columns, you MUST provide an updated board state in your response.
If the user is just asking a question or general advice, return only your conversational message without modifying the board.

CRITICAL: You MUST respond in STRICT valid JSON format and nothing else. No markdown wrappers around the JSON if possible, or inside a clean \`\`\`json block.
The JSON must follow this exact schema:
{
  "message": "Your conversational answer or explanation of changes made.",
  "boardUpdate": null or <updated BoardData object matching the exact structure of Current Board JSON>
}`;

  const messages: AiChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...chatHistory.filter((m) => m.role === "user" || m.role === "assistant"),
    { role: "user", content: userPrompt },
  ];

  const rawOutput = await callOpenRouter(messages);

  // Extract JSON payload
  let jsonStr = rawOutput.trim();
  const jsonMatch = rawOutput.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  try {
    const parsed = JSON.parse(jsonStr) as AiChatResponse;
    return {
      message: parsed.message || "I processed your request.",
      boardUpdate: parsed.boardUpdate || undefined,
    };
  } catch {
    // If model returned plain text instead of JSON
    return {
      message: rawOutput,
    };
  }
};
