import { Contact, Ipoteka } from "../../components";

import Img1 from "../../assets/1.png";
import Img2 from "../../assets/2.png";

const Details = () => {
  return (
    <>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 p-5">
        <div className="flex justify-center items-center">
          <img
            src={Img1}
            alt=""
            className="w-full h-auto lg:h-full object-cover rounded-2xl"
          />
        </div>
        <div className="grid grid-rows-2 gap-6">
          <div className="flex justify-center items-center">
            <img
              src={Img2}
              alt=""
              className="w-full h-auto object-cover rounded-2xl max-h-[245px] lg:max-h-full"
            />
          </div>
          <div className="flex justify-center items-center">
            <img
              src={Img2}
              alt=""
              className="w-full h-auto object-cover rounded-2xl max-h-[245px] lg:max-h-full"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 py-3 px-5">
        <div>
          <h1 className="text-primary font-semibold text-2xl lg:text-3xl pb-3">
            Jihozlangan 2+1 xonali xonadon
          </h1>
          <p className="text-[#BABABA] text-base lg:text-lg">
            Bu zamonaviy va qulay yashash sharoitlarini taqdim etadigan uy, u
            ikki yotoqxona va keng yashash xonasiga ega bo'lib, to'liq jihozlar
            bilan ta'minlangan. Har bir burchagi ehtiyotkorlik bilan o'ylangan,
            bu esa oilangiz yoki o'zingiz uchun ideal yashash maydonini
            yaratadi.
          </p>
        </div>
        <div>
          <div className="bg-[#D2EDE6] p-5 rounded-2xl">
            <span className="text-base lg:text-lg">Boshlang’ich narxi</span>
            <p className="text-primary text-2xl lg:text-3xl font-semibold">
              $ 299,000
            </p>
            <button className="px-5 py-3 text-white mt-4 bg-gradient-to-r rounded-2xl from-[#20A582] to-[#123F3C]">
              To’liq katalogni yuklash
            </button>
          </div>
        </div>
      </div>

      <Ipoteka />
      <Contact />
    </>
  );
};

export default Details;
