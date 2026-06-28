"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";

interface Skill { id?: number; category: string; name: string; display_order: number }

const categories = ["Languages", "Frameworks & Libraries", "Frontend", "Databases", "Foundations", "Tools"];

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [newSkill, setNewSkill] = useState<Skill>({ category: categories[0], name: "", display_order: 0 });

  useEffect(() => {
    fetch("/api/admin/skills").then((r) => r.json()).then(setSkills);
  }, []);

  const addSkill = async () => {
    if (!newSkill.name.trim()) return;
    const res = await fetch("/api/admin/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSkill),
    });
    const created = await res.json();
    setSkills([...skills, created]);
    setNewSkill({ category: categories[0], name: "", display_order: 0 });
  };

  const deleteSkill = async (id?: number) => {
    if (!id) return;
    await fetch("/api/admin/skills", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setSkills(skills.filter((s) => s.id !== id));
  };

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Skills</h1>
      <p className="text-gray-500 text-sm mb-8">Manage your technical skills</p>

      {/* Add new */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Add New Skill</h2>
        <div className="flex gap-3">
          <select
            value={newSkill.category}
            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
            className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input
            type="text"
            placeholder="Skill name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={addSkill}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      {/* Grouped list */}
      <div className="space-y-4">
        {Object.entries(grouped).map(([category, catSkills]) => (
          <div key={category} className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {catSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 group"
                >
                  <span className="text-indigo-700 text-sm font-medium">{skill.name}</span>
                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="text-indigo-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
