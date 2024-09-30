import { Contact, Ipoteka } from "../../components";
// Icons
import {
  AreaIcon,
  ObjectIcon,
  FixIcon,
  AvtoParkingIcon,
} from "../../assets/svg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// Data Types
import { DataType } from "../../constants/data";
// Firebase Data
import { getApartments } from "../../firebase/firebaseUtils";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<DataType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apartments = await getApartments();
        setData(apartments);
      } catch (error) {
        console.error("Error fetching apartments data:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }
  const selectedApartment = data.find(
    (apartment) => apartment?.id ?? "" === id
  );

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 p-5">
        <div className="flex justify-center items-center">
          <img
            src={selectedApartment?.images?.[0]}
            alt={selectedApartment?.title}
            className="w-full lg:h-full h-[400px] rounded-2xl"
          />
        </div>
        <div className="grid grid-rows-2 gap-6">
          <div className="flex justify-center items-center">
            <img
              src={selectedApartment?.images?.[1]}
              alt={selectedApartment?.title}
              className="w-full object-cover rounded-xl h-[200px] lg:max-h-full"
            />
          </div>
          <div className="flex justify-center items-center">
            <img
              src={selectedApartment?.images?.[2]}
              alt={selectedApartment?.title}
              className="w-full object-cover rounded-xl h-[200px] lg:max-h-full"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 py-3 px-5">
        <div>
          <h1 className="text-primary font-semibold text-2xl lg:text-3xl pb-3">
            {selectedApartment?.title}
          </h1>
          <p className="text-[#BABABA] text-base lg:text-lg">
            {selectedApartment?.description}
          </p>
        </div>
        <div>
          <div className="bg-[#D2EDE6] p-5 rounded-2xl">
            <span className="text-base lg:text-lg">Boshlang’ich narxi</span>
            <p className="text-primary text-2xl lg:text-3xl font-semibold">
              {selectedApartment?.currency}
              {selectedApartment?.price}
            </p>
            <button className="px-5 py-3 text-white mt-4 bg-gradient-to-r rounded-2xl from-[#20A582] to-[#123F3C]">
              To’liq katalogni yuklash
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 justify-center items-center p-5 py-10">
        <div className="flex items-center space-x-3 p-3 justify-center md:justify-start">
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
        <div className="flex items-center space-x-3 p-3 justify-center md:justify-start">
          <div className="bg-[#D2EDE6] p-3 rounded-xl">
            <ObjectIcon />
          </div>
          <div>
            <span className="text-xs">Jihozlari</span>
            <p className="text-primary font-semibold text-2xl">
              {selectedApartment?.furniture}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 justify-center md:justify-start">
          <div className="bg-[#D2EDE6] p-3 rounded-xl">
            <FixIcon />
          </div>
          <div>
            <span className="text-xs">Ta’miri</span>
            <p className="text-primary font-semibold text-2xl">
              {selectedApartment?.repair}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 justify-center md:justify-start">
          <div className="bg-[#D2EDE6] p-3 rounded-xl">
            <AvtoParkingIcon />
          </div>
          <div>
            <span className="text-xs">Avtomobil maydoni</span>
            <p className="text-primary font-semibold text-2xl">
              {selectedApartment?.parking}
            </p>
          </div>
        </div>
      </div>

      <Ipoteka />
      <Contact />
    </>
  );
};

export default Details;
