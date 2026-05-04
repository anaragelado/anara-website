export interface Creation {
  key: string;
  image: string;
  vegan: boolean;
  glutenFree: boolean;
}

export const creations: Creation[] = [
  {
    key: "pastel-de-nata",
    image: "/assets/images/cone-pastel-de-nata-v1.jpg",
    vegan: false,
    glutenFree: true,
  },
  {
    key: "morango-natas",
    image: "/assets/images/cone-morango-natas-com-calda-de-morango-v1.webp",
    vegan: false,
    glutenFree: true,
  },
  {
    key: "carrot-cake",
    image: "/assets/images/cone-carrot-cake-v1.webp",
    vegan: false,
    glutenFree: true,
  },
  {
    key: "madagascan-vanilla",
    image: "/assets/images/cone-madagascan-vanilla-with-damson-swirl-v3.jpg",
    vegan: false,
    glutenFree: true,
  },
];
