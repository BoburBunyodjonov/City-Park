import { debounce } from "lodash";
import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getApartments } from "../../../firebase/firebaseUtils";
import { DataType } from "../../../constants/data";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export type ApartmentType = "business_center" | "beach" | "standard";

const apartmentTypes: ApartmentType[] = [
  "business_center",
  "beach",
  "standard",
];

const Context = () => {
  const [rangeValues, setRangeValues] = useState<number[]>([0, 200000]);
  const [room, setRoom] = useState<number>(2);
  const [type, setType] = useState<ApartmentType>(apartmentTypes[2]);
  const [data, setData] = useState<DataType[]>([]);

  const [reviews, setReviews] = useState<
    { src: string; title: string; comment: string }[]
  >([]);

  const handleRangeChange = (values: number[]) => {
    setRangeValues(values);
  };

  const fetchApartments = debounce(async () => {
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

  const fetchReviews = async () => {
    const db = getFirestore();
    const videoCollection = collection(db, "videos");

    try {
      const videoSnapshot = await getDocs(videoCollection);
      const videoList = videoSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          src: data.url,
          title: data.title,
          comment: data.comment,
        };
      });
      setReviews(videoList);
    } catch (error) {
      console.error("Failed to fetch video data:", error);
    }
  };

  useEffect(() => {}, [rangeValues, room, type]);

  useEffect(() => {
    fetchApartments();
    fetchReviews();
  }, []);

  return {
    state: { data, rangeValues, room, type, apartmentTypes, reviews },
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
