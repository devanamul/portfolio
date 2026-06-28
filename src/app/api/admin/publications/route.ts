import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const items = await prisma.publication.findMany();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const item = await prisma.publication.create({ data: body });
  return NextResponse.json(item);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...data } = body;
  const item = await prisma.publication.update({ where: { id }, data });
  return NextResponse.json(item);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.publication.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
