export interface DataType {
  id: number | string;
  title_uz: string;
  title_ru: string;
  title_tr: string;
  title_ae: string;
  img1: string | null;
  img2: string | null;
  img3: string | null;
  price: string;
  description_uz: string;
  description_ru: string;
  description_tr: string;
  description_ae: string;
  rooms: string;
  location_uz: string;
  location_ru: string;
  location_tr: string;
  location_ae: string;
  type: "business_center" | "beach" | "standard";
  mortgage: boolean;
  area: string;
  furniture: boolean;
  repair: boolean;
  parking: boolean;
  floor: number;
}
