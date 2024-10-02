import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import useLayoutContext from "../services/layoutContext";
import Loading from "../../components/loading/Loading";
import { useEffect } from "react";

const RootLayout = () => {
  const {
    state: { loading },
  } = useLayoutContext();

  useEffect(() => {
    if (loading === false) {
      window.scrollTo({ top: 0 });
    }
  }, [loading]);

  return (
    <>
      {loading && <Loading />}
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
