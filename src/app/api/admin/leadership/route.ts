import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const items = await prisma.leadership.findMany({ orderBy: { display_order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const item = await prisma.leadership.create({ data: body });
  return NextResponse.json(item);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...data } = body;
  const item = await prisma.leadership.update({ where: { id }, data });
  return NextResponse.json(item);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.leadership.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
