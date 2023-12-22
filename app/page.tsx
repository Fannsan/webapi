"use client";
import { Review } from "@/utils/types/review";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ReviewCard from "./compnents/reviewCard";

interface Props {
  review: Review;
  id: string;
}

export default function Home() {
  useEffect(() => {
    // Fetch reviews when the component mounts
    getReviews();
    console.log("useEffect ran!");
  }, []);

  const [formData, setFormData] = useState<Review>({
    _id: "",
    name: "",
    description: "",
    rating: 0,
  });

  const [reviews, setReviews] = useState<Review[]>([]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handelSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log("Submitted");

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        // You can handle success actions here
      } else {
        const error = await response.json();
        console.error(error);
        // You can handle error actions here
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getReviews = async () => {
    try {
      const response = await fetch("/api", {
        cache: "no-store",
      });
      if (response.ok) {
        const reviewsData = await response.json();
        setReviews(reviewsData.reviews);
        console.log("Reviews:", reviewsData.reviews);
      } else {
        console.error("Error fetching reviews:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      {/* Header */}
      <header className="text-4xl font-bold mt-10 mb-8 text-sky-600">
        Book Review
      </header>

      <p className="text-sky-600">Review your books here</p>
      {/* Grå ruta med formulär */}
      <div className="bg-gray-200 p-10 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <form onSubmit={handelSubmit} className="p-4">
            <p>Book name</p>
            <input
              value={formData.name}
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="name"
              className="mb-4 p-2 border border-gray-300 rounded-md"
            />

            <p>Description</p>
            <textarea
              value={formData.description}
              onChange={handleChange}
              rows={5}
              name="description"
              placeholder="description"
              className="mb-4 p-2 border border-gray-300 rounded-md"
            />

            <p>Rating</p>
            <input
              value={formData.rating}
              onChange={handleChange}
              type="text"
              name="rating"
              placeholder="rating"
              className="mb-4 p-2 border border-gray-300 rounded-md"
            />

            <div>
              <button
                className="bg-sky-500 p-2 mt-4 rounded-md justify-center"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          <div></div>
        </div>
      </div>

      <div className="flex bg-sky-600 p-8 flex-col w-full mt-20">
        <h2 className="flex justify-center text-2xl">
          Here you can see the collection of all your reviews
        </h2>

        <div className="flex flex-col items-center">
          <button
            className="bg-sky-500 p-2 mt-4 rounded-md w-1/4 "
            onClick={getReviews}
          >
            Refresh reviews
          </button>
          <div>
            <div className="flex flex-wrap justify-center">
              {Array.isArray(reviews) &&
                reviews.map((review, _index) => (
                  <ReviewCard
                    key={_index}
                    review={review}
                    //onDelete={() => console.log("pressed item")}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
