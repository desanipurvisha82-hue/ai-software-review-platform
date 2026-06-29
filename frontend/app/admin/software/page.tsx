"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  addSoftware,
  deleteSoftware,
  getSoftware,
  updateSoftware,
  uploadFile,
} from "@/lib/api";

export default function AdminSoftwarePage() {
  const [software, setSoftware] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    website: "",
    logoUrl: "",
    description: "",
  });

  async function loadSoftware() {
    const data = await getSoftware();
    setSoftware(data);
  }

  useEffect(() => {
    loadSoftware();
  }, []);

  function startEdit(item: any) {
    setEditId(item.id);
    setForm({
      name: item.name,
      category: item.category,
      website: item.website,
      logoUrl: item.logoUrl,
      description: item.description,
    });
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await uploadFile(file);
      setForm({ ...form, logoUrl: data.url });
      setMessage("Logo uploaded successfully.");
    } catch {
      setMessage("Logo upload failed.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return setMessage("Please login as ADMIN.");

    try {
      if (editId) {
        await updateSoftware(token, editId, form);
        setMessage("Software updated successfully.");
      } else {
        await addSoftware(token, form);
        setMessage("Software added successfully.");
      }

      setEditId(null);
      setForm({
        name: "",
        category: "",
        website: "",
        logoUrl: "",
        description: "",
      });

      await loadSoftware();
    } catch {
      setMessage("Action failed. Make sure you are ADMIN.");
    }
  }

  async function handleDelete(id: number) {
    const token = localStorage.getItem("token");
    if (!token) return setMessage("Please login as ADMIN.");

    if (!confirm("Are you sure you want to delete this software?")) return;

    try {
      await deleteSoftware(token, id);
      setMessage("Software deleted successfully.");
      await loadSoftware();
    } catch {
      setMessage("Delete failed.");
    }
  }

  return (
    <main className="min-h-screen gradient-bg">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl font-bold">Admin Software Management</h1>

        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl mt-10">
          <h2 className="text-2xl font-bold mb-6">
            {editId ? "Edit Software" : "Add New Software"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="bg-slate-900 border border-slate-700 p-3 rounded-xl"
              placeholder="Software Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              className="bg-slate-900 border border-slate-700 p-3 rounded-xl"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            />

            <input
              className="bg-slate-900 border border-slate-700 p-3 rounded-xl"
              placeholder="Website URL"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              required
            />

            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="bg-slate-900 border border-slate-700 p-3 rounded-xl w-full"
              />

              {form.logoUrl && (
                <img
                  src={form.logoUrl}
                  alt="Logo preview"
                  className="mt-4 w-20 h-20 object-cover rounded-xl border border-slate-700"
                />
              )}
            </div>
          </div>

          <textarea
            className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl mt-4"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />

          <button className="mt-6 bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-500">
            {editId ? "Update Software" : "Add Software"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm({
                  name: "",
                  category: "",
                  website: "",
                  logoUrl: "",
                  description: "",
                });
              }}
              className="ml-4 bg-slate-700 px-6 py-3 rounded-xl"
            >
              Cancel
            </button>
          )}

          {message && <p className="mt-4 text-slate-300">{message}</p>}
        </form>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {software.map((item) => (
            <div key={item.id} className="glass p-6 rounded-2xl">
              {item.logoUrl && (
                <img
                  src={item.logoUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-xl mb-4 border border-slate-700"
                />
              )}

              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-blue-400">{item.category}</p>
              <p className="text-slate-400 mt-3">{item.description}</p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => startEdit(item)}
                  className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}