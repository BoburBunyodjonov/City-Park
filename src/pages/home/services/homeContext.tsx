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
import { firestore } from "../../../firebase/firebaseConfig";
import useLayoutContext from "../../../layout/services/layoutContext";

export type ApartmentType = "business_center" | "beach" | "standard" | "All";


const apartmentTypes: ApartmentType[] = [
  "business_center",
  "beach",
  "standard",
];

interface Slide {
  id: string;
  url: string;
}

const Context = () => {
  const [slides, setSlides] = useState<Slide[]>([]);

  const [rangeValues, setRangeValues] = useState<number[]>([0, 200000]);
  const [room, setRoom] = useState<number | "All">("All");
  const [type, setType] = useState<ApartmentType | "All">("All");
  const [data, setData] = useState<DataType[]>([]);

  const [reviews, setReviews] = useState<
    { src: string; title: string; comment: string }[]
  >([]);

  const {
    actions: { setLoading },
  } = useLayoutContext();

  const handleRangeChange = (values: number[]) => {
    setRangeValues(values);
  };

  const fetchApartments = debounce(async () => {
    try {
      const apartments = await getApartments({
        price: rangeValues,
        room: room === "All" ? 0 : room, 
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

  const fetchBanner = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "banners"));
      const fetchedSlides: Slide[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        url: doc.data().url,
      }));
      setSlides(fetchedSlides);
    } catch (error) {
      console.error("Error fetching images: ", error);
    }
  };

  useEffect(() => {}, [rangeValues, room, type]);

  const fetchAll = async () => {
    setLoading(true);
    await fetchBanner();
    await fetchApartments();
    await fetchReviews();
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return {
    state: { data, rangeValues, room, type, apartmentTypes, reviews, slides },
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
