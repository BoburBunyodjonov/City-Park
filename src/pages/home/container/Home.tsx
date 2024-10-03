import { About, Contact, Mortgage } from "../../../components";
import CardList from "../components/CardList";
import Carousel from "../components/Carousel";
import Reviews from "../components/Reviews";

const Home = () => {
  return (
    <>
      <Carousel />
      <CardList />
      <Mortgage />
      <Reviews />
      <About />
      <Contact />
    </>
  );
};

export default Home;
