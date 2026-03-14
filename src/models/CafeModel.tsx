import { CategoryModel } from "./CategoryModel";
import { CafeMenuModel } from "./CafeMenuModel";

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
  latitude: number;
  longitude: number;
  categories: CategoryModel[];
  facilities: FacilityModel[];
  menus: CafeMenuModel[];
  images: CafeImageModel[];
};

export type CafeCardModel = Pick<
  CafeModel,
  "id" | "name" | "area" | "rating"
> & {
  image: string | null;
};

export type CafeDetailModel = CafeModel;
