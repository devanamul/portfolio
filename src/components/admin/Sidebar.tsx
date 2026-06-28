"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User, Code2, Briefcase, FolderGit2, GraduationCap, Award,
  Users, BookOpen, MessageSquare, LogOut, LayoutDashboard
} from "lucide-react";

const navItems = [
  { href: "/admin/profile", icon: User, label: "Profile" },
  { href: "/admin/skills", icon: Code2, label: "Skills" },
  { href: "/admin/experience", icon: Briefcase, label: "Experience" },
  { href: "/admin/projects", icon: FolderGit2, label: "Projects" },
  { href: "/admin/education", icon: GraduationCap, label: "Education" },
  { href: "/admin/certifications", icon: Award, label: "Certifications" },
  { href: "/admin/leadership", icon: Users, label: "Leadership" },
  { href: "/admin/publications", icon: BookOpen, label: "Publications" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <LayoutDashboard size={16} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">Portfolio CMS</p>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon size={18} className={active ? "text-indigo-600" : "text-gray-400"} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 mb-1"
        >
          View Portfolio →
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
