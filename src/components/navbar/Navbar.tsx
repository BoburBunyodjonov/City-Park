import { useState } from "react";

import Logo from "../assets/logo.svg";
import { NavLink } from "./navbar.constants";

// Icons

import { Phone } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="text-gray-600 body-font border-b border-[#f1f1f1] pt-4 px-3">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          {/* Logo and Hamburger Menu for Mobile */}
          <div className="flex justify-between items-center w-full md:w-auto mb-4 md:mb-0">
            <a className="title-font font-medium text-gray-900">
              <img src={Logo} alt="Logo" />
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

          {/* Navigation Menu */}
          <nav
            className={`${
              isOpen ? "block" : "hidden"
            } w-full md:flex md:items-center md:w-auto md:h-[64px]`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-5 h-full w-full md:w-auto text-center md:text-left items-center">
              {NavLink.map((nav, index) => (
                <li
                  key={index}
                  className="flex items-center h-full border-b-2 border-transparent hover:border-primary hover:text-primary py-2 md:py-0 duration-150"
                >
                  {nav.title}
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Button and Language Select */}
          <div className="w-full sm:w-auto flex py-3 flex-row sm:flex-row justify-center space-x-2 mt-4 sm:mt-0">
            <button className="inline-flex items-center bg-primary text-white border-0 py-2 px-3 focus:outline-none hover:bg-secondary rounded-2xl text-base">
              <Phone size={20} className="mr-2" />
              +90 534 267 64 77
            </button>
            <select
              name=""
              id=""
              className="border border-primary rounded-xl px-2 py-2"
            >
              <option value="uz">Uzbek</option>
              <option value="en">Ingliz</option>
              <option value="ru">Rus</option>
            </select>
          </div>
        </div>
      </header>
    </>
  );
}
