import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"


import RootLayout from "./layout/rootLayout.tsx"
import Home from "./pages/home/container/Home.tsx"


const App = () => {

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={""} />
        <Route path="/contact" element={""} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App