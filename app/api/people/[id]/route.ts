import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, context: any) {
  const { id } = context.params;

  const person = await prisma.person.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!person) {
    return new Response("Not Found", {
      status: 404,
    });
  }
  return new Response(JSON.stringify(person), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PUT(request: Request, context: any) {
  const { id } = context.params;
  try {
    const body = await request.json();
    const { firstname, lastname, phone, dob } = body;
    if (!firstname || !lastname || !phone || !dob) {
      return new Response("Missing required files", {
        status: 400,
      });
    }
    const updatedPerson = await prisma.person.update({
      where: {
        id: parseInt(id),
      },
      data: {
        firstname,
        lastname,
        phone,
        dob: new Date(dob),
      },
    });
    if (!updatedPerson) {
      return new Response("Person not found", {
        status: 404,
      });
    }
    return new Response(JSON.stringify(updatedPerson), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response("Error", { status: 500 });
  }
}

export async function DELETE(request: Request, context: any) {
  const { id } = context.params;
  try {
    const deletePerson = await prisma.person.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (!deletePerson) {
      return new Response("Person not found", {
        status: 404,
      });
    }
    return new Response("Person deleted successfully", {
      status: 200,
    });
  } catch (err) {
    return new Response("Error", {
      status: 500,
    });
  }
}
