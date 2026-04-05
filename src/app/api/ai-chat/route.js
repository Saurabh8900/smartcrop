import { generateText, tool } from "ai";
import { groq } from "@ai-sdk/groq";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateCurrentWeather, generatePestRisks } from "@/lib/faker-data";

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

    const tools = {
      getUserProfile: tool({
        description: "Get the logged-in farmer profile details.",
        inputSchema: z.object({}),
        execute: async () => {
          const profile = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
              name: true,
              village: true,
              district: true,
              state: true,
              landHolding: true,
              farmerType: true,
              soilType: true,
              irrigationType: true,
            },
          });

          return profile ?? { message: "Profile not found" };
        },
      }),

      getMarketPrices: tool({
        description:
          "Get latest mandi/market prices for crops. Optionally filter by crop name.",
        inputSchema: z.object({
          cropName: z.string().trim().min(1).optional(),
          limit: z.number().int().min(1).max(20).default(8),
        }),
        execute: async ({ cropName, limit }) => {
          const prices = await prisma.marketPrice.findMany({
            where: cropName
              ? {
                cropName: {
                  contains: cropName,
                },
              }
              : undefined,
            orderBy: { createdAt: "desc" },
            take: limit,
          });

          return prices.map((entry) => {
            const change = entry.modalPrice - entry.prevPrice;
            const changePct = entry.prevPrice
              ? Number(((change / entry.prevPrice) * 100).toFixed(2))
              : 0;

            return {
              cropName: entry.cropName,
              mandi: entry.mandi,
              modalPrice: entry.modalPrice,
              minPrice: entry.minPrice,
              maxPrice: entry.maxPrice,
              msp: entry.msp,
              arrivalQty: entry.arrivalQty,
              change,
              changePct,
              trend: change > 0 ? "up" : change < 0 ? "down" : "stable",
              updatedAt: entry.createdAt,
            };
          });
        },
      }),

      getAlerts: tool({
        description:
          "Get recent user alerts for pests, weather, soil, and advisory notifications.",
        inputSchema: z.object({
          severity: z.enum(["High", "Medium", "Low"]).optional(),
          unreadOnly: z.boolean().default(false),
          limit: z.number().int().min(1).max(20).default(8),
        }),
        execute: async ({ severity, unreadOnly, limit }) => {
          return prisma.alert.findMany({
            where: {
              userId: session.user.id,
              severity,
              ...(unreadOnly ? { isRead: false } : {}),
            },
            orderBy: { createdAt: "desc" },
            take: limit,
            select: {
              type: true,
              severity: true,
              message: true,
              isRead: true,
              createdAt: true,
            },
          });
        },
      }),

      getLatestSoilReadings: tool({
        description: "Get latest soil sensor readings for the logged-in user.",
        inputSchema: z.object({
          limit: z.number().int().min(1).max(20).default(5),
        }),
        execute: async ({ limit }) => {
          return prisma.soilReading.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
            take: limit,
            select: {
              location: true,
              moisture: true,
              temperature: true,
              ph: true,
              nitrogen: true,
              phosphorus: true,
              potassium: true,
              battery: true,
              signal: true,
              trend: true,
              createdAt: true,
            },
          });
        },
      }),

      getMockWeatherSnapshot: tool({
        description:
          "Get a weather snapshot when live weather API is not connected yet.",
        inputSchema: z.object({}),
        execute: async () => {
          return generateCurrentWeather();
        },
      }),

      getMockPestRisks: tool({
        description:
          "Get pest-risk signals when no live pest model is connected yet.",
        inputSchema: z.object({
          limit: z.number().int().min(1).max(8).default(5),
        }),
        execute: async ({ limit }) => {
          return generatePestRisks().slice(0, limit);
        },
      }),
    };

    const result = await generateText({
      model: groq("llama-3.1-8b-instant"),
      system:
        "You are SmartCrop Advisor. Use tools whenever the user asks for profile, alerts, soil, weather, pest, or market data. If a suitable tool is not available, clearly say data is unavailable and provide best-practice guidance from domain knowledge. Keep answers practical and concise. Reply in the same language as the user.",
      prompt: message,
      tools,
      maxSteps: 4,
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
