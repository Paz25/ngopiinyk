import { CategoryModel } from "./CategoryModel";

export interface FacilityModel {
  id: number;
  name: string;
  icon: string;
}

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
  opening_hours: Record<
    string,
    {
      open: string;
      close: string;
      is_24h: boolean;
      is_closed: boolean;
    }
  >;
  categories: Pick<CategoryModel, "id" | "name">[];
  facilities: FacilityModel[];
  images: CafeImageModel[];
};

export type CafeCardModel = Pick<
  CafeModel,
  "id" | "name" | "area" | "rating"
> & {
  image: string | null;
};

export type CafeDetailModel = CafeModel;
