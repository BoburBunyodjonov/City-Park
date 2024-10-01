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
        console.log("Fetched apartments:", apartments); 
      } catch (error) {
        console.error("Error fetching apartments data:", error);
      }
    };

    fetchData(); 
  }, []);

  if (!data) {
    return <p>Loading...</p>; 
  }

  console.log("Checking for apartment ID:", id);

  const selectedApartment = data.find(
    (apartment) => {
      console.log("Apartment ID:", apartment.id);
      return apartment.id === id; 
    }
  );

  if (!selectedApartment) {
    return <p>No apartment found for this ID.</p>; 
  }

  return (
    <>
      <div className="container mx-auto lg:flex  gap-6 p-5">
        <div className="lg:w-[65%] flex justify-center items-center">
          {selectedApartment?.img1 && (
            <img
              src={selectedApartment?.img1}
              alt={selectedApartment?.title}
              className="w-full lg:h-[500px] rounded-xl"
            />
          )}
        </div>
        <div className="lg:w-[35%] mt-5 lg:mt-0 flex flex-col justify-between gap-6">
          <div className="flex justify-center items-center">
            {selectedApartment?.img2 && (
              <img
                src={selectedApartment?.img2}
                alt={selectedApartment?.title}
                className="w-full object-cover rounded-xl lg:h-[240px] lg:max-h-full"
              />
            )}
          </div>
          <div className="flex justify-center items-center">
            {selectedApartment?.img3 && (
              <img
                src={selectedApartment?.img3}
                alt={selectedApartment?.title}
                className="w-full object-cover rounded-xl lg:h-[240px] lg:max-h-full"
              />
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto lg:flex space-y-3 gap-6 py-3 px-5">
        <div className="lg:w-[65%]">
          <h1 className="text-primary font-semibold text-2xl lg:text-3xl pb-3">
            {selectedApartment?.title}
          </h1>
          <p className="text-[#BABABA] text-base lg:text-lg">
            {selectedApartment?.description}
          </p>
        </div>
        <div className="lg:w-[35%]">
          <div className="w-full bg-[#D2EDE6] p-5 rounded-2xl">
            <span className="text-base lg:text-lg">Boshlang’ich narxi</span>
            <p className="text-primary text-2xl lg:text-3xl font-semibold">
              {selectedApartment?.currency}
              {selectedApartment?.price}
            </p>
            <button className="w-full px-5 py-3 text-white mt-4 bg-gradient-to-r rounded-2xl from-[#20A582] to-[#123F3C]">
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
