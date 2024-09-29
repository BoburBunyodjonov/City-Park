import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import RootLayout from "./layout/rootLayout.tsx";
import Home from "./pages/home/container/Home.tsx";
import { useTranslation } from 'react-i18next';
import { loadTranslations } from './i18n/i18next.ts';
import { useEffect } from "react";

const App = () => {
  const { i18n } = useTranslation();

  // Til o'zgartirilganda tarjimalarni yuklash
  useEffect(() => {
    const loadTranslationsAsync = async () => {
      await loadTranslations(i18n.language);
    };

    loadTranslationsAsync();
  }, [i18n.language]);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={""} />
        <Route path="/contact" element={""} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
