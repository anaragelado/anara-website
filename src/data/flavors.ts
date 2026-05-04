export interface Flavor {
  id: string;
  image: string;
  imageAlt: string;
  vegan: boolean;
  isSpecial?: boolean;
  placeholder?: boolean;
}

export const flavors: Flavor[] = [
  {
    id: "belgian-chocolate",
    image: "/assets/images/cone-belgian-chocolate-v1.webp",
    imageAlt: "Gelado artesanal de chocolate belga",
    vegan: true,
  },
  {
    id: "strawberry",
    image: "/assets/images/cone-strawberry-v4.jpg",
    imageAlt: "Gelado artesanal de morango",
    vegan: true,
  },
  {
    id: "salted-pistachio",
    image: "/assets/images/cone-salted-pistachio-v1.webp",
    imageAlt: "Gelado artesanal de pistáchio salgado",
    vegan: true,
  },
  {
    id: "peanut-chocolate",
    image: "/assets/images/cone-peanut-with-chocolate-chunks-v1.webp",
    imageAlt: "Gelado artesanal de amendoim com pedaços de chocolate",
    vegan: true,
  },
  {
    id: "hazelnut-piemont",
    image: "/assets/images/cone-hazelnut-piemont-v1.webp",
    imageAlt: "Gelado artesanal de avelã do Piemonte",
    vegan: false,
  },
  {
    id: "watermelon",
    image: "/assets/images/cone-watermelon-v1.webp",
    imageAlt: "Gelado artesanal de melancia",
    vegan: true,
  },
  {
    id: "mango",
    image: "/assets/images/cone-mango-v2.webp",
    imageAlt: "Gelado artesanal de manga",
    vegan: true,
  },
  {
    id: "coconut",
    image: "/assets/images/cone-coconut-v1.webp",
    imageAlt: "Gelado artesanal de coco",
    vegan: false,
  },
  {
    id: "raspberry",
    image: "/assets/images/cone-raspberry-v4.jpg",
    imageAlt: "Gelado artesanal de framboesa",
    vegan: true,
  },
  {
    id: "coffee",
    image: "/assets/images/cone-coffee-v1.webp",
    imageAlt: "Gelado artesanal de café",
    vegan: false,
  },
  {
    id: "pineapple",
    image: "/assets/images/cone-pineapple-v1.webp",
    imageAlt: "Gelado artesanal de ananás",
    vegan: true,
  },
  {
    id: "belgian-chocolate-algarve-orange",
    image: "/assets/images/cone-belgian-chocolate-with-algarve-orange-v2.webp",
    imageAlt: "Gelado artesanal de chocolate belga com laranja do Algarve",
    vegan: true,
  },
  {
    id: "madeira-banana",
    image: "/assets/images/cone-banana-da-madeira-v1.jpg",
    imageAlt: "Gelado artesanal de banana da Madeira",
    vegan: true,
  },
  {
    id: "lemon",
    image: "/assets/images/cone-lemon-v1.jpg",
    imageAlt: "Gelado artesanal de limão",
    vegan: true,
  },
  {
    id: "cinnamon",
    image: "/assets/images/cone-cinnamon-v1.webp",
    imageAlt: "Gelado artesanal de canela",
    vegan: false,
  },
  {
    id: "baunilha-bourbon-madagascar",
    image: "/assets/images/cone-baunilha-bourbon-madagascar-v1.webp",
    imageAlt: "Gelado artesanal de baunilha bourbon de Madagáscar",
    vegan: false,
  },
  {
    id: "algarve-orange",
    image: "/assets/images/cone-algarve-orange-v1.webp",
    imageAlt: "Gelado artesanal de laranja do Algarve",
    vegan: true,
  },
  {
    id: "salted-caramel",
    image: "/assets/images/cone-salted-caramel-v1.jpg",
    imageAlt: "Gelado artesanal de caramelo salgado",
    vegan: false,
  },
  {
    id: "doce-de-leite",
    image: "/assets/images/cone-doce-de-leite-argentino-v1.webp",
    imageAlt: "Gelado artesanal de doce de leite argentino",
    vegan: false,
  },
  {
    id: "melon",
    image: "/assets/images/cone-meloa-v1.webp",
    imageAlt: "Gelado artesanal de meloa",
    vegan: true,
  },
  {
    id: "natas",
    image: "/assets/images/cone-natas-v1.webp",
    imageAlt: "Gelado artesanal de natas fior di latte",
    vegan: false,
  },
  {
    id: "oreo",
    image: "/assets/images/cone-oreo-v1.webp",
    imageAlt: "Gelado artesanal de Oreo",
    vegan: false,
  },
];
