import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const people = await prisma.person.findMany({
    select: {
      id: true,
      firstname: true,
      lastname: true,
      phone: true,
      dob: true, // Make sure to include this
    },
  });

  return new Response(JSON.stringify(people), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { firstname, lastname, phone, dob } = body;

    // Check for missing required fields
    if (!firstname || !lastname || !phone || !dob) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new person record
    const person = await prisma.person.create({
      data: {
        firstname,
        lastname,
        phone,
        dob: new Date(dob), // Ensure this is a valid date format
      },
    });

    // Return the created person record
    return NextResponse.json(person, { status: 201 });
  } catch (error) {
    console.error("Error saving the record:", error);
    return NextResponse.json(
      { error: "Error saving the record" },
      { status: 500 }
    );
  }
}
