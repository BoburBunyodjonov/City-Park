import { useEffect, useState } from "react";
import Card from "./Card";
import { Range } from "react-range";
import { MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { DataType } from "../../../constants/data";
// import { useTranslation } from 'react-i18next';
import { getApartments } from "../../../firebase/firebaseUtils";


const CardList = () => {
  // const { i18n} = useTranslation()
  // const language  = i18n.language as "uz" | "ru" | "tr"
  const [rangeValues, setRangeValues] = useState([0, 200000]);
  const navigate = useNavigate();
  const [data, setData] = useState<DataType[]>([]);

  const handleRangeChange = (values: number[]) => {
    setRangeValues(values);
  };

  const handlerClickFunc = (id: number) => {
    navigate(`/details/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  return (
    <>
      <section className="text-gray-600 body-font" id="tutar_joylar">
        <div className="container px-5 py-3 mx-auto">
          <div className="flex flex-row justify-between items-center w-full ">
            <h1 className="sm:text-xl text-xl font-semibold title-font mb-4 text-gray-900">
              Residences in Ikon Park
            </h1>
            <h1 className="sm:text-xl text-xl font-medium title-font mb-4 text-primary">
              6 ko'rsatkich
            </h1>
          </div>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 ">
            <div className="relative flex-grow w-full">
              <Select
                fullWidth
                size="small"
                id="demo-simple-select"
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </div>
            <div className="relative bg-[#F8F8F8] flex-grow w-full rounded border flex flex-col justify-between border-gray-300">
              <div className="flex justify-between w-full px-5 mt-2">
                <div className="text-gray-600">
                  <span className="">${rangeValues[0].toLocaleString()}</span>
                </div>
                <div className="text-gray-600">
                  <span className="">${rangeValues[1].toLocaleString()}</span>
                </div>
              </div>
              <div className="w-full px-2">
                <Range
                  step={1000}
                  min={0}
                  max={200000}
                  values={rangeValues}
                  onChange={handleRangeChange}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "2px",
                        width: "100%",
                        background: `linear-gradient(to right, #d1d5db ${
                          rangeValues[0] / 2000
                        }%, #20A582 ${rangeValues[0] / 2000}%, #20A582 ${
                          rangeValues[1] / 2000
                        }%, #d1d5db ${rangeValues[1] / 2000}%)`,
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "14px",
                        width: "14px",
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        border: "2px solid #20A582",
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div className="relative flex-grow w-full">
              <Select
                fullWidth
                size="small"
                id="demo-simple-select"
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </div>
          </div>
        </div>
      </section>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
        {data.map((item) => (
          <Card
            key={item.id}
            img1={item.img1}
            img2={item.img2}
            img3={item.img3}
            title={item?.title || "No title"}
            price={item.price || ""}
            location={item.location}
            description={item.description || "No description available"}
            rooms={item.rooms || ""}
            floor={item.floor || ""}
            onCardClick={() => {handlerClickFunc(item.id as number)}}
          />
        ))}
      </div>
    </>
  );
};

export default CardList;
