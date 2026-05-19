import type { ApiProduct } from "./api";

// Demo products shown only while real product count < 7.
// Local images live under /images (relative paths so it works on GitHub Pages).
export const DEMO_PRODUCTS: ApiProduct[] = [
  {
    id: "demo-1",
    name: "Radiance Renewal Cream",
    price: 12500,
    image: "images/demo1.jpg",
    description: "Rich nourishing cream for a luminous, soft complexion.",
  },
  {
    id: "demo-2",
    name: "Glow Drops Vitamin C Serum",
    price: 9800,
    image: "images/demo2.jpg",
    description: "Brightening serum that evens tone and revives dull skin.",
  },
  {
    id: "demo-3",
    name: "Velvet Matte Lipstick — Rouge",
    price: 4500,
    image: "images/demo3.jpg",
    description: "Long-wear creamy matte lipstick in a signature rouge.",
  },
  {
    id: "demo-4",
    name: "Gentle Daily Cleanser",
    price: 7200,
    image: "images/demo4.jpg",
    description: "Sulfate-free pump cleanser for soft, balanced skin.",
  },
  {
    id: "demo-5",
    name: "Silk Body Glow Oil",
    price: 8900,
    image: "images/demo5.jpg",
    description: "Lightweight body oil for a satin-smooth, glowing finish.",
  },
];
