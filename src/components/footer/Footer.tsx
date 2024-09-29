import { Link } from "react-router-dom";
import footerLogo from "../assets/logo (1).svg";
import { NavLink } from "../navbar/navbar.constants";

import { v4 as uuidv4 } from 'uuid';



const Footer = () => {


  return (
    <footer className="bg-[#F8F8F8]">
      <div className="border-b-2 border-[#DFDFDF]">
        <div className="container mx-auto py-5 flex justify-between items-center">
          <h1 className="text-xl font-semibold">+90 (534) 267 64 77</h1>
          <button className="border border-primary px-4 py-2 rounded-xl text-primary">
            Menga qo’ng’iroq qiling
          </button>
        </div>
      </div>
      <div className="container px-5 py-24 mx-auto flex md:items-center md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <img src={footerLogo} alt="" />
          </a>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-bold text-gray-900 tracking-widest text-sm mb-3">
              Ijtimoiy tarmoqlar
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">Instagram</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Telegram</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Whatsapp</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">YouTube</a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-bold text-gray-900 tracking-widest text-sm mb-3">
              Bo’limlar
            </h2>
            <nav className="list-none mb-10">
                {NavLink.map((nav) => (
                    <li key={uuidv4()}>
                        <Link to={nav.link} className="text-gray-600 hover:text-gray-800">{nav.title}</Link>
                   </li>
                ))}
            </nav>
          </div>
          <div className="lg:w-2/4 md:w-2/2 w-full px-4">
            <h2 className="title-font font-bold text-gray-900 tracking-widest text-sm mb-3">
              Aloqa
            </h2>
            <nav className="list-none mb-10">
              <li className="text-gray-900 hover:text-gray-800 flex flex-col">
                <span className="font-bold text-sm">Bizning manzil:</span>
                <span className="text-[#999999] text-sm"> Yashnobod tumani, st. Istiqbol 45-1. Infinity savdo ofisi</span>
              </li>
              <li className="text-gray-900 hover:text-gray-800 flex flex-col">
                <span className="font-bold text-sm">Mo’ljal:</span>
                <span className="text-[#999999] text-sm">Sobiq vino zavodi. "Infinity" turar-joy majmuasi</span>
              </li>
              <li className="text-gray-900 hover:text-gray-800 flex flex-col">
                <span className="font-bold text-sm">Ish vaqti:</span>
                <span className="text-[#999999] text-sm">Sotuv boʻlimi: Du-Ju: с 9:00 до 19:00 Sh-Ya: с 10:00 до 18:00</span>
              </li>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
