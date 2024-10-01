import { LocationIcon } from "../../../assets/svg";
import { DataType } from "../../../constants/data";

const Card: React.FC<DataType> = ({
  title,
  price,
  img1,
  location,
  rooms,
  floor,
  currency,
  onCardClick,
}) => {
  return (
    <>
      <div className="relative flex w-full flex-col overflow-hidden rounded-lg group ">
        <a
          className="relative mx-5 mt-3 flex h-60 overflow-hidden rounded-xl transition-all duration-300 group-hover:h-48"
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
              <p>No image available</p> {/* Placeholder content */}
            </div>
          )}
          <span className="absolute top-0 left-0 m-2 rounded-md bg-white px-3 py-1 text-center text-sm font-medium text-primary">
            Ipoteka
          </span>
          <span className="absolute top-0 right-0 m-2 rounded-md bg-primary px-3 py-1 text-center text-sm font-medium text-white">
            {rooms}
          </span>
        </a>
        <div className="mt-4 px-5 pb-5">
          <div className="flex items-center justify-between">
            <span className="text-[#BABABA]">Turar joy majmuasi</span>
            <span className="text-[#BABABA]">{floor} qavat</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-slate-900">
              {title}
            </span>
            <span className="font-semibold text-primary">
              {currency}
              {price}
            </span>
          </div>
          <div className="mb-3 flex items-center space-x-1">
            <LocationIcon />
            <span className="text-[#BABABA]">{location}</span>
          </div>

          {/* Add to cart tugmasi */}
          <div className="relative h-0 overflow-hidden transition-all duration-300 group-hover:h-12">
            <button
              onClick={onCardClick}
              className=" w-full flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
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
