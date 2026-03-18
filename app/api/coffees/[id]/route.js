import { NextResponse } from "next/server";
import { coffees } from "../data";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const coffeeId = Number(id);

    if (Number.isNaN(coffeeId)) {
      return NextResponse.json(
        { message: "ID invalide" },
        { status: 400 }
      );
    }

    const coffee = coffees.find((c) => c.id === coffeeId);

    if (!coffee) {
      return NextResponse.json(
        { message: "Coffee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(coffee);
  } catch (error) {
    console.error("API coffee by id error:", error);
    return NextResponse.json(
      { message: "Erreur serveur" },
      { status: 500 }
    );
  }
}
