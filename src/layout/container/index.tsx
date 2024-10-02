import RootLayout from "./rootLayout";
import { LayoutContextProvider } from "../services/layoutContext";

const index = () => {
  return (
    <LayoutContextProvider>
      <RootLayout />
    </LayoutContextProvider>
  );
};

export default index;
