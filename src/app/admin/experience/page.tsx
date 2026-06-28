"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Save, X, ChevronDown, ChevronUp } from "lucide-react";

interface Exp {
  id?: number; title: string; company: string; company_url: string; location: string;
  start_date: string; end_date: string; is_current: boolean; tech: string;
  bullets: string[]; display_order: number;
}

const empty: Exp = {
  title: "", company: "", company_url: "", location: "", start_date: "", end_date: "",
  is_current: false, tech: "", bullets: [""], display_order: 0,
};

export default function ExperienceAdmin() {
  const [items, setItems] = useState<Exp[]>([]);
  const [editing, setEditing] = useState<Exp | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetch("/api/admin/experience").then((r) => r.json()).then(setItems);
  }, []);

  const save = async (item: Exp) => {
    const method = item.id ? "PUT" : "POST";
    const res = await fetch("/api/admin/experience", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, bullets: item.bullets.filter((b) => b.trim()) }),
    });
    const saved = await res.json();
    if (item.id) {
      setItems(items.map((i) => (i.id === saved.id ? saved : i)));
    } else {
      setItems([...items, saved]);
    }
    setEditing(null);
    setAdding(false);
  };

  const remove = async (id?: number) => {
    if (!id || !confirm("Delete this experience?")) return;
    await fetch("/api/admin/experience", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems(items.filter((i) => i.id !== id));
  };

  const Form = ({ item, onSave, onCancel }: { item: Exp; onSave: (i: Exp) => void; onCancel: () => void }) => {
    const [form, setForm] = useState(item);
    return (
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { k: "title", label: "Job Title" }, { k: "company", label: "Company" },
            { k: "company_url", label: "Company URL" }, { k: "location", label: "Location" },
            { k: "start_date", label: "Start Date (e.g. Nov 2024)" }, { k: "end_date", label: "End Date" },
            { k: "tech", label: "Tech Stack (comma separated)" },
          ].map(({ k, label }) => (
            <div key={k}>
              <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
              <input
                type="text"
                value={(form as never)[k] as string}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.is_current}
            onChange={(e) => setForm({ ...form, is_current: e.target.checked })}
            className="rounded"
          />
          Currently working here
        </label>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">Bullet Points</label>
          <div className="space-y-2">
            {form.bullets.map((bullet, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => {
                    const b = [...form.bullets];
                    b[i] = e.target.value;
                    setForm({ ...form, bullets: b });
                  }}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Bullet point..."
                />
                <button
                  onClick={() => setForm({ ...form, bullets: form.bullets.filter((_, j) => j !== i) })}
                  className="text-red-400 hover:text-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => setForm({ ...form, bullets: [...form.bullets, ""] })}
              className="text-indigo-600 text-sm flex items-center gap-1 hover:underline"
            >
              <Plus size={14} /> Add bullet
            </button>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
          >
            <Save size={15} /> Save
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Experience</h1>
          <p className="text-gray-500 text-sm">Manage your work history</p>
        </div>
        <button
          onClick={() => { setAdding(true); setEditing(null); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
        >
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {adding && <div className="mb-6"><Form item={empty} onSave={save} onCancel={() => setAdding(false)} /></div>}

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-6">
            {editing?.id === item.id ? (
              <Form item={editing!} onSave={save} onCancel={() => setEditing(null)} />
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-indigo-600 text-sm mt-0.5">{item.company}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {item.start_date} – {item.is_current ? "Present" : item.end_date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(item)} className="text-gray-400 hover:text-indigo-600">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => remove(item.id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
