import { NextResponse } from "next/server";

const addons = [
  {
    id: "mini-croissant",
    name: "Mini croissant",
    price: 3,
    image: "/images/mini-croissant.jpg",
    available: true,
  },
  {
    id: "pain-chocolat",
    name: "Pain au chocolat",
    price: 4,
    image: "/images/pain-chocolat.jpg",
    available: true,
  },
  {
    id: "croissant-amandes",
    name: "Croissant aux amandes",
    price: 5,
    image: "/images/croissant-amandes.jpg",
    available: true,
  },
  {
    id: "cookie-maison",
    name: "Cookie maison",
    price: 4,
    image: "/images/cookie-maison1.jpg",
    available: true,
  },
  {
    id: "brownie-fondant",
    name: "Brownie fondant",
    price: 5,
    image: "/images/brownie-fondant.jpg",
    available: false,
  },
  {
  id: "muffin-chocolat",
  name: "Muffin au chocolat",
  price: 4,
  image: "/images/muffin-au-chocolat.jpg",
  available: true,
},
{
  id: "muffin-vanille",
  name: "Muffin vanille",
  price: 4,
  image: "/images/muffin-vanille.jpg",
  available: true,
},
{
  id: "cheesecake",
  name: "Cheesecake",
  price: 6,
  image: "/images/cheesecake.jpg",
  available: true,
},
{
  id: "tiramisu",
  name: "Tiramisu",
  price: 6,
  image: "/images/tiramisu.jpg",
  available: true,
},
];

export async function GET() {
  return NextResponse.json(addons);
}
