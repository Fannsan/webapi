import { Review } from "@/utils/types/review";
import { NextRequest, NextResponse } from "next/server";
import { ReviewModel } from "@/utils/models/reviewModel";
import { dbConnect } from "@/utils/db";

export async function DELETE(request: NextRequest) {
  try {
    //has to be "id" or els it wont find the route
    const _id = request.nextUrl.searchParams.get("id");

    await dbConnect();
    await ReviewModel.findByIdAndDelete(_id);
    return NextResponse.json(
      { message: "Successfully deleted item" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Errror", error }, { status: 500 });
  }
}

/*

export async function GET(request: NextRequest) {
  try {
    const _id = request.nextUrl.searchParams.get("id");

    await dbConnect();

    await ReviewModel.findById(_id);

    return NextResponse.json(
      { message: "Successfully fetched id" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Errror", error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const _id = request.nextUrl.searchParams.get("id");

    await dbConnect();

    // Parse JSON from the request body
    const { name, description, rating }: Review = await request.json();

    // Validate the request body
    if (!name || !description || !rating) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const updatedReview = await ReviewModel.findByIdAndUpdate(
      _id,
      {
        name,
        description,
        rating,
      },
      { new: true } // Return the updated document
    );

    if (!updatedReview) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Successfully uppdated " },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Errror", error }, { status: 500 });
  }
}
*/
