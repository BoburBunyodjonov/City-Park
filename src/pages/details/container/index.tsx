import { DetailsContextProvider } from "../services/detailsContext";
import Details from "./Details";

const index = () => {
  return (
    <DetailsContextProvider>
      <Details />
    </DetailsContextProvider>
  );
};

export default index;
