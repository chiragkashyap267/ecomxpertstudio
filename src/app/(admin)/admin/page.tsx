"use client";

import { useState, useEffect, useRef } from "react";
import {
  Upload,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  LogOut,
  Eye,
  Image as ImageIcon,
  Lock,
  LayoutDashboard,
  Package,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────
type WorkItem = {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  scope: string;
  img: string;
  liveUrl: string;
  desc: string;
  outcome: string;
};

const CATEGORIES = [
  "Mockups",
  "Packaging Design",
  "Social Media",
  "Flyers & Brochures",
  "Infographics & A+ Content",
  "Thumbnails",
  "Web Apps",
  "Websites",
  "Graphic Design",
  "Video Editing",
  "Other",
];

// ─── Toast ──────────────────────────────────────────────────────────────────
function Toast({
  msg,
  type,
  onClose,
}: {
  msg: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 rounded-xl px-5 py-3 shadow-2xl text-sm font-medium transition-all
        ${type === "success" ? "bg-cyan-500/10 border border-cyan-500/40 text-cyan-300" : "bg-red-500/10 border border-red-500/40 text-red-300"}`}
    >
      {type === "success" ? (
        <CheckCircle size={16} />
      ) : (
        <AlertCircle size={16} />
      )}
      {msg}
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Empty work item template ───────────────────────────────────────────────
const EMPTY_ITEM: Omit<WorkItem, "id"> = {
  title: "",
  category: "Mockups",
  client: "",
  year: new Date().getFullYear().toString(),
  scope: "",
  img: "",
  liveUrl: "/contact",
  desc: "",
  outcome: "",
};

// ─── Work Item Form ──────────────────────────────────────────────────────────
function WorkItemForm({
  initial,
  onSave,
  onCancel,
  isNew,
}: {
  initial: WorkItem | Omit<WorkItem, "id">;
  onSave: (item: WorkItem | Omit<WorkItem, "id">) => Promise<void>;
  onCancel: () => void;
  isNew: boolean;
}) {
  const [form, setForm] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(initial.img);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: string, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append(
      "category",
      (form as WorkItem).category?.replace(/\s+/g, "-").toLowerCase() ??
        "misc"
    );
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (data.url) {
      set("img", data.url);
      setPreview(data.url);
    } else {
      alert(data.error ?? "Upload failed");
    }
  }

  async function handleSave() {
    if (!form.title || !form.category) {
      alert("Title and Category are required.");
      return;
    }
    setSaving(true);
    await onSave(form);
    setSaving(false);
  }

  const input =
    "w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-colors";
  const label = "block text-xs font-medium text-white/50 mb-1";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-5">
      <h3 className="text-base font-semibold text-white">
        {isNew ? "➕ Add New Work Sample" : "✏️ Edit Work Sample"}
      </h3>

      {/* Image Upload */}
      <div>
        <label className={label}>Cover Image</label>
        <div className="flex gap-3 items-start">
          <div className="relative w-28 h-20 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon size={24} className="text-white/20" />
            )}
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <Loader2 size={18} className="animate-spin text-cyan-400" />
              </div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 text-xs text-cyan-300 hover:bg-cyan-500/20 transition-colors disabled:opacity-50"
            >
              <Upload size={13} />
              {uploading ? "Uploading…" : "Upload Image"}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <p className="text-xs text-white/30">
              Or paste a URL below:
            </p>
            <input
              className={input}
              placeholder="https://… or /work/category/file.jpg"
              value={form.img}
              onChange={(e) => {
                set("img", e.target.value);
                setPreview(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Title *</label>
          <input
            className={input}
            placeholder="e.g. Serum Launch Mockup"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
          />
        </div>
        <div>
          <label className={label}>Category *</label>
          <select
            className={`${input} appearance-none cursor-pointer`}
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-[#0e0e1a]">
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Client</label>
          <input
            className={input}
            placeholder="e.g. Skincare Brand"
            value={form.client}
            onChange={(e) => set("client", e.target.value)}
          />
        </div>
        <div>
          <label className={label}>Year</label>
          <input
            className={input}
            placeholder="2026"
            value={form.year}
            onChange={(e) => set("year", e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Scope (comma-separated)</label>
          <input
            className={input}
            placeholder="e.g. Product mockup, label design, ecommerce visual"
            value={form.scope}
            onChange={(e) => set("scope", e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Description</label>
          <textarea
            className={`${input} resize-none`}
            rows={2}
            placeholder="Short project description…"
            value={form.desc}
            onChange={(e) => set("desc", e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Outcome</label>
          <textarea
            className={`${input} resize-none`}
            rows={2}
            placeholder="What was the result / impact…"
            value={form.outcome}
            onChange={(e) => set("outcome", e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Live URL</label>
          <input
            className={input}
            placeholder="/contact or https://…"
            value={form.liveUrl}
            onChange={(e) => set("liveUrl", e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2 text-sm font-semibold text-black hover:bg-cyan-400 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-5 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={14} />
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Work Items Table ─────────────────────────────────────────────────────────
function WorkTab({
  showToast,
}: {
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingNew, setAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState("All");

  const allCategories = ["All", ...Array.from(new Set(items.map((i) => i.category)))];

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/work");
      if (res.ok) {
        setItems(await res.json());
      }
      setLoading(false);
    })();
  }, []);

  async function handleAdd(form: Omit<WorkItem, "id"> | WorkItem) {
    const res = await fetch("/api/admin/work", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newItem = await res.json();
      setItems((p) => [...p, newItem]);
      setAddingNew(false);
      showToast("Work sample added!", "success");
    } else {
      showToast("Failed to add item", "error");
    }
  }

  async function handleUpdate(form: Omit<WorkItem, "id"> | WorkItem) {
    const res = await fetch("/api/admin/work", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems((p) => p.map((i) => (i.id === updated.id ? updated : i)));
      setEditingId(null);
      showToast("Item updated!", "success");
    } else {
      showToast("Failed to update item", "error");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this work sample? This cannot be undone.")) return;
    const res = await fetch("/api/admin/work", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setItems((p) => p.filter((i) => i.id !== id));
      showToast("Item deleted.", "success");
    } else {
      showToast("Failed to delete item", "error");
    }
  }

  const filtered =
    filterCat === "All" ? items : items.filter((i) => i.category === filterCat);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="animate-spin text-cyan-400" size={28} />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">Work Samples</h2>
          <p className="text-xs text-white/40 mt-0.5">
            {items.length} item{items.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Category filter */}
          <div className="relative">
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              className="appearance-none rounded-lg bg-white/5 border border-white/10 px-3 py-2 pr-7 text-xs text-white/70 outline-none focus:border-cyan-500/50 cursor-pointer"
            >
              {allCategories.map((c) => (
                <option key={c} value={c} className="bg-[#0e0e1a]">
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown
              size={12}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
            />
          </div>
          <button
            onClick={() => {
              setAddingNew(true);
              setEditingId(null);
            }}
            className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-black hover:bg-cyan-400 transition-colors"
          >
            <Plus size={13} />
            Add Sample
          </button>
        </div>
      </div>

      {/* Add form */}
      {addingNew && (
        <WorkItemForm
          initial={EMPTY_ITEM}
          onSave={handleAdd}
          onCancel={() => setAddingNew(false)}
          isNew
        />
      )}

      {/* Items grid */}
      {filtered.length === 0 && !addingNew && (
        <div className="flex flex-col items-center justify-center h-40 rounded-2xl border border-dashed border-white/10 text-white/30 gap-2">
          <Package size={28} />
          <p className="text-sm">No samples in this category yet.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((item) =>
          editingId === item.id ? (
            <div key={item.id} className="md:col-span-2 xl:col-span-3">
              <WorkItemForm
                initial={item}
                onSave={handleUpdate}
                onCancel={() => setEditingId(null)}
                isNew={false}
              />
            </div>
          ) : (
            <div
              key={item.id}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-cyan-500/30 transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative h-36 bg-white/5 overflow-hidden">
                {item.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon size={32} className="text-white/15" />
                  </div>
                )}
                {/* Category pill */}
                <span className="absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-cyan-300 backdrop-blur-sm">
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 space-y-1">
                <p className="text-sm font-semibold text-white leading-tight truncate">
                  {item.title}
                </p>
                <p className="text-xs text-white/40 truncate">
                  {item.client} · {item.year}
                </p>
                {item.desc && (
                  <p className="text-xs text-white/30 line-clamp-2 mt-1">
                    {item.desc}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 px-4 pb-4">
                <button
                  onClick={() => {
                    setEditingId(item.id);
                    setAddingNew(false);
                  }}
                  className="flex items-center gap-1.5 text-xs text-white/50 hover:text-cyan-300 transition-colors"
                >
                  <Edit3 size={13} />
                  Edit
                </button>
                {item.liveUrl && item.liveUrl !== "/contact" && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
                  >
                    <ExternalLink size={13} />
                    Preview
                  </a>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="ml-auto flex items-center gap-1.5 text-xs text-white/30 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab() {
  const stats = [
    { label: "Live Portfolio Items", value: "6", color: "text-cyan-400" },
    { label: "Categories", value: "6", color: "text-purple-400" },
    { label: "Website Pages", value: "4", color: "text-emerald-400" },
    { label: "Contact Methods", value: "3", color: "text-orange-400" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">Dashboard Overview</h2>
        <p className="text-xs text-white/40 mt-0.5">
          Manage your EcomXpertStudio website content
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-1"
          >
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-white/40">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
        <h3 className="text-sm font-semibold text-white/70">Quick Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "View Website Homepage", href: "/" },
            { label: "View Portfolio Page", href: "/portfolio" },
            { label: "View Services Page", href: "/services" },
            { label: "View Contact Page", href: "/contact" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/60 hover:text-white hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-colors"
            >
              <Eye size={14} className="text-cyan-400" />
              {l.label}
              <ExternalLink size={12} className="ml-auto opacity-40" />
            </a>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 space-y-2">
        <h3 className="text-sm font-semibold text-cyan-300">
          📝 How to Add Work Samples
        </h3>
        <ol className="text-xs text-white/50 space-y-1.5 list-decimal list-inside">
          <li>
            Go to the <strong className="text-white/70">Work Samples</strong> tab
          </li>
          <li>
            Click <strong className="text-white/70">Add Sample</strong>
          </li>
          <li>
            Upload your image file (JPG, PNG, WebP — max 10 MB) or paste an
            external URL
          </li>
          <li>Fill in the title, category, description, and other details</li>
          <li>
            Click <strong className="text-white/70">Save</strong> — it
            immediately appears on your portfolio page
          </li>
        </ol>
      </div>
    </div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      onLogin();
    } else {
      setError("Incorrect password. Try again.");
      setPassword("");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07070f] px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-sm space-y-6"
      >
        {/* Logo / branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mb-2">
            <Lock size={22} className="text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-sm text-white/40">EcomXpertStudio · Restricted</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password…"
              autoFocus
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-colors"
            />
          </div>

          {error && (
            <p className="flex items-center gap-2 text-xs text-red-400">
              <AlertCircle size={13} />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-500 py-2.5 text-sm font-semibold text-black hover:bg-cyan-400 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Lock size={15} />
            )}
            {loading ? "Verifying…" : "Enter Admin Panel"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "work">("overview");
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  // Check if already authenticated via cookie
  useEffect(() => {
    fetch("/api/admin/work")
      .then((r) => {
        setAuthed(r.ok);
      })
      .catch(() => setAuthed(false));
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
  }

  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
  }

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07070f]">
        <Loader2 className="animate-spin text-cyan-400" size={32} />
      </div>
    );
  }

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "work", label: "Work Samples", icon: Package },
  ] as const;

  return (
    <div className="min-h-screen bg-[#07070f] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-56 flex-col border-r border-white/10 bg-white/[0.02] p-5 shrink-0">
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
            EcomXpertStudio
          </p>
          <p className="text-[10px] text-white/30 mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left
                  ${
                    active
                      ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  }`}
              >
                <Icon size={15} />
                {t.label}
              </button>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/30 hover:text-red-400 hover:bg-red-500/5 transition-colors"
        >
          <LogOut size={15} />
          Logout
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-white/10 px-5 md:px-8 py-4 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            {/* Mobile tab pills */}
            <div className="flex md:hidden gap-1">
              {tabs.map((t) => {
                const Icon = t.icon;
                const active = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors
                      ${
                        active
                          ? "bg-cyan-500/15 text-cyan-300"
                          : "text-white/40 hover:text-white"
                      }`}
                  >
                    <Icon size={13} />
                    {t.label}
                  </button>
                );
              })}
            </div>
            <span className="hidden md:block text-sm font-medium text-white/60 capitalize">
              {activeTab === "overview" ? "Dashboard" : "Work Samples"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
            >
              <Eye size={13} />
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors md:hidden"
            >
              <LogOut size={13} />
              Logout
            </button>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 overflow-auto p-5 md:p-8">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "work" && <WorkTab showToast={showToast} />}
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
