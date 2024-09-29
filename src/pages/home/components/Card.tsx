import HomeImg from "../assets/telegram-cloud-document-4-5818753952396612155.png";
import {LocationIcon} from "../../../assets/svg"

const Card = () => {
  return (
    <>
    <div className="relative flex w-full flex-col overflow-hidden rounded-lg group">
  <a
    className="relative mx-5 mt-3 flex h-60 overflow-hidden rounded-xl transition-all duration-300 group-hover:h-48"
    href="#"
  >
    <img className="object-cover h-full w-full transition-all duration-300 group-hover:h-full" src={HomeImg} alt="product image" />
    <span className="absolute top-0 left-0 m-2 rounded-md bg-white px-3 py-1 text-center text-sm font-medium text-primary">
      Ipoteka
    </span>
    <span className="absolute top-0 right-0 m-2 rounded-md bg-primary px-3 py-1 text-center text-sm font-medium text-white">
      2+1
    </span>
  </a>
  <div className="mt-4 px-5 pb-5">
    <div className="flex items-center justify-between">
      <span className="text-[#BABABA]">Turar joy majmuasi</span>
      <span className="text-[#BABABA]">5 qavat</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-lg font-semibold text-slate-900">
        2+1 xonali jihozlangan xonadon
      </span>
      <span className="font-semibold text-primary">$ 250,000</span>
    </div>
    <div className="mb-3 flex items-center space-x-1">
      <LocationIcon />
      <span className="text-[#BABABA]">Dubai, Business Bay, Aykon City</span>
    </div>

    {/* Add to cart tugmasi */}
    <div className="relative h-0 overflow-hidden transition-all duration-300 group-hover:h-12">
      <a
        href="#"
        className="add-to-cart-btn flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
      >
        Ko'proq
      </a>
    </div>
  </div>
</div>

    </>
  );
};

export default Card;
