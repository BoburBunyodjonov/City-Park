export interface DataType {
  id?: number | string;
  title_uz?: string;
  title_ru?: string;
  title_tr?: string;
  title?: string;
  img1: string | null; 
  img2: string | null; 
  img3: string | null;
  price?: string;
  description?: string;
  images?: string[];
  rooms?: string;
  location?: string;
  type?: string;
  ipoteka?: string;
  area?: string;
  furniture?: string;
  repair?: string;
  parking?: string;
  currency?: string;
  floor?: string;
  onCardClick?: () => void;
}

export const data: DataType[] = [
  {
    id: 1,
    title: "Bu birinchi uy",
    price: "200000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisLorem ipsum dolor sit amet, consectetur adipisLorem ipsum dolor sit amet, consectetur adipis",
    images: ["", "", ""],
    img1: null,
    img2: null,
    img3: null,
    rooms: "2+1",
    location: "O'zbeksiton, Toshkent City",
    type: "Turar joy majmuasi",
    ipoteka: "Mavjud",
    area: "70",
    furniture: "Mavjud",
    repair: "Mavjud",
    parking: "Mavjud",
    currency: "$",
    floor: "5-qavat",
  },
  {
    id: 2,
    title: "Bu ikkinchi uy",
    price: "150000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisLorem ipsum dolor sit amet, consectetur adipisLorem ipsum dolor sit amet, consectetur adipis",
    images: ["", "", ""],
    img1: null,
    img2: null,
    img3: null,
    rooms: "2+1",
    location: "O'zbeksiton, Namangan City",
    type: "Turar joy majmuasi",
    ipoteka: "Mavjud",
    area: "75",
    furniture: "Mavjud",
    repair: "Mavjud",
    parking: "Mavjud",
    currency: "$",
    floor: "3-qavat",
  },
  {
    id: 3,
    title: "Bu uchinchi uy",
    price: "180000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisLorem ipsum dolor sit amet, consectetur adipisLorem ipsum dolor sit amet, consectetur adipis",
    images: ["", "", ""],
    img1: null,
    img2: null,
    img3: null,
    rooms: "2+1",
    location: "O'zbeksiton, Samarqand City",
    type: "Turar joy majmuasi",
    ipoteka: "Mavjud",
    area: "75",
    furniture: "Mavjud",
    repair: "Mavjud",
    parking: "Mavjud",
    currency: "$",
    floor: "3-qavat",
  },
];
