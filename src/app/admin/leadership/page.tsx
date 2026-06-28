"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Save } from "lucide-react";

interface Item { id?: number; role: string; organization: string; display_order: number }
const empty: Item = { role: "", organization: "", display_order: 0 };

export default function LeadershipAdmin() {
  const [items, setItems] = useState<Item[]>([]);
  const [editing, setEditing] = useState<Item | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetch("/api/admin/leadership").then((r) => r.json()).then(setItems);
  }, []);

  const save = async (item: Item) => {
    const method = item.id ? "PUT" : "POST";
    const res = await fetch("/api/admin/leadership", {
      method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(item),
    });
    const saved = await res.json();
    if (item.id) setItems(items.map((i) => (i.id === saved.id ? saved : i)));
    else setItems([...items, saved]);
    setEditing(null); setAdding(false);
  };

  const remove = async (id?: number) => {
    if (!id || !confirm("Delete?")) return;
    await fetch("/api/admin/leadership", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setItems(items.filter((i) => i.id !== id));
  };

  const Form = ({ item, onSave, onCancel }: { item: Item; onSave: (i: Item) => void; onCancel: () => void }) => {
    const [form, setForm] = useState(item);
    return (
      <div className="bg-violet-50 border border-violet-200 rounded-xl p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Role</label><input type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Organization</label><input type="text" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
        </div>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50">Cancel</button>
          <button onClick={() => onSave(form)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"><Save size={15} /> Save</button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold text-gray-900">Leadership & Activities</h1><p className="text-gray-500 text-sm">Manage activities and roles</p></div>
        <button onClick={() => { setAdding(true); setEditing(null); }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"><Plus size={16} /> Add Activity</button>
      </div>
      {adding && <div className="mb-6"><Form item={empty} onSave={save} onCancel={() => setAdding(false)} /></div>}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-5">
            {editing?.id === item.id ? (
              <Form item={editing!} onSave={save} onCancel={() => setEditing(null)} />
            ) : (
              <div className="flex items-center justify-between">
                <div><h3 className="font-semibold text-gray-900">{item.role}</h3><p className="text-violet-600 text-sm">{item.organization}</p></div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(item)} className="text-gray-400 hover:text-indigo-600"><Edit2 size={16} /></button>
                  <button onClick={() => remove(item.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
