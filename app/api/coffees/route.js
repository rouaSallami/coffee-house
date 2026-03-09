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
  {
  id: 4,
  name: "Americano",
  category: "Classiques",
  image: "/images/hero1.png",
  sizes: [
    { key: "S", label: "S", price: 4.5 },
    { key: "M", label: "M", price: 5.5 },
  ],
},
{
  id: 5,
  name: "Ristretto",
  category: "Classiques",
  image: "/images/hero1.png",
  sizes: [
    { key: "S", label: "S", price: 4 },
    { key: "M", label: "M", price: 5 },
  ],
},
{
  id: 6,
  name: "Flat White",
  category: "Lattés",
  image: "/images/hero1.png",
  sizes: [
    { key: "S", label: "S", price: 6 },
    { key: "M", label: "M", price: 7 },
    { key: "L", label: "L", price: 8.5 },
  ],
},
{
  id: 7,
  name: "Café Latte",
  category: "Lattés",
  image: "/images/hero1.png",
  sizes: [
    { key: "S", label: "S", price: 6 },
    { key: "M", label: "M", price: 7.5 },
    { key: "L", label: "L", price: 9 },
  ],
},
{
  id: 8,
  name: "Iced Americano",
  category: "Glacés",
  image: "/images/hero1.png",
  sizes: [
    { key: "M", label: "M", price: 7 },
    { key: "L", label: "L", price: 8.5 },
  ],
},
{
  id: 9,
  name: "Cold Brew",
  category: "Glacés",
  image: "/images/hero1.png",
  sizes: [
    { key: "M", label: "M", price: 8 },
    { key: "L", label: "L", price: 9.5 },
  ],
},
{
  id: 10,
  name: "Frappé",
  category: "Glacés",
  image: "/images/hero1.png",
  sizes: [
    { key: "M", label: "M", price: 8 },
    { key: "L", label: "L", price: 10 },
  ],
},
{
  id: 11,
  name: "Café Mocha",
  category: "Moka & Chocolat",
  image: "/images/hero1.png",
  sizes: [
    { key: "S", label: "S", price: 7 },
    { key: "M", label: "M", price: 8.5 },
    { key: "L", label: "L", price: 10 },
  ],
},
{
  id: 12,
  name: "White Mocha",
  category: "Moka & Chocolat",
  image: "/images/hero1.png",
  sizes: [
    { key: "S", label: "S", price: 7.5 },
    { key: "M", label: "M", price: 9 },
  ],
},
{
  id: 13,
  name: "Choco Latte",
  category: "Moka & Chocolat",
  image: "/images/hero1.png",
  sizes: [
    { key: "S", label: "S", price: 7 },
    { key: "M", label: "M", price: 8 },
    { key: "L", label: "L", price: 9.5 },
  ],
},
{
  id: 14,
  name: "Vanilla Latte",
  category: "Aromatisés",
  image: "/images/hero1.png",
  sizes: [
    { key: "S", label: "S", price: 7 },
    { key: "M", label: "M", price: 8.5 },
  ],
},
{
  id: 15,
  name: "Caramel Latte",
  category: "Aromatisés",
  image: "/images/hero1.png",
  sizes: [
    { key: "S", label: "S", price: 7 },
    { key: "M", label: "M", price: 8.5 },
    { key: "L", label: "L", price: 10 },
  ],
},
{
  id: 16,
  name: "Hazelnut Latte",
  category: "Aromatisés",
  image: "/images/hero1.png",
  sizes: [
    { key: "S", label: "S", price: 7 },
    { key: "M", label: "M", price: 8 },
  ],
},
{
  id: 17,
  name: "Coconut Latte",
  category: "Aromatisés",
  image: "/images/hero1.png",
  sizes: [
    { key: "M", label: "M", price: 8.5 },
    { key: "L", label: "L", price: 10 },
  ],
},
{
  id: 18,
  name: "Signature House",
  category: "Signatures",
  image: "/images/hero1.png",
  sizes: [
    { key: "S", label: "S", price: 9 },
    { key: "M", label: "M", price: 10.5 },
  ],
},
{
  id: 19,
  name: "Caramel Dream",
  category: "Signatures",
  image: "/images/hero1.png",
  sizes: [
    { key: "M", label: "M", price: 10 },
    { key: "L", label: "L", price: 12 },
  ],
},
{
  id: 20,
  name: "Royal Latte",
  category: "Signatures",
  image: "/images/hero1.png",
  sizes: [
    { key: "M", label: "M", price: 10 },
    { key: "L", label: "L", price: 12 },
  ],
},
{
  id: 21,
  name: "Decaf Espresso",
  category: "Décaféiné",
  image: "/images/hero1.png",
  sizes: [
    { key: "S", label: "S", price: 4.5 },
    { key: "M", label: "M", price: 5.5 },
  ],
},
{
  id: 22,
  name: "Decaf Latte",
  category: "Décaféiné",
  image: "/images/hero1.png",
  sizes: [
    { key: "S", label: "S", price: 6 },
    { key: "M", label: "M", price: 7.5 },
  ],
},
{
  id: 23,
  name: "Decaf Cappuccino",
  category: "Décaféiné",
  image: "/images/hero1.png",
  sizes: [
    { key: "S", label: "S", price: 6 },
    { key: "M", label: "M", price: 7 },
  ],
},
];

export function GET() {
  return NextResponse.json(coffees);
}
