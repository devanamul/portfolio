import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const profile = await prisma.profile.findFirst();
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...rest } = body;

    // Only pass fields that exist in the schema
    const data: Record<string, string> = {};
    const allowed = ["name", "title", "summary", "phone", "email", "linkedin", "github", "location", "photo_url", "cv_url", "titles"];
    for (const key of allowed) {
      if (key in rest) data[key] = rest[key];
    }

    // Ensure profile row exists before updating
    const existing = await prisma.profile.findFirst();
    if (!existing) {
      return NextResponse.json({ error: "No profile found" }, { status: 404 });
    }

    const profile = await prisma.profile.update({ where: { id: existing.id }, data });
    return NextResponse.json(profile);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Profile update error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
