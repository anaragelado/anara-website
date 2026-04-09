export interface Review {
  name: string;
  text: string;
  location: "costa" | "hq";
}

export const reviews: Review[] = [
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
