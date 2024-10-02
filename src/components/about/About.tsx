import { useTranslation } from "react-i18next";
import aboutImage from "../../assets/about.jpeg";
import Logo from "../assets/logo (1).svg";

const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="text-gray-600 body-font" id="haqida">
        <div className="grid lg:grid-cols-2 gap-7 my-10">
          <div className="">
            <img
              className="object-cover object-center rounded-3xl h-full"
              alt="hero"
              src={aboutImage}
            />
          </div>
          <div className="flex flex-col md:items-start md:text-left items-center text-center">
            <div className="w-full py-3">
              <img src={Logo} alt="ikan-park-logo" className="m-auto" />
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
