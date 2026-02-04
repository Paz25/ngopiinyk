export type CafeModel = {
  id: string;
  name: string;
  area: string;
  address: string;
  bestCategory?: "WFC" | "Hangout" | "Outdoor" | "Night" | "Tourism";
  image: string;
  rating: number;
  reviewCount: number;
};
