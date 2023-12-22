import { Review } from "@/utils/types/review";
import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema<Review>(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { strict: true }
);

export const ReviewModel =
  mongoose.models.ReviewModel ||
  mongoose.model<Review>("ReviewModel", reviewSchema, "reviews");
