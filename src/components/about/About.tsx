import { useTranslation } from "react-i18next";
import aboutImage from "../../assets/about.jpeg";
import Logo from "../assets/logo.svg";

const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="text-gray-600 body-font" id="about">
        <h1 className="text-black text-2xl mb-5 font-bold">
          {t("home.about.title")}
        </h1>
        <div className="grid lg:grid-cols-2 gap-7 my-10 mt-5">
          <div className="">
            <img
              className="object-cover object-center rounded-3xl h-full"
              alt="hero"
              src={aboutImage}
            />
          </div>
          <div className="flex flex-col md:items-start md:text-left items-center text-center">
            <div className="w-full py-3">
              <img
                src={Logo}
                alt="ikan-park-logo"
                className="m-auto mb-4"
                width={200}
              />
            </div>
            <p className="mb-8 leading-relaxed">
              {t("home.about.description")
                .split("\n")
                .map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
