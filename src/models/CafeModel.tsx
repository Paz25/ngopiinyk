import { CategoryModel } from "./CategoryModel";

export type CafeImageModel = {
  id: number;
  image_path: string;
  caption: string | null;
};

export type CafeModel = {
  id: number;
  name: string;
  description: string | null;
  area: string;
  address: string;
  gmaps_link: string;
  rating: number | null;
  review_count: number;
  opening_hours: Record<string, { open: string; close: string }> | null;
  categories: Pick<CategoryModel, "id" | "name">[];
  images: CafeImageModel[];
};

export type CafeCardModel = Pick<
  CafeModel,
  "id" | "name" | "area" | "rating"
> & {
  image: string | null;
};

export type CafeDetailModel = CafeModel;
