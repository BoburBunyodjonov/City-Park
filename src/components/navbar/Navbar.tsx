import { useEffect, useState } from "react";

import Logo from "../assets/logo.svg";
import { MenuNavLink } from "./navbar.constants";
import { Link } from "react-scroll";
// Icons
import "./style.css";

import { Phone } from "lucide-react";
import { NavLink } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

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

  return (
    <>
      <header className="text-gray-600 body-font bg-white border-b border-[#f1f1f1] pt-4 px-3 sticky top-0 z-50">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          {/* Logo and Mobile Menu Button */}
          <div className="flex justify-between items-center w-full md:w-auto mb-4 md:mb-0">
            <a className="title-font font-medium text-gray-900">
              <img src={Logo} alt="Logo" className="h-10" />{" "}
              {/* Set height for logo */}
            </a>
            <button className="md:hidden text-gray-900" onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links with Animation */}
          <nav
            className={`menu-nav ${
              isOpen ? "max-h-screen" : "max-h-0"
            } transition-max-height duration-500 ease-in-out overflow-hidden md:overflow-visible md:max-h-full absolute md:static w-full md:w-auto bg-white z-50`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-5 h-full w-full md:w-auto text-center md:text-left items-center">
              {MenuNavLink.map((nav, index) => (
                <li
                  key={index}
                  className={`flex items-center border-b-2 border-transparent hover:border-primary hover:text-primary md:py-0 duration-150`}
                >
                  {nav.link === "/" ? (
                    <NavLink to={nav.link}>{nav.title}</NavLink>
                  ) : (
                    <Link
                      to={nav.link}
                      smooth={true}
                      duration={500}
                      className={`py-2 md:py-0 h-full cursor-pointer ${
                        activeSection === nav.link ? "text-primary" : ""
                      }`}
                    >
                      {nav.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className=" flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0 py-3">
            <button className=" inline-flex items-center bg-primary text-white border-0 py-2 px-4 focus:outline-none hover:bg-secondary rounded-2xl text-base h-10">
              <Phone size={20} className="mr-2" />
              <span className="whitespace-nowrap">+90 534 267 64 77</span>
            </button>
            <Select
              id="demo-simple-select"
              className="sm:w-40 w-full bg-white border border-gray-300 text-base rounded-2xl focus:outline-none h-10"
              defaultValue={10}
            >
              <MenuItem value={10}>Uzbek</MenuItem>
              <MenuItem value={20}>Rus</MenuItem>
              <MenuItem value={30}>Ingliz</MenuItem>
            </Select>
          </div>
        </div>
      </header>
    </>
  );
}
