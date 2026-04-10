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
    image: "/assets/images/product-single-scoop-dark-chocolate-gelato-closeup.jpg",
    imageAlt: "Gelado artesanal de chocolate belga",
    vegan: false,
  },
  {
    id: "salted-pistachio",
    image: "/assets/images/promo-card-salted-pistachio-gelato-single-scoop.webp",
    imageAlt: "Gelado artesanal de pistáchio salgado",
    vegan: false,
  },
  {
    id: "strawberry",
    image: "/assets/images/product-single-scoop-strawberry-gelato-hero.jpg",
    imageAlt: "Gelado artesanal de morango",
    vegan: true,
  },
  {
    id: "mango",
    image: "/assets/images/promo-card-mascarpone-mango-passionfruit-gelato.webp",
    imageAlt: "Gelado artesanal de manga",
    vegan: true,
    isSpecial: true,
  },
  {
    id: "vanilla-bourbon",
    image: "/assets/images/product-single-scoop-vanilla-cream-gelato-studio.jpg",
    imageAlt: "Gelado artesanal de baunilha bourbon",
    vegan: false,
  },
  {
    id: "pastel-de-nata",
    image: "/assets/images/promo-card-pastel-de-nata-gelato-single-scoop.webp",
    imageAlt: "Gelado artesanal de pastel de nata",
    vegan: false,
    isSpecial: true,
  },
  {
    id: "lemon",
    image: "/assets/images/ice-cream-cone-lemon-brown-background.jpeg",
    imageAlt: "Gelado artesanal de limão",
    vegan: true,
  },
  {
    id: "cookies-cream",
    image: "/assets/images/product-single-scoop-cookies-cream-gelato-closeup.jpg",
    imageAlt: "Gelado artesanal de cookies and cream",
    vegan: false,
  },
  {
    id: "matcha",
    image: "/assets/images/product-single-scoop-matcha-green-gelato-closeup.jpg",
    imageAlt: "Gelado artesanal de matcha",
    vegan: true,
  },
  {
    id: "dark-chocolate",
    image: "/assets/images/product-single-scoop-dark-chocolate-gelato-v1.jpg",
    imageAlt: "Gelado artesanal de chocolate negro",
    vegan: true,
  },
  {
    id: "coconut",
    image: "/assets/images/promo-card-chocolate-orange-coconut-gelato-double-scoop.webp",
    imageAlt: "Gelado artesanal de coco",
    vegan: true,
  },
  {
    id: "watermelon",
    image: "/assets/images/promo-card-watermelon-gelato-single-scoop-v1.webp",
    imageAlt: "Gelado artesanal de melancia",
    vegan: true,
  },
];
