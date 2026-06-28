import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { seedDatabase } from "@/lib/seed";

export async function GET() {
  try {
    await seedDatabase();

    const [profile, skills, experience, projects, education, certifications, leadership, publications] =
      await Promise.all([
        prisma.profile.findFirst(),
        prisma.skill.findMany({ orderBy: [{ category: "asc" }, { display_order: "asc" }] }),
        prisma.experience.findMany({ orderBy: { display_order: "asc" } }),
        prisma.project.findMany({ orderBy: { display_order: "asc" } }),
        prisma.education.findMany(),
        prisma.certification.findMany({ orderBy: { display_order: "asc" } }),
        prisma.leadership.findMany({ orderBy: { display_order: "asc" } }),
        prisma.publication.findMany(),
      ]);

    const experienceWithBullets = experience.map((e) => ({
      ...e,
      bullets: JSON.parse(e.bullets || "[]"),
    }));

    return NextResponse.json({
      profile,
      skills,
      experience: experienceWithBullets,
      projects,
      education,
      certifications,
      leadership,
      publications,
    });
  } catch (error) {
    console.error("Portfolio API error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 });
  }
}
