export interface InstagramPost {
  imagePath: string;
  url: string;
  alt: string;
}

const PROFILE_URL = "https://instagram.com/anara.geladoartesanal";

export const instagramPosts: InstagramPost[] = [
  {
    imagePath: "/assets/images/Instagram-Baunilha com calda de Abrunho.webp",
    url: PROFILE_URL,
    alt: "Baunilha com calda de Abrunho",
  },
  {
    imagePath: "/assets/images/Instagram-Bolo de Cenoura.webp",
    url: PROFILE_URL,
    alt: "Bolo de Cenoura",
  },
  {
    imagePath: "/assets/images/Instagram-Cereja do Fundão.jpg",
    url: PROFILE_URL,
    alt: "Cereja do Fundão",
  },
  {
    imagePath: "/assets/images/Instagram-Chocolate Masala com Laranja do Alg..jpg",
    url: PROFILE_URL,
    alt: "Chocolate Masala com Laranja do Algarve",
  },
  {
    imagePath: "/assets/images/Instagram-Doce de Leite Argentino c -Amendoas.jpg",
    url: PROFILE_URL,
    alt: "Doce de Leite Argentino com Amêndoas",
  },
  {
    imagePath: "/assets/images/Instagram-Manga com Coentros.webp",
    url: PROFILE_URL,
    alt: "Manga com Coentros",
  },
  {
    imagePath: "/assets/images/Instagram-Morango Natas com calda Morango.webp",
    url: PROFILE_URL,
    alt: "Morango Natas com calda de Morango",
  },
  {
    imagePath: "/assets/images/Instagram-Pastel de Nata.jpg",
    url: PROFILE_URL,
    alt: "Pastel de Nata",
  },
];
