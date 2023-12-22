"use client";
import React from "react";
import { Review } from "@/utils/types/review";

const deleteReview = async (id: string) => {
  await fetch(`http://localhost:3000/api/id?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      }
    })
    .catch((error) => {
      console.error("Network error", error);
    });
};

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-md p-4 m-4 w-72 flex flex-col relative">
      <button
        className="bg-red-600 p-2 self-end rounded-md"
        onClick={() => {
          deleteReview(review._id), console.log(review._id);
        }}
      >
        X
      </button>

      <h3 className="text-black text-xl font-semibold">{review.name}</h3>

      <p className="text-gray-600">{review.description}</p>
      <div className="bg-yellow-400 text-gray-800 font-bold rounded-md px-2 py-1 inline-block mt-2">
        {review.rating} Stars
      </div>
    </div>
  );
};

export default ReviewCard;
