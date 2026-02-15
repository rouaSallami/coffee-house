import { NextResponse } from "next/server";

const addons = [
  {
    id: "mini-croissant",
    name: "Mini croissant",
    price: 3,
    image: "/images/mini-croissant.jpg",
  },
  {
    id: "pain-chocolat",
    name: "Pain au chocolat",
    price: 4,
    image: "/images/pain-chocolat.jpg",
  },
  {
    id: "croissant-amandes",
    name: "Croissant aux amandes",
    price: 5,
    image: "/images/croissant-amandes.jpg",
  },
  {
    id: "cookie-maison",
    name: "Cookie maison",
    price: 4,
    image: "/images/cookie-maison1.jpg",
  },
  {
    id: "brownie-fondant",
    name: "Brownie fondant",
    price: 5,
    image: "/images/brownie-fondant.jpg",
  },
];

export async function GET() {
  return NextResponse.json(addons);
}
