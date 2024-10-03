import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getApartments } from "../../../firebase/firebaseUtils";
import { DataType } from "../../../constants/data";
import { useParams } from "react-router-dom";
import useLayoutContext from "../../../layout/services/layoutContext";

const Context = () => {
  const { id } = useParams<{ id: string }>();
  const [apartments, setApartments] = useState<DataType[]>();

  const {
    actions: { setLoading },
  } = useLayoutContext();

  const selectedApartment = useMemo(() => {
    if (apartments?.length) {
      return apartments?.find((apartment) => apartment.id === id);
    }
  }, [apartments]);

  const fetchApartments = async () => {
    try {
      setLoading(true);
      const apartments = await getApartments();
      setApartments(apartments);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error("Error fetching apartments data:", error);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  return {
    state: { selectedApartment, apartments },
    actions: {},
  };
};

const DetailsContext = createContext<any>({ state: {}, actions: {} });

export const DetailsContextProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = Context();
  return (
    <DetailsContext.Provider value={value}>{children}</DetailsContext.Provider>
  );
};

export default function useDetailsContext() {
  return useContext<ReturnType<typeof Context>>(DetailsContext);
}
