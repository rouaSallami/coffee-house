import { NextResponse } from "next/server";

const homeCoffees = [
  {
    id: "cappuccino",
    name: "Cappuccino",
    description: "Mousse légère et goût équilibré.",
    price: 13,
    image: "/images/cappuccino.jpg",
  },
  {
    id: "latte",
    name: "Latte",
    description: "Doux, onctueux et réconfortant.",
    price: 12,
    image: "/images/latte1.jpg",
  },
  {
    id: "mocha",
    name: "Mocha",
    description: "Café & chocolat pour les gourmands.",
    price: 14,
    image: "/images/mocha.jpg",
  },
  {
    id: "americano",
    name: "Americano",
    description: "Allongé, léger et parfumé.",
    price: 11,
    image: "/images/americano.jpg",
  },
];

export async function GET() {
  return NextResponse.json(homeCoffees);
}