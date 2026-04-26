export interface Review {
  name: string;
  text: string;
  location: "costa" | "hq";
}

/** Four reviews (IDs 19-22) shown when locale = 'en'. */
export const reviewsEn: Review[] = [
  {
    name: "João Augusto",
    text: "As a true gelato connoisseur, I can say that Anara's gelatos are 5 stars — 100% artisanal, perfect consistency, and wonderful flavours. I've visited the shop several times and have always been pleasantly surprised. This time I tried the Tiramisù al Limone… and I can only say it is INCREDIBLE! I highly recommend everyone visit this place — you won't regret it.",
    location: "hq",
  },
  {
    name: "Bénédicte Huré",
    text: "Incredible artisanal ice cream. The flavours are just amazing, ice cream are made with fresh product. Now in the top of my favorite place.",
    location: "costa",
  },
  {
    name: "Josien Nation - Galama",
    text: "This is not your standard gelado place! Incredibly good flavours and even sugar-free ice cream available. I would give more stars if I could :)",
    location: "costa",
  },
  {
    name: "Iris KdR",
    text: "Best icecream in the region! Very good texture and flavours made only from natural ingredients! Must go after a nice walk in Costa de Caparica! The salted pistachio ice cream is just the best! We also love the fruity flavours! We really like that the icecream is not too sweet.",
    location: "costa",
  },
];

/** Four reviews (IDs 19-22) shown when locale = 'pt'. */
export const reviewsPt: Review[] = [
  {
    name: "João Augusto",
    text: "Como um verdadeiro apreciador de gelados, tenho a dizer que os gelados da Anara são 5 estrelas, 100% artesanais, consistência perfeita, e sabores maravilhosos. Já vim à loja várias vezes e fiquei sempre surpreendido pela positiva. Desta vez provei o sabor de Tiramisù al Limone… e apenas tenho a dizer que é INCRÍVEL! Recomendo todos a frequentarem este local — não se vão arrepender.",
    location: "hq",
  },
  {
    name: "Bénédicte Huré",
    text: "Incredible artisanal ice cream. The flavours are just amazing, ice cream are made with fresh product. Now in the top of my favorite place.",
    location: "costa",
  },
  {
    name: "Josien Nation - Galama",
    text: "This is not your standard gelado place! Incredibly good flavours and even sugar-free ice cream available. I would give more stars if I could :)",
    location: "costa",
  },
  {
    name: "Iris KdR",
    text: "Best icecream in the region! Very good texture and flavours made only from natural ingredients! Must go after a nice walk in Costa de Caparica! The salted pistachio ice cream is just the best! We also love the fruity flavours! We really like that the icecream is not too sweet.",
    location: "costa",
  },
];

