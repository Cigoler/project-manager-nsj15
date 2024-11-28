import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email } = body;

  try {
    const result = await db.insert(users).values({ name, email }).returning();
    return NextResponse.json(result, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const result = await db.select().from(users);
  return NextResponse.json(result);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, name, email } = body;

  try {
    const result = await db
      .update(users)
      .set({ name, email })
      .where(users.id.equals(id))
      .returning();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    await db.delete(users).where(users.id.equals(id));
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
