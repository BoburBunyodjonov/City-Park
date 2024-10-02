import { debounce } from "lodash";
import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getApartments } from "../../../firebase/firebaseUtils";

export type ApartmentType = "business_center" | "beach" | "standard";

const apartmentTypes: ApartmentType[] = [
  "business_center",
  "beach",
  "standard",
];

export interface DataType {
  id: number | string;
  title_uz: string;
  title_ru: string;
  title_tr: string;
  title_ae: string;
  img1: File | null;
  img2: File | null;
  img3: File | null;
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

const Context = () => {
  const [rangeValues, setRangeValues] = useState<number[]>([0, 200000]);
  const [room, setRoom] = useState<number>(2);
  const [type, setType] = useState<ApartmentType>(apartmentTypes[2]);
  const [data, setData] = useState<DataType[]>([]);

  const handleRangeChange = (values: number[]) => {
    setRangeValues(values);
  };

  const fetchData = debounce(async () => {
    try {
      const apartments = await getApartments({
        price: rangeValues,
        room,
        type,
      });
      setData(apartments);
    } catch (error) {
      console.error("Error fetching apartments data:", error);
    }
  }, 300);

  useEffect(() => {}, [rangeValues, room, type]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    state: { data, rangeValues, room, type, apartmentTypes },
    actions: { handleRangeChange, setRoom, setType },
  };
};

const HomeContext = createContext<any>({ state: {}, actions: {} });

export const HomeContextProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = Context();
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export default function useHomeContext() {
  return useContext<ReturnType<typeof Context>>(HomeContext);
}
