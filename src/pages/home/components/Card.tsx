import { useNavigate } from "react-router-dom";
import { LocationIcon } from "../../../assets/svg";
import { DataType } from "../../../constants/data";
import { useTranslation } from "react-i18next";

const Card: React.FC<DataType> = (props) => {
  const { price, img1, rooms, floor, id, type } = props;
  const { t, i18n } = useTranslation();
  const language = i18n.language as "uz" | "ru" | "tr" | "ae";
  const navigate = useNavigate();

  const onCardClick = () => {
    navigate(`/details/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative flex w-full flex-col overflow-hidden rounded-lg group">
        <a
          className="relative flex h-60 overflow-hidden rounded-xl transition-all duration-300 group-hover:h-48"
          href="#"
        >
          {img1 ? (
            <img
              className="object-cover h-full w-full transition-all duration-300 group-hover:h-full"
              src={img1}
              alt="product image"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
              <p>{t("home.apartment_card.unavailable_image")}</p>
            </div>
          )}
          <span className="absolute top-0 left-0 m-2 rounded-md bg-white px-3 py-1 text-center text-sm font-medium text-primary">
            {t("home.apartment_card.mortgage")}
          </span>
          <span className="absolute top-0 right-0 m-2 rounded-md bg-primary px-3 py-1 text-center text-sm font-medium text-white">
            {rooms}
          </span>
        </a>
        <div className="mt-4 pb-5">
          <div className="flex items-center justify-between">
            <span className="text-[#BABABA]">
              {t(`home.apartment_card.${type}`)}
            </span>
            <span className="text-[#BABABA]">
              {floor} {t("home.apartment_card.floor")}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-slate-900">
              {props?.[`title_${language}`]}
            </span>
            <span className="font-semibold text-primary">$ {price}</span>
          </div>
          <div className="mb-3 flex items-center space-x-1">
            <LocationIcon />
            <span className="text-[#BABABA]">
              {props?.[`location_${language}`]}
            </span>
          </div>

          <div className="relative h-0 overflow-hidden transition-all duration-300 group-hover:h-12">
            <button
              onClick={onCardClick}
              className="w-full rounded-md bg-primary py-2.5 text-center text-sm font-medium text-white hover:bg-primaryHover focus:outline-none transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              Ko'proq
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
