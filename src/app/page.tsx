export const dynamic = "force-dynamic";

import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import ExperienceSection from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import EducationSection from "@/components/portfolio/Education";
import Certifications from "@/components/portfolio/Certifications";
import LeadershipSection from "@/components/portfolio/Leadership";
import Publications from "@/components/portfolio/Publications";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import type { PortfolioData } from "@/lib/types";

async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const { seedDatabase } = await import("@/lib/seed");
    await seedDatabase();

    const prisma = (await import("@/lib/prisma")).default;

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

    return {
      profile,
      skills,
      experience: experience.map((e) => ({ ...e, bullets: JSON.parse(e.bullets || "[]") })),
      projects,
      education,
      certifications,
      leadership,
      publications,
    };
  } catch (error) {
    console.error("Failed to load portfolio data:", error);
    return {
      profile: null,
      skills: [],
      experience: [],
      projects: [],
      education: [],
      certifications: [],
      leadership: [],
      publications: [],
    };
  }
}

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <main style={{ backgroundColor: "#080b14" }}>
      <Navbar />
      <Hero profile={data.profile} />
      <About profile={data.profile} />
      <Skills skills={data.skills} />
      <ExperienceSection experience={data.experience} />
      <Projects projects={data.projects} />
      <EducationSection education={data.education} />
      <Certifications certifications={data.certifications} />
      <LeadershipSection leadership={data.leadership} />
      <Publications publications={data.publications} />
      <Contact profile={data.profile} />
      <Footer profile={data.profile} />
    </main>
  );
}
