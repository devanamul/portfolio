"use client";
import { useEffect, useState, useRef } from "react";
import { Save, Upload, Loader2, CheckCircle, Plus, X, FileText } from "lucide-react";
import Image from "next/image";

interface ProfileForm {
  id?: number;
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
  titles: string[];
}

export default function ProfileAdmin() {
  const [form, setForm] = useState<ProfileForm>({
    name: "", title: "", summary: "", phone: "", email: "",
    linkedin: "", github: "", location: "", photo_url: "", cv_url: "", titles: [],
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [cvUploading, setCvUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [cvUploadError, setCvUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const cvFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/profile").then((r) => r.json()).then((data) => {
      if (data) {
        let parsedTitles: string[] = ["Full-Stack Software Engineer", "Laravel Expert", "React Developer", "Next.js Engineer"];
        try {
          const t = JSON.parse(data.titles ?? "[]");
          if (Array.isArray(t) && t.length > 0) parsedTitles = t;
        } catch { /* keep default */ }
        setForm({ ...data, titles: parsedTitles });
      }
    });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, titles: JSON.stringify(form.titles) }),
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const persistField = async (key: string, value: string) => {
    await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: value }),
    });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) {
      setForm((f) => ({ ...f, photo_url: data.url }));
      await persistField("photo_url", data.url);
    } else {
      setUploadError(data.error ?? "Photo upload failed");
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCvUploading(true);
    setCvUploadError("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload-cv", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) {
      setForm((f) => ({ ...f, cv_url: data.url }));
      await persistField("cv_url", data.url);
    } else {
      setCvUploadError(data.error ?? "CV upload failed");
    }
    setCvUploading(false);
    e.target.value = "";
  };

  const addTitle = () => setForm((f) => ({ ...f, titles: [...f.titles, ""] }));

  const removeTitle = (i: number) =>
    setForm((f) => ({ ...f, titles: f.titles.filter((_, idx) => idx !== i) }));

  const updateTitle = (i: number, value: string) =>
    setForm((f) => ({ ...f, titles: f.titles.map((t, idx) => (idx === i ? value : t)) }));

  const fields: { key: keyof ProfileForm; label: string; type?: string; rows?: number }[] = [
    { key: "name", label: "Full Name" },
    { key: "title", label: "Job Title" },
    { key: "summary", label: "Summary", rows: 4 },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email", type: "email" },
    { key: "linkedin", label: "LinkedIn URL", type: "url" },
    { key: "github", label: "GitHub URL", type: "url" },
    { key: "location", label: "Location" },
  ];

  const cvFilename = form.cv_url ? form.cv_url.split("/").pop() : null;

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-500 text-sm">Update your personal information</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-70"
        >
          {saved ? <CheckCircle size={18} /> : loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Photo upload */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Profile Photo</h2>
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-gray-200 flex-shrink-0">
            {form.photo_url ? (
              <Image src={form.photo_url} alt="Profile" fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                No photo
              </div>
            )}
          </div>
          <div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              {uploading ? "Uploading..." : "Upload Photo"}
            </button>
            <p className="text-gray-400 text-xs mt-2">JPEG, PNG, WebP — max 5MB</p>
          </div>
        </div>
        {uploadError && <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{uploadError}</p>}
      </div>

      {/* CV Upload */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">CV / Resume</h2>
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0">
            <FileText size={28} className={cvFilename ? "text-indigo-500" : "text-gray-300"} />
          </div>
          <div className="flex-1 min-w-0">
            {cvFilename ? (
              <p className="text-sm font-medium text-gray-800 truncate mb-1">{cvFilename}</p>
            ) : (
              <p className="text-sm text-gray-400 mb-1">No CV uploaded</p>
            )}
            {form.cv_url && (
              <a href={form.cv_url} target="_blank" rel="noopener noreferrer"
                className="text-xs text-indigo-600 hover:underline">
                Preview / Download
              </a>
            )}
          </div>
          <div>
            <input ref={cvFileRef} type="file" accept="application/pdf" onChange={handleCvUpload} className="hidden" />
            <button
              onClick={() => cvFileRef.current?.click()}
              disabled={cvUploading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              {cvUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              {cvUploading ? "Uploading..." : "Upload CV"}
            </button>
            <p className="text-gray-400 text-xs mt-2">PDF only — max 10MB</p>
          </div>
        </div>
        {cvUploadError && <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{cvUploadError}</p>}
      </div>

      {/* Typewriter Titles */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-gray-900">Typewriter Titles</h2>
            <p className="text-gray-400 text-xs mt-0.5">These cycle as animated subtitles on the hero section</p>
          </div>
          <button
            onClick={addTitle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition-colors"
          >
            <Plus size={15} /> Add Title
          </button>
        </div>
        <div className="space-y-3">
          {form.titles.map((t, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-5 text-center font-mono">{i + 1}</span>
              <input
                type="text"
                value={t}
                onChange={(e) => updateTitle(i, e.target.value)}
                placeholder="e.g. Full-Stack Software Engineer"
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={() => removeTitle(i)}
                disabled={form.titles.length <= 1}
                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          {form.titles.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-4">No titles yet. Add one above.</p>
          )}
        </div>
      </div>

      {/* Form fields */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-900 mb-1">Personal Info</h2>
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
            {field.rows ? (
              <textarea
                rows={field.rows}
                value={form[field.key] as string}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            ) : (
              <input
                type={field.type ?? "text"}
                value={form[field.key] as string}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
