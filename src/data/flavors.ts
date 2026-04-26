export interface Flavor {
  id: string;
  image: string;
  imageAlt: string;
  vegan: boolean;
  isSpecial?: boolean;
}

export const flavors: Flavor[] = [
  {
    id: "salted-pistachio",
    image: "/assets/images/cone-salted-pistachio-v1.webp",
    imageAlt: "Gelado artesanal de pistáchio salgado",
    vegan: false,
  },
  {
    id: "mango",
    image: "/assets/images/cone-mango-v2.webp",
    imageAlt: "Gelado artesanal de manga",
    vegan: true,
  },
  {
    id: "natas",
    image: "/assets/images/cone-natas-v1.webp",
    imageAlt: "Gelado artesanal de natas",
    vegan: false,
  },
  {
    id: "strawberry",
    image: "/assets/images/cone-strawberry-v2.webp",
    imageAlt: "Gelado artesanal de morango",
    vegan: true,
  },
  {
    id: "hazelnut-piemont",
    image: "/assets/images/cone-hazelnut-piemont-v1.webp",
    imageAlt: "Gelado artesanal de avelã do Piemonte",
    vegan: false,
  },
  {
    id: "pineapple",
    image: "/assets/images/cone-pineapple-v1.webp",
    imageAlt: "Gelado artesanal de ananás",
    vegan: true,
  },
  {
    id: "oreo",
    image: "/assets/images/cone-oreo-v1.webp",
    imageAlt: "Gelado artesanal de Oreo",
    vegan: false,
  },
  {
    id: "raspberry",
    image: "/assets/images/cone-raspberry-v2.webp",
    imageAlt: "Gelado artesanal de framboesa",
    vegan: true,
  },
  {
    id: "morango-natas",
    image: "/assets/images/cone-morango-natas-com-calda-de-morango-v1.webp",
    imageAlt: "Gelado artesanal de morango natas com calda de morango",
    vegan: false,
  },
  {
    id: "peanut-chocolate",
    image: "/assets/images/cone-peanut-with-chocolate-chunks-v1.webp",
    imageAlt: "Gelado artesanal de amendoim com pedaços de chocolate",
    vegan: true,
  },
  {
    id: "doce-de-leite",
    image: "/assets/images/cone-doce-de-leite-argentino-v1.webp",
    imageAlt: "Gelado artesanal de doce de leite argentino",
    vegan: false,
  },
  {
    id: "watermelon",
    image: "/assets/images/cone-watermelon-v1.webp",
    imageAlt: "Gelado artesanal de melancia",
    vegan: true,
  },
];
