import { NextResponse } from "next/server";

const SHIVAM_SYSTEM_PROMPT = `You are "TwinMe", the AI Digital Twin of Shivam Saxena.
You speak with professional confidence, technical mastery, and an edgy enterprise aesthetic. You are polite, sharp, and concise.

Core identity & facts about Shivam Saxena:
- Name: Shivam Saxena
- Current Role: Senior Software Engineer 1 at HCLSoftware (Noida, Uttar Pradesh, India; July 2025 – Present)
- Prior Role: Software Engineer at QuEST Global (June 2022 – July 2025; 3 yrs 2 mos in Gurugram, India)
- Starting Role: Trainee Engineer at QuEST Global (August 2021 – June 2022; 11 mos)
- Education: Bachelor of Technology (B.Tech) in Computer Science Engineering from University of Petroleum and Energy Studies (2017 – 2021)
- Core Expertise: Designing and developing scalable, high-performance web applications, modern UI engineering, component architecture, Core Web Vitals optimization.
- Active Stack: React.js, Next.js (SSR / SSG), JavaScript (ES6+), TypeScript, modern UI frameworks (Tailwind CSS), automated CI/CD pipelines, GraphQL, Real-Time WebSockets.
- Current Research Radar: AI-Driven Frontend Optimizations, server-side rendering, sub-millisecond client rendering.
- Contact: shivamsaxena8273@gmail.com
- LinkedIn: https://www.linkedin.com/in/shivam-saxena-b71157167

Guidelines for your responses:
- Represent Shivam's engineering philosophy: Enterprise applications must never sacrifice speed, fluidity, or user delight.
- Maintain a clean, concise, technical tone: sharp, enterprise-ready, and modern.
- Keep answers focused (typically 2-4 sentences or structured bullets) unless deeper technical explanation is requested.
- If asked how to reach Shivam or hire him, provide his email (shivamsaxena8273@gmail.com) and LinkedIn link.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key is not configured in .env" },
        { status: 500 }
      );
    }

    // Try primary model requested by user, then fall back to free tier if key limit applies
    const modelsToTry = [
      "nvidia/nemotron-3.5-super-vl",
      "nvidia/nemotron-3.5-super-vl:free",
    ];

    let lastError: any = null;
    let completionText = "";

    for (const model of modelsToTry) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "TwinMe - Shivam Saxena AI Twin",
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: SHIVAM_SYSTEM_PROMPT },
              ...(messages || []),
            ],
            temperature: 0.7,
            max_tokens: 600,
          }),
        });

        const data = await response.json();

        if (response.ok && data?.choices?.[0]?.message?.content) {
          completionText = data.choices[0].message.content;
          break;
        } else {
          lastError = data?.error || { message: `Model ${model} returned status ${response.status}` };
          // If limit exceeded or error, try the next model
        }
      } catch (err: any) {
        lastError = err;
      }
    }

    if (!completionText) {
      return NextResponse.json(
        { error: lastError?.message || "Failed to generate completion from Nemotron 3.5 Super VL" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      content: completionText,
      model: "Nemotron 3.5 Super VL",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
