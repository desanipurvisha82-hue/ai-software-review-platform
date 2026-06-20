"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  getSoftwareById,
  getReviewsBySoftwareId,
  getAiSummary,
} from "@/lib/api";

export default function SoftwareDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [software, setSoftware] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    if (!id) return;

    getSoftwareById(id)
      .then(setSoftware)
      .catch(console.error);

    getReviewsBySoftwareId(id)
      .then(setReviews)
      .catch(console.error);

    getAiSummary(id)
      .then((data) => setSummary(data.summary))
      .catch(console.error);
  }, [id]);

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
          <h1 className="text-4xl font-bold">
            {software.name}
          </h1>

          <p className="text-blue-400 mt-2">
            {software.category}
          </p>

          <p className="mt-6 text-slate-300">
            {software.description}
          </p>

          <a
            href={software.website}
            target="_blank"
            className="inline-block mt-6 bg-blue-600 px-4 py-2 rounded-lg"
          >
            Visit Website
          </a>
        </div>

        <div className="glass p-8 rounded-2xl mt-8">
          <h2 className="text-2xl font-bold mb-4">
            AI Summary
          </h2>

          <p className="text-slate-300 whitespace-pre-wrap">
            {summary}
          </p>
        </div>

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
                <h3 className="font-bold">
                  {review.title}
                </h3>

                <p className="text-yellow-400">
                  Rating: {review.rating}/5
                </p>

                <p className="text-slate-300 mt-2">
                  {review.comment}
                </p>

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