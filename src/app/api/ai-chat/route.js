import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const result = await generateText({
      model: groq("llama-3.1-8b-instant"),
      system: `You are SmartCrop Advisor, an AI assistant helping farmers with crop advisory, pest management, weather insights, soil monitoring, and market information. You provide practical, localized advice in clear language suitable for farmers. Answer in the same language the user asks.`,
      prompt: message,
      maxTokens: 1024,
    });

    return NextResponse.json({
      message: result.text,
      usage: {
        inputTokens: result.usage?.inputTokens ?? 0,
        outputTokens: result.usage?.outputTokens ?? 0,
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate response" },
      { status: 500 }
    );
  }
}
