import { dbConnect } from "@/utils/db";
import { Review } from "@/utils/types/review";
import { NextRequest, NextResponse } from "next/server";
import { ReviewModel } from "@/utils/models/reviewModel";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    //skapar variabler från Review objekt med destructuring
    const { name, description, rating }: Review = await request.json(); // Parse JSON from the request body

    // Validate the request body
    if (!name || !description || !rating) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const newReview = await ReviewModel.create({ name, description, rating });

    // Your POST request handling logic here
    return NextResponse.json({
      message: "POST request success",
      review: newReview,
    });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function GET() {
  await dbConnect();

  try {
    // Your GET request handling logic here

    const reviews = await ReviewModel.find();

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

/*
export async function DELETE(NextRequest: NextRequest) {
  const id = NextRequest.nextUrl.searchParams.get("id");
  await dbConnect();
  await ReviewModel.findByIdAndDelete(id);
  return NextResponse.json({ message: "deleted item" }, { status: 200 });
}
*/
