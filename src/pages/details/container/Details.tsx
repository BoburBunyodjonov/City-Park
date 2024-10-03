import { Mortgage } from "../../../components";
// Icons
import {
  AreaIcon,
  AvtoParkingIcon,
  FixIcon,
  ObjectIcon,
} from "../../../assets/svg";
// Data Types
// Firebase Data
import useDetailsContext from "../services/detailsContext";
import { Button } from "@mui/material";
import { format } from "../../../utils/format";
import Questions from "../../../components/questions/questions";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { useTranslation } from "react-i18next";

const Details = () => {
  const { t } = useTranslation();

  const {
    state: { apartments, selectedApartment },
  } = useDetailsContext();

  return (
    <>
      <div className="container mx-auto lg:flex  gap-6 my-5 p-0">
        <div className="lg:w-[65%] flex justify-center items-center">
          {selectedApartment?.img1 && (
            <img
              src={
                typeof selectedApartment.img1 === "string"
                  ? selectedApartment.img1
                  : URL.createObjectURL(selectedApartment.img1)
              }
              alt={selectedApartment?.title_uz}
              className="w-full lg:h-[500px] rounded-xl"
            />
          )}
        </div>
        <div className="lg:w-[35%] mt-5 lg:mt-0 flex flex-col justify-between gap-6">
          <div className="flex justify-center items-center">
            {selectedApartment?.img2 && (
              <img
                src={
                  typeof selectedApartment.img2 === "string"
                    ? selectedApartment.img2
                    : URL.createObjectURL(selectedApartment.img2)
                }
                alt={selectedApartment?.title_uz}
                className="w-full object-cover rounded-xl lg:h-[240px] lg:max-h-full"
              />
            )}
          </div>
          <div className="flex justify-center items-center">
            {selectedApartment?.img3 && (
              <img
                src={
                  typeof selectedApartment.img3 === "string"
                    ? selectedApartment.img3
                    : URL.createObjectURL(selectedApartment.img3)
                }
                alt={selectedApartment?.title_uz}
                className="w-full object-cover rounded-xl lg:h-[240px] lg:max-h-full"
              />
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto lg:flex space-y-3 gap-6 p-0 mb-10">
        <div className="lg:w-[65%]">
          <h1 className="text-primary font-semibold text-2xl lg:text-3xl pb-3">
            {selectedApartment?.title_uz}
          </h1>
          <p className="text-[#BABABA] text-base lg:text-lg">
            {selectedApartment?.description_uz}
          </p>
        </div>
        <div className="lg:w-[35%]">
          <div className="w-full bg-[#D2EDE6] p-5 rounded-2xl">
            <span className="text-base lg:text-lg">Boshlang’ich narxi</span>
            <p className="text-primary text-2xl lg:text-3xl font-semibold">
              {format.money(selectedApartment?.price, "USD")}
            </p>
            <Button
              fullWidth
              className="bg-gradient-to-r rounded-2xl from-[#20A582] to-[#123F3C]"
              variant="contained"
              disableElevation
              sx={{ marginTop: "20px" }}
            >
              To’liq katalogni yuklash
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 m-0 p-0 py-10">
        <div className="flex items-center space-x-3 md:justify-start">
          <div className="bg-[#D2EDE6] p-3 rounded-xl">
            <AreaIcon />
          </div>
          <div>
            <span className="text-xs">Maydoni</span>
            <p className="text-primary font-semibold text-2xl">
              {selectedApartment?.area} m<sup>2</sup>
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 md:justify-start">
          <div className="bg-[#D2EDE6] p-3 rounded-xl">
            <ObjectIcon />
          </div>
          <div>
            <span className="text-xs">Jihozlari</span>
            <p className="text-primary font-semibold text-2xl">
              {selectedApartment?.furniture === true ? "Mavjud" : "Mavjud emas"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 md:justify-start">
          <div className="bg-[#D2EDE6] p-3 rounded-xl">
            <FixIcon />
          </div>
          <div>
            <span className="text-xs">Ta’miri</span>
            <p className="text-primary font-semibold text-2xl">
              {selectedApartment?.repair === true ? "Mavjud" : "Mavjud emas"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 md:justify-start">
          <div className="bg-[#D2EDE6] p-3 rounded-xl">
            <AvtoParkingIcon />
          </div>
          <div>
            <span className="text-xs">Avtomobil maydoni</span>
            <p className="text-primary font-semibold text-2xl">
              {selectedApartment?.parking === true ? "Mavjud" : "Mavjud emas"}
            </p>
          </div>
        </div>
      </div>

      <Mortgage apartments={apartments} />
      <Questions />

      <div className="mt-10 mb-20">
        <h1 className="text-black text-2xl font-bold mb-7 text-center">
          {t("details.questions.location")}
        </h1>
        <div className="rounded-3xl overflow-hidden">
          <YMaps>
            <Map
              defaultState={{
                center: [55.684758, 37.738521],
                zoom: 11,
              }}
              width="100%"
              height="400px"
            >
              <Placemark geometry={[55.684758, 37.738521]} />
            </Map>
          </YMaps>
        </div>
      </div>
    </>
  );
};

export default Details;
