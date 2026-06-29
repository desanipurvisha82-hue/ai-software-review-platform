"use client";

import StarRating from "@/components/StarRating";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  getSoftwareById,
  getReviewsBySoftwareId,
  getAiSummary,
  addReview,
} from "@/lib/api";

export default function SoftwareDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [software, setSoftware] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [summary, setSummary] = useState("");

  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  async function loadData() {
    const softwareData = await getSoftwareById(id);
    const reviewsData = await getReviewsBySoftwareId(id);
    const summaryData = await getAiSummary(id);

    setSoftware(softwareData);
    setReviews(reviewsData);
    setSummary(summaryData.summary);
  }

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first.");
      return;
    }

    try {
      await addReview(token, {
        userId: 1,
        softwareId: Number(id),
        rating,
        title,
        comment,
      });

      setTitle("");
      setComment("");
      setRating(5);
      setMessage("Review added successfully.");

      await loadData();
    } catch {
      setMessage("Failed to add review.");
    }
  }

  if (!software) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen gradient-bg">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <div className="glass p-8 rounded-2xl">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {software.logoUrl && (
              <img
                src={software.logoUrl}
                alt={software.name}
                className="w-24 h-24 object-cover rounded-2xl border border-slate-700"
              />
            )}

            <div>
              <h1 className="text-4xl font-bold">{software.name}</h1>
              <p className="text-blue-400 mt-2">{software.category}</p>
            </div>
          </div>

          <p className="mt-6 text-slate-300">{software.description}</p>

          <a
            href={software.website}
            target="_blank"
            className="inline-block mt-6 bg-blue-600 px-4 py-2 rounded-lg"
          >
            Visit Website
          </a>
        </div>

        <div className="glass p-8 rounded-2xl mt-8">
          <h2 className="text-2xl font-bold mb-4">AI Summary</h2>
          <p className="text-slate-300 whitespace-pre-wrap">{summary}</p>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl mt-8">
          <h2 className="text-2xl font-bold mb-6">Add Review</h2>

          <input
            className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl mb-4"
            placeholder="Review title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <StarRating rating={rating} setRating={setRating} />

          <textarea
            className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl mb-4"
            placeholder="Write your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />

          <button className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-500">
            Submit Review
          </button>

          {message && <p className="mt-4 text-slate-300">{message}</p>}
        </form>

        <div className="glass p-8 rounded-2xl mt-8">
          <h2 className="text-2xl font-bold mb-6">
            Reviews ({reviews.length})
          </h2>

          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border border-slate-700 p-4 rounded-xl"
              >
                <h3 className="font-bold">{review.title}</h3>
                <p className="text-yellow-400">Rating: {review.rating}/5</p>
                <p className="text-slate-300 mt-2">{review.comment}</p>
                <p className="text-xs text-slate-500 mt-2">
                  By {review.user?.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}