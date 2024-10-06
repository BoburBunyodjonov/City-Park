export interface DataType {
  id?: string;
  title_uz: string;
  title_ru: string;
  title_tr: string;
  title_ae: string;
  img1: any;
  img2: any;
  img3: any;
  price: number;
  description_uz: string;
  description_ru: string;
  description_tr: string;
  description_ae: string;
  rooms: number;
  location_uz: string;
  location_ru: string;
  location_tr: string;
  location_ae: string;
  type: "business_center" | "beach" | "standard";
  mortgage: boolean;
  area: number;
  furniture: boolean;
  repair: boolean;
  parking: boolean;
  floor: number;
  catalog_file: any;
}
