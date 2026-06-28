import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const skills = await prisma.skill.findMany({ orderBy: [{ category: "asc" }, { display_order: "asc" }] });
  return NextResponse.json(skills);
}

export async function POST(request: Request) {
  const body = await request.json();
  const skill = await prisma.skill.create({ data: body });
  return NextResponse.json(skill);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...data } = body;
  const skill = await prisma.skill.update({ where: { id }, data });
  return NextResponse.json(skill);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.skill.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
