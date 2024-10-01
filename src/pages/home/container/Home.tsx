import { About, Contact, Mortgage } from "../../../components";
import CardList from "../components/CardList";
import Carousel from "../components/Carousel";
import CustomerComment from "../components/customerComment";

const Home = () => {
  return (
    <>
      <Carousel />
      <CardList />
      <Mortgage />
      <CustomerComment />
      <About />
      <Contact />
    </>
  );
};

export default Home;
