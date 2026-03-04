// app/api/coffees/route.js
import { NextResponse } from "next/server";

const coffees = [
  {
    id: 1,
    name: "Espresso",
    category: "Classiques",
    image: "/images/hero1.png",
    sizes: [
      { key: "S", label: "S", price: 4 },
      { key: "M", label: "M", price: 5 },
    ],
  },
  {
    id: 2,
    name: "Cappuccino",
    category: "Lattés",
    image: "/images/hero1.png",
    sizes: [
      { key: "S", label: "S", price: 6 },
      { key: "M", label: "M", price: 7.5 },
      { key: "L", label: "L", price: 9 },
    ],
  },
  {
    id: 3,
    name: "Iced Latte",
    category: "Glacés",
    image: "/images/hero1.png",
    sizes: [
      { key: "M", label: "M", price: 8 },
      { key: "L", label: "L", price: 10 },
    ],
  },
];

export function GET() {
  return NextResponse.json(coffees);
}
