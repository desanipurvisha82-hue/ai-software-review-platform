"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { User, Mail, ShieldCheck, Star } from "lucide-react";
import {
  getReviewsByUserId,
  updateReview,
  deleteReview,
} from "@/lib/api";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);

  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);

  async function loadReviews() {
    const data = await getReviewsByUserId(1);
    setReviews(data);
  }

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
    setRole(localStorage.getItem("role") || "");
    loadReviews().catch(console.error);
  }, []);

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0";

  function startEdit(review: any) {
    setEditId(review.id);
    setEditTitle(review.title);
    setEditComment(review.comment);
    setEditRating(review.rating);
  }

  async function handleUpdate(review: any) {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    await updateReview(token, review.id, {
      userId: review.user?.id,
      softwareId: review.software?.id,
      rating: editRating,
      title: editTitle,
      comment: editComment,
    });

    setEditId(null);
    await loadReviews();
  }

  async function handleDelete(id: number) {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    if (!confirm("Delete this review?")) return;

    await deleteReview(token, id);
    await loadReviews();
  }

  return (
    <main className="min-h-screen gradient-bg">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-10 rounded-2xl"
        >
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center mb-6">
            <User size={42} />
          </div>

          <h1 className="text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-slate-400 mb-8">
            Your account information and review activity.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="border border-slate-700 p-4 rounded-xl">
              <Mail className="text-blue-400 mb-3" />
              <p className="text-slate-400 text-sm">Email</p>
              <p className="font-semibold">{email}</p>
            </div>

            <div className="border border-slate-700 p-4 rounded-xl">
              <ShieldCheck className="text-blue-400 mb-3" />
              <p className="text-slate-400 text-sm">Role</p>
              <p className="font-semibold">{role}</p>
            </div>

            <div className="border border-slate-700 p-4 rounded-xl">
              <Star className="text-yellow-400 mb-3" />
              <p className="text-slate-400 text-sm">Average Rating Given</p>
              <p className="font-semibold">{averageRating}/5</p>
            </div>
          </div>
        </motion.div>

        <div className="glass p-8 rounded-2xl mt-8">
          <h2 className="text-2xl font-bold mb-6">
            My Reviews ({reviews.length})
          </h2>

          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border border-slate-700 p-5 rounded-xl">
                {editId === review.id ? (
                  <>
                    <input
                      className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl mb-3"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />

                    <select
                      className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl mb-3"
                      value={editRating}
                      onChange={(e) => setEditRating(Number(e.target.value))}
                    >
                      <option value={5}>5 - Excellent</option>
                      <option value={4}>4 - Good</option>
                      <option value={3}>3 - Average</option>
                      <option value={2}>2 - Poor</option>
                      <option value={1}>1 - Bad</option>
                    </select>

                    <textarea
                      className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl mb-3"
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                    />

                    <button
                      onClick={() => handleUpdate(review)}
                      className="bg-blue-600 px-4 py-2 rounded-lg mr-3"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditId(null)}
                      className="bg-slate-700 px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg">{review.title}</h3>
                        <p className="text-blue-400 text-sm">
                          {review.software?.name}
                        </p>
                      </div>

                      <p className="text-yellow-400 font-bold">
                        {review.rating}/5
                      </p>
                    </div>

                    <p className="text-slate-300 mt-3">{review.comment}</p>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => startEdit(review)}
                        className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(review.id)}
                        className="bg-red-600 px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {reviews.length === 0 && (
            <p className="text-slate-400">No reviews written yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}