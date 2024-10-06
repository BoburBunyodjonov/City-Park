import { Link } from "react-router-dom";
import footerLogo from "../assets/logo.svg";
import { MenuNavLink } from "../navbar/navbar.constants";

import { Instagram, Telegram, WhatsApp, YouTube } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const Footer =  ({ CallCenterFooter }: { CallCenterFooter: any }) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#F8F8F8]">
      <div className="border-b border-[#DFDFDF]">
        <div className="container mx-auto py-5 flex justify-between items-center">
          <a
            className="text-md md:text-xl font-semibold"
            href="tel:+90 (534) 267 64 77"
          >
            +90 (534) 267 64 77
          </a>
            <button onClick={CallCenterFooter} className="hover:bg-primary hover:text-white duration-100 border border-primary px-4 py-2 rounded-xl text-primary">
              {t("footer.call_to_me")}
            </button>
        </div>
      </div>
      <div className="container py-24 mx-auto flex md:items-center md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-black">
            <img src={footerLogo} alt="ikan-park-logo" />
          </a>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="mb-10 lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-bold text-black text-lg mb-3">
              {t("footer.social_media")}
            </h2>
            <nav className="list-none space-y-2">
              <li>
                <a
                  href="https://speedup.uz"
                  className="text-[#999999] hover:text-gray-800"
                >
                  <Instagram className="mr-2" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://speedup.uz"
                  className="text-[#999999] hover:text-gray-800"
                >
                  <Telegram className="mr-2" />
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://speedup.uz"
                  className="text-[#999999] hover:text-gray-800"
                >
                  <WhatsApp className="mr-2" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://speedup.uz"
                  className="text-[#999999] hover:text-gray-800"
                >
                  <YouTube className="mr-2" />
                  YouTube
                </a>
              </li>
            </nav>
          </div>
          <div className="mb-10 lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-bold text-black text-lg mb-3">
              {t("footer.sections")}
            </h2>
            <nav className="list-none space-y-2">
              {MenuNavLink.map((nav, index) => (
                <li key={index}>
                  <Link
                    to={nav.link}
                    className="text-[#999999] hover:text-gray-800"
                  >
                    {t(nav.title)}
                  </Link>
                </li>
              ))}
            </nav>
          </div>
          <div className="mb-10 lg:w-2/4 md:w-2/2 w-full px-4">
            <h2 className="title-font font-bold text-black text-lg mb-3">
              {t("footer.contact")}
            </h2>
            <nav className="list-none space-y-2">
              <li className="text-black hover:text-gray-800 flex flex-col">
                <span className="font-medium">
                  {t("footer.location_title")}:
                </span>
                <span className="text-[#999999]">{t("footer.location")}</span>
              </li>
              <li className="text-black hover:text-gray-800 flex flex-col">
                <span className="font-medium">{t("footer.target_title")}:</span>
                <span className="text-[#999999]">{t("footer.target")}</span>
              </li>
              <li className="text-black hover:text-gray-800 flex flex-col">
                <span className="font-medium">
                  {t("footer.work_time_title")}:
                </span>
                <span className="text-[#999999]">{t("footer.work_time")}</span>
              </li>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
