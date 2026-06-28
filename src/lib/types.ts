export interface Profile {
  id: number;
  name: string;
  title: string;
  summary: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  photo_url: string;
  cv_url: string;
  titles: string;
}

export interface Skill {
  id: number;
  category: string;
  name: string;
  display_order: number;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  company_url: string;
  location: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  tech: string;
  bullets: string[];
  display_order: number;
}

export interface Project {
  id: number;
  name: string;
  tech: string;
  live_url: string;
  github_url: string;
  description: string;
  display_order: number;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  start_year: string;
  end_year: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  year: string;
  url: string;
  display_order: number;
}

export interface Leadership {
  id: number;
  role: string;
  organization: string;
  display_order: number;
}

export interface Publication {
  id: number;
  title: string;
  url: string;
}

export interface PortfolioData {
  profile: Profile | null;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  leadership: Leadership[];
  publications: Publication[];
}
