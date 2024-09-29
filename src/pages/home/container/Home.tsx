import { About, Contact } from "../../../components"
import Ipoteka from "../../../components/ipoteka/Ipoteka"
import CardList from "../components/CardList"
import Carousel from "../components/Carusel"

const Home = () => {
  return (
    <>
        <Carousel/>
        <CardList/>
        <Ipoteka/>
        <About/>
        <Contact/>
    </>
  )
}

export default Home