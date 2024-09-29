import { About, Contact, Ipoteka } from "../../../components"
import CardList from "../components/CardList"
import CaruselComp from "../components/Carusel"
import CustomerComment from "../components/customerComment"

const Home = () => {
  return (
    <>
        <CaruselComp/>
        <CardList/>
        <Ipoteka/>
        <CustomerComment/>
        <About/>
        <Contact/>

        
    </>
  )
}

export default Home