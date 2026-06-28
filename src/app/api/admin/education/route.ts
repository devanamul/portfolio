import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const items = await prisma.education.findMany();
  return NextResponse.json(items);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...data } = body;
  const item = await prisma.education.update({ where: { id }, data });
  return NextResponse.json(item);
}
