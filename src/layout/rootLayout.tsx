import { Outlet } from "react-router-dom"
import { Footer, Navbar } from "../components"




const RootLayout = () => {
  return (
    <>
        <Navbar/>
        <div className="container mx-auto">
          <Outlet />
        </div>
        <Footer/>
    </>
  )
}

export default RootLayout 
