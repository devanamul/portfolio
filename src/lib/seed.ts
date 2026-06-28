import prisma from "./prisma";
import { hashPassword } from "./auth";

export async function seedDatabase() {
  // Check if already seeded
  const profileCount = await prisma.profile.count();
  if (profileCount > 0) return;

  // Seed Profile
  await prisma.profile.create({
    data: {
      name: "Anamul Hasan",
      title: "Full-Stack Software Engineer",
      summary:
        "Full-stack software engineer with 2+ years building and maintaining production ERP, POS, and management systems across the PHP and JavaScript ecosystems — Laravel, Vue, React, and Next.js. Experienced owning projects end to end, from API design through deployment, and currently leading an ICT division. Focused on shipping reliable, scalable software in fast-moving teams.",
      phone: "+880 1906 145922",
      email: "ahfahad118@gmail.com",
      linkedin: "https://linkedin.com/in/devahasan",
      github: "https://github.com/devanamul",
      location: "Dhaka, Bangladesh",
      photo_url: "/uploads/default-avatar.png",
      cv_url: "",
      titles: JSON.stringify(["Full-Stack Software Engineer", "Laravel Expert", "React Developer", "Next.js Engineer"]),
    },
  });

  // Seed Skills
  const skillsData = [
    { category: "Languages", name: "PHP", display_order: 1 },
    { category: "Languages", name: "JavaScript", display_order: 2 },
    { category: "Languages", name: "Java", display_order: 3 },
    { category: "Languages", name: "Python", display_order: 4 },
    { category: "Languages", name: "C#", display_order: 5 },
    { category: "Frameworks & Libraries", name: "Laravel", display_order: 1 },
    { category: "Frameworks & Libraries", name: "Yii", display_order: 2 },
    { category: "Frameworks & Libraries", name: "Inertia.js", display_order: 3 },
    { category: "Frameworks & Libraries", name: "Vue.js", display_order: 4 },
    { category: "Frameworks & Libraries", name: "React", display_order: 5 },
    { category: "Frameworks & Libraries", name: "Next.js", display_order: 6 },
    { category: "Frameworks & Libraries", name: "Nuxt", display_order: 7 },
    { category: "Frameworks & Libraries", name: "Django", display_order: 8 },
    { category: "Frontend", name: "HTML", display_order: 1 },
    { category: "Frontend", name: "CSS", display_order: 2 },
    { category: "Databases", name: "MySQL", display_order: 1 },
    { category: "Databases", name: "SQLite", display_order: 2 },
    { category: "Foundations", name: "OOP", display_order: 1 },
    { category: "Foundations", name: "Data Structures & Algorithms", display_order: 2 },
    { category: "Foundations", name: "DBMS", display_order: 3 },
    { category: "Tools", name: "Git (GitHub/GitLab)", display_order: 1 },
    { category: "Tools", name: "VS Code", display_order: 2 },
    { category: "Tools", name: "PhpStorm / WebStorm", display_order: 3 },
    { category: "Tools", name: "Figma", display_order: 4 },
    { category: "Tools", name: "Jira", display_order: 5 },
    { category: "Tools", name: "ClickUp", display_order: 6 },
  ];
  await prisma.skill.createMany({ data: skillsData });

  // Seed Experience
  await prisma.experience.createMany({
    data: [
      {
        title: "Manager, ICT Division (Software Engineer)",
        company: "Padakhep Manabik Unnayan Kendra",
        company_url: "",
        location: "Dhaka, Bangladesh",
        start_date: "Nov 2025",
        end_date: "",
        is_current: true,
        tech: "Laravel, Next.js",
        bullets: JSON.stringify([
          "Lead the ICT division, owning the planning, development, and delivery of the organization's internal software projects.",
          "Built and deployed the organization's new public website (Next.js), managing the project from requirements through launch.",
          "Designed and developed a Visitor Management System to digitize and track on-site visitor records.",
        ]),
        display_order: 1,
      },
      {
        title: "Software Engineer",
        company: "Multibrand Infotech Ltd.",
        company_url: "",
        location: "Dhaka, Bangladesh",
        start_date: "Nov 2024",
        end_date: "Oct 2025",
        is_current: false,
        tech: "Laravel, Yii, React",
        bullets: JSON.stringify([
          "Developed and maintained multiple enterprise ERP systems, delivering HRMS, accounting, and inventory modules used across client operations.",
          "Built core features for a Vehicle Management System to improve logistics and maintenance tracking.",
          "Contributed to a Land Port Management System, implementing goods tracking, customs clearance, and gate-pass workflows.",
        ]),
        display_order: 2,
      },
      {
        title: "Associate Software Engineer",
        company: "Softzino Technologies",
        company_url: "",
        location: "Dhaka, Bangladesh",
        start_date: "Apr 2024",
        end_date: "Oct 2024",
        is_current: false,
        tech: "Laravel, Inertia.js, Vue.js",
        bullets: JSON.stringify([
          "Developed and maintained a Diagnostic Management System (DMS) handling patient records, diagnostics, and reporting.",
          "Contributed to an Inventory & POS system for retail clients and to AutoCash, an automated accounting system for small and medium businesses.",
          "Created and documented a reusable Vue 3 UI Kit component library, improving frontend consistency across projects.",
        ]),
        display_order: 3,
      },
      {
        title: "Trainee Associate Software Engineer",
        company: "Softzino Technologies",
        company_url: "",
        location: "Dhaka, Bangladesh",
        start_date: "Dec 2023",
        end_date: "Mar 2024",
        is_current: false,
        tech: "Laravel, Next.js",
        bullets: JSON.stringify([
          "Built admin-panel features for an Inventory & POS system using Laravel and Next.js.",
          "Gained hands-on full-stack experience, including real-time features, in a production-grade system.",
        ]),
        display_order: 4,
      },
    ],
  });

  // Seed Projects
  await prisma.project.createMany({
    data: [
      {
        name: "E-Commerce Website",
        tech: "Nuxt",
        live_url: "https://ecom.luminozbd.com",
        github_url: "",
        description: "A full-featured e-commerce platform built with Nuxt.js.",
        display_order: 1,
      },
      {
        name: "CAMDAIS – Automated Mathematical Deficiency & Anxiety Identification System",
        tech: "Django",
        live_url: "",
        github_url: "https://github.com/devanamul/CAMDAIS",
        description:
          "An automated system for identifying mathematical deficiency and anxiety in students.",
        display_order: 2,
      },
      {
        name: "Easy Agro – Agricultural Consultant Software for Farmers",
        tech: "Django",
        live_url: "",
        github_url: "https://github.com/devanamul/Easy_Agro",
        description: "Agricultural consultant software designed to assist farmers.",
        display_order: 3,
      },
      {
        name: "Service Booking System",
        tech: "Laravel",
        live_url: "",
        github_url: "https://github.com/devanamul/service-booking",
        description: "A service booking and management platform.",
        display_order: 4,
      },
      {
        name: "KhatiFood – Homemade Food Delivery System",
        tech: "PHP",
        live_url: "",
        github_url: "https://github.com/devanamul/KhatiFood",
        description: "A homemade food delivery platform connecting home cooks with customers.",
        display_order: 5,
      },
      {
        name: "IELTS Product Page",
        tech: "Next.js",
        live_url: "",
        github_url: "https://github.com/devanamul/ielts-product-page",
        description: "A product landing page for an IELTS preparation service.",
        display_order: 6,
      },
      {
        name: "Image Gallery",
        tech: "React",
        live_url: "",
        github_url: "https://github.com/devanamul/image-gallery",
        description: "An interactive image gallery built with React.",
        display_order: 7,
      },
      {
        name: "E-Bank Management",
        tech: "JavaFX",
        live_url: "",
        github_url: "https://github.com/devanamul/Bank-Management",
        description: "A bank management system with full CRUD operations built with JavaFX.",
        display_order: 8,
      },
    ],
  });

  // Seed Education
  await prisma.education.create({
    data: {
      degree: "BSc in Computer Science & Engineering",
      institution: "United International University",
      location: "Dhaka, Bangladesh",
      start_year: "",
      end_year: "",
    },
  });

  // Seed Certifications
  await prisma.certification.createMany({
    data: [
      { name: "Introduction to Software Engineering", issuer: "IBM", year: "2024", display_order: 1 },
      { name: "Introduction to Cloud Computing", issuer: "IBM", year: "2024", display_order: 2 },
      {
        name: "CareerX 21 Program",
        issuer: "Bangladesh Youth Leadership Center",
        year: "2022",
        display_order: 3,
      },
    ],
  });

  // Seed Leadership
  await prisma.leadership.createMany({
    data: [
      { role: "Joint General Secretary", organization: "UIU Theatre & Film Club", display_order: 1 },
      { role: "Former Music Director", organization: "Ujjibon Shilpigosthi", display_order: 2 },
    ],
  });

  // Seed Publications
  await prisma.publication.create({
    data: { title: "IoT-Based Smart Agriculture Management System", url: "" },
  });

  // Seed Admin User
  const passwordHash = await hashPassword("admin123");
  await prisma.adminUser.create({
    data: { username: "admin", password_hash: passwordHash },
  });
}
