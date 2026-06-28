"use client";
import { useEffect, useState } from "react";
import { Save, CheckCircle, Loader2 } from "lucide-react";

interface Edu { id?: number; degree: string; institution: string; location: string; start_year: string; end_year: string }

export default function EducationAdmin() {
  const [items, setItems] = useState<Edu[]>([]);
  const [saving, setSaving] = useState<number | null>(null);
  const [saved, setSaved] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/education").then((r) => r.json()).then(setItems);
  }, []);

  const update = async (item: Edu) => {
    if (!item.id) return;
    setSaving(item.id);
    const res = await fetch("/api/admin/education", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const updated = await res.json();
    setItems(items.map((i) => (i.id === updated.id ? updated : i)));
    setSaving(null);
    setSaved(item.id);
    setTimeout(() => setSaved(null), 2000);
  };

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Education</h1>
      <p className="text-gray-500 text-sm mb-8">Update your education details</p>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              {[
                { k: "degree", label: "Degree" },
                { k: "institution", label: "Institution" },
                { k: "location", label: "Location" },
                { k: "start_year", label: "Start Year" },
                { k: "end_year", label: "End Year" },
              ].map(({ k, label }) => (
                <div key={k}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input
                    type="text"
                    value={(item as never)[k] as string}
                    onChange={(e) => setItems(items.map((i) => i.id === item.id ? { ...i, [k]: e.target.value } : i))}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => update(item)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
            >
              {saved === item.id ? <CheckCircle size={16} /> : saving === item.id ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saved === item.id ? "Saved!" : "Save"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
