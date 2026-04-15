export interface Flavor {
  id: string;
  image: string;
  imageAlt: string;
  vegan: boolean;
  isSpecial?: boolean;
}

export const flavors: Flavor[] = [
  {
    id: "belgian-chocolate",
    image: "/assets/images/cone-belgian-chocolate-v3.webp",
    imageAlt: "Gelado artesanal de chocolate belga",
    vegan: false,
  },
  {
    id: "salted-pistachio",
    image: "/assets/images/cone-no-v29.webp",
    imageAlt: "Gelado artesanal de pistáchio salgado",
    vegan: false,
  },
  {
    id: "strawberry",
    image: "/assets/images/cone-morango-natas-com-calda-de-morango-v1.webp",
    imageAlt: "Gelado artesanal de morango",
    vegan: true,
  },
  {
    id: "mango",
    image: "/assets/images/cone-no-v27.webp",
    imageAlt: "Gelado artesanal de manga",
    vegan: true,
    isSpecial: true,
  },
  {
    id: "vanilla-bourbon",
    image: "/assets/images/cone-natas-v3.webp",
    imageAlt: "Gelado artesanal de baunilha bourbon",
    vegan: false,
  },
  {
    id: "pastel-de-nata",
    image: "/assets/images/cone-didnt-i-sent-you-one-without-text-v1.webp",
    imageAlt: "Gelado artesanal de pastel de nata",
    vegan: false,
    isSpecial: true,
  },
  {
    id: "lemon",
    image: "/assets/images/cone-no-v6.webp",
    imageAlt: "Gelado artesanal de limão",
    vegan: true,
  },
  {
    id: "cookies-cream",
    image: "/assets/images/cone-no-v14.webp",
    imageAlt: "Gelado artesanal de cookies and cream",
    vegan: false,
  },
  {
    id: "matcha",
    image: "/assets/images/cone-no-v16.webp",
    imageAlt: "Gelado artesanal de matcha",
    vegan: true,
  },
  {
    id: "dark-chocolate",
    image: "/assets/images/cone-belgian-chocolate-with-algarve-orange-v1.webp",
    imageAlt: "Gelado artesanal de chocolate negro",
    vegan: true,
  },
  {
    id: "coconut",
    image: "/assets/images/cone-no-v23.webp",
    imageAlt: "Gelado artesanal de coco",
    vegan: true,
  },
  {
    id: "watermelon",
    image: "/assets/images/cone-watermelon-v1.webp",
    imageAlt: "Gelado artesanal de melancia",
    vegan: true,
  },
];
