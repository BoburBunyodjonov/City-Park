import { useState } from "react";
import Card from "./Card";
import { Range } from "react-range";
const CardList = () => {
  const [rangeValues, setRangeValues] = useState([0, 200000]);

  const handleRangeChange = (values: number[]) => {
    setRangeValues(values);
  };

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
              <select
                id="name"
                name="name"
                className="w-full bg-[#F8F8F8] rounded border  border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-[9.5px] px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                <option value="" disabled selected>
                  Rooms
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
              </select>
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
              <select
                id="name"
                name="name"
                className="w-full bg-[#F8F8F8] rounded border  border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-[9.5px] px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                <option value="" disabled selected>
                  Biznes Senterlar
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};

export default CardList;
