import { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import { MenuNavLink } from "./navbar.constants";
import { Link } from "react-scroll";
import "./style.css";
import { NavLink } from "react-router-dom";
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Close, Menu, Phone } from "@mui/icons-material";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          currentSection = section.getAttribute("id") || "";
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function: menyu yopilganda scrollni tiklash
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const changeLanguage = (e: SelectChangeEvent<string>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <header className="text-gray-600 body-font bg-white border-b border-[#f1f1f1] px-3 sticky top-0 z-50">
        <div className="container mx-auto flex flex-wrap items-center justify-between pt-3">
          <div className="flex justify-between items-center w-full md:w-auto mb-4 md:mb-0">
            <NavLink to="/" className="title-font font-medium text-gray-900">
              <img src={Logo} alt="Logo" className="h-10" />
            </NavLink>
            {isMobile ? (
              <IconButton onClick={toggleMenu}>
                {isOpen === true ? <Close /> : <Menu />}
              </IconButton>
            ) : (
              <IconButton onClick={toggleMenu} style={{ display: "none" }}>
                <Menu />
              </IconButton>
            )}
          </div>

          <div
            className={`order-1 w-full xl:w-[30%] flex flex-col sm:flex-row justify-between xl:justify-end items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0 py-3 ${
              isMobile && !isOpen ? "hidden" : "block"
            }`}
          >
            <a href="tel:+90 534 267 64 77">
              <Button
                startIcon={<Phone />}
                variant="contained"
                disableElevation
              >
                +90 534 267 64 77
              </Button>
            </a>
            <Select
              size="small"
              defaultValue={i18n.language}
              sx={{ height: 36.5 }}
              onChange={changeLanguage}
            >
              <MenuItem value="uz">O'zbek</MenuItem>
              <MenuItem value="ru">Русский</MenuItem>
              <MenuItem value="ae">عربي</MenuItem>
              <MenuItem value="tr">Türk</MenuItem>
            </Select>
          </div>

          <nav
            className={`menu-nav ${
              isOpen ? "h-[100vh]" : "max-h-0"
            } transition-max-height duration-500 ease-in-out overflow-hidden md:overflow-visible md:max-h-full absolute md:static w-full md:w-auto bg-white z-50`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-5 h-full w-full md:w-auto text-center md:text-left">
              {MenuNavLink.map((nav, index) => (
                <li key={index}>
                  {nav.link === "/" ? (
                    <NavLink
                      className=""
                      to={nav.link}
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      {t(nav.title)}
                    </NavLink>
                  ) : (
                    <Link
                      to={nav.link}
                      smooth={true}
                      duration={500}
                      className={`pb-5 block py-5 h-full cursor-pointer border-b-2 duration-150 ${
                        activeSection === nav.link
                          ? "border-primary text-primary "
                          : "border-transparent hover:border-primary hover:text-primary"
                      }`}
                      onClick={() => isMobile && setIsOpen(false)}
                    >
                      {t(nav.title)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
