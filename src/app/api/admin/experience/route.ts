import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const items = await prisma.experience.findMany({ orderBy: { display_order: "asc" } });
  return NextResponse.json(items.map((e) => ({ ...e, bullets: JSON.parse(e.bullets || "[]") })));
}

export async function POST(request: Request) {
  const body = await request.json();
  const { bullets, ...rest } = body;
  const item = await prisma.experience.create({
    data: { ...rest, bullets: JSON.stringify(bullets || []) },
  });
  return NextResponse.json({ ...item, bullets: JSON.parse(item.bullets || "[]") });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, bullets, ...rest } = body;
  const item = await prisma.experience.update({
    where: { id },
    data: { ...rest, bullets: JSON.stringify(bullets || []) },
  });
  return NextResponse.json({ ...item, bullets: JSON.parse(item.bullets || "[]") });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.experience.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
