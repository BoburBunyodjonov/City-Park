import { About, Contact } from "../../../components"
import Ipoteka from "../../../components/ipoteka/Ipoteka"
import CardList from "../components/CardList"
import Carousel from "../components/Carusel"
import CustomerComment from "../components/customerComment"

const Home = () => {
  return (
    <>
        <Carousel/>
        <CardList/>
        <Ipoteka/>
        <CustomerComment/>
        <About/>
        <Contact/>
    </>
  )
}

export default Home