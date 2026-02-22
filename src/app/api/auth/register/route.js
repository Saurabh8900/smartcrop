import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// POST /api/auth/register
export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, password, phone, village, district, state, soilType, irrigationType, landHolding, farmerType } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: "Email already registered" }, { status: 409 });
        }

        const hashed = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashed,
                phone: phone || null,
                village: village || null,
                district: district || null,
                state: state || null,
                soilType: soilType || null,
                irrigationType: irrigationType || null,
                landHolding: landHolding || null,
                farmerType: farmerType || "Small Farmer",
            },
            select: { id: true, name: true, email: true },
        });

        return NextResponse.json({ success: true, user }, { status: 201 });
    } catch (error) {
        console.error("Register error:", error);
        return NextResponse.json({ error: "Registration failed" }, { status: 500 });
    }
}
