export interface Review {
  name: string;
  text: string;
  location: "costa" | "hq";
}

/** Four hand-picked English reviews shown when locale = 'en'. */
export const reviewsEn: Review[] = [
  {
    name: "René Pfitzner",
    text: "I'd go so far to say that this is the best gelado in all of Greater Lisbon area. A must go for locals on that side of the bridge, and even worth a trip from the city. What makes this to rank at the very top of creameries is the purity, almost old-school-ness, of the product: no extra coloring, no weird flavors, not too sweet or heavy — just the best ingredients and true craftsmanship, creating a perfect balance.",
    location: "hq",
  },
  {
    name: "Carolina Mello",
    text: "If you are in Caparica or Charneca, you MUST try this ice cream. This is real food! Fresh and tasty ingredients, for sure the best quality in Portugal!",
    location: "costa",
  },
  {
    name: "Rita Moreira",
    text: "Spectacular! One of the best ice creams we've ever had! Super creamy and delicious! I loved it. 5-star service!",
    location: "hq",
  },
  {
    name: "Kristine Joy Martin",
    text: "Simply the best Gelado in Caparica! Highly recommend pistachio and Belgian chocolate.",
    location: "costa",
  },
];

/** Four hand-picked Portuguese reviews shown when locale = 'pt'. */
export const reviewsPt: Review[] = [
  {
    name: "Rita Moreira",
    text: "Espectacular! Dos melhores gelados que já comemos! Super cremosos, saborosos! Adorei. Atendimento 5⭐️",
    location: "hq",
  },
  {
    name: "Sandra Branco",
    text: "Espetacular , os gelados são os melhores, ótimo atendimento e uma variedade de sabores enorme ❤️",
    location: "hq",
  },
  {
    name: "Lucas Carneiro",
    text: "A gelateria é pequena e bem modesta internamente, começaram a pouco tempo. Mas o gelado é davvero italiano. Vivi na Itália no tempo de universidade e posso dizer que este gelado é melhor que muitos que já provei por lá.",
    location: "hq",
  },
  {
    name: "Aida Silva",
    text: "Melhor gelado da margem sul e arredores. Gelado artesanal com produtos de qualidade e sabores inconfundíveis. Não é preciso ir a Itália para se deliciar com o melhor gelado italiano. Maravilhoso!!!😋",
    location: "costa",
  },
];
