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
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex p-5 flex-col md:flex-row items-center">
          <a className="w-[20%] flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img src={Logo} alt="" />
          </a>
          <nav
            className={`${
              isOpen ? "block" : "hidden"
            } w-full md:w-[60%] md:flex md:items-center md:ml-4 md:py-1 md:pl-4  md:flex-wrap text-base md:justify-between`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-5 space-y-2 md:space-y-0">
              {NavLink.map((nav, index) => (
                <li key={index} className="hover:text-gray-900">
                  {nav.title}
                </li>
              ))}
            </ul>
          </nav>
          <div className="w-full md:w-[20%] flex justify-end mt-4 md:mt-0 ">
            <button className="inline-flex items-center bg-primary text-white border-0 py-2 px-3 focus:outline-none hover:bg-secondary rounded-2xl text-base">
              <Phone size={20} />
              +90 534 267 64 77
            </button>
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base ml-2">
              Button
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
          <button className="md:hidden text-gray-900 ml-2" onClick={toggleMenu}>
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
      </header>
    </>
  );
}
