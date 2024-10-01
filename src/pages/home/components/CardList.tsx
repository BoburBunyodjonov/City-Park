import { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import { Range } from "react-range";
import { MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { DataType } from "../../../constants/data";
import { useTranslation } from "react-i18next";
import { getApartments } from "../../../firebase/firebaseUtils";
import { debounce } from "lodash";

type ApartmentType = "business_center" | "beach" | "standard";

const apartmentTypes: ApartmentType[] = [
  "business_center",
  "beach",
  "standard",
];

const CardList = () => {
  const { t, i18n } = useTranslation();
  // const language = i18n.language as "uz" | "ru" | "tr";
  const [rangeValues, setRangeValues] = useState<number[]>([0, 200000]);
  const [room, setRoom] = useState<number>(2);
  const [type, setType] = useState<ApartmentType>(apartmentTypes[2]);
  const [data, setData] = useState<DataType[]>([]);

  const handleRangeChange = (values: number[]) => {
    setRangeValues(values);
  };

  const fetchData = debounce(async () => {
    try {
      const apartments = await getApartments({
        price: rangeValues,
        room,
        type,
      });
      setData(apartments);
    } catch (error) {
      console.error("Error fetching apartments data:", error);
    }
  }, 300);

  useEffect(() => {
    fetchData();

    return () => {
      fetchData.cancel();
    };
  }, [rangeValues, room, type]);

  return (
    <>
      <section className="text-gray-600 body-font" id="tutar_joylar">
        <div className="py-3 mx-auto">
          <div className="flex flex-row justify-between items-center w-full ">
            <h1 className="sm:text-xl text-xl font-semibold title-font mb-4 text-gray-900">
              {t("home.residences")}
            </h1>
            <h1 className="sm:text-xl text-xl font-medium title-font mb-4 text-primary">
              {t("home.apartments_count", { count: 6 })}
            </h1>
          </div>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 ">
            <div className="relative flex-grow w-full">
              <Select
                fullWidth
                size="small"
                id="demo-simple-select"
                value={room}
                onChange={(e) => setRoom(Number(e.target.value))}
              >
                {Array.from({ length: 10 }, (_, index) => index).map(
                  (index) => (
                    <MenuItem key={index} value={index + 1}>
                      {t("home.filter.room", { room: index + 1 })}
                    </MenuItem>
                  )
                )}
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
                value={type}
                onChange={(e) => setType(e.target.value as ApartmentType)}
              >
                {apartmentTypes?.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {t(`home.filter.${type}`)}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </section>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
        {data.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default CardList;
