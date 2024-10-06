import Card from "./Card";
import { Range } from "react-range";
import { MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import useHomeContext, { ApartmentType } from "../services/homeContext";
import { format } from "../../../utils/format";

type RoomType = number | "all";

const CardList = () => {
  const { t } = useTranslation();

  const {
    state: { room, type, rangeValues = [0, 200000], data, apartmentTypes },
    actions: { handleRangeChange, setRoom, setType },
  } = useHomeContext();

  const isRoomSelected = room !== "all";
  const isTypeSelected = type !== "all";

  const filteredData = data.filter((item) => {
    const selectedRoom = isRoomSelected ? room : undefined;

    const matchesRoom = selectedRoom
      ? Number(String(item.rooms).split("+")[0]) === Number(selectedRoom)
      : true;

    const matchesType = isTypeSelected ? item.type === type : true;

    const matchesPrice =
      item.price >= rangeValues[0] && item.price <= rangeValues[1];

    return matchesRoom && matchesType && matchesPrice;
  });

  const displayData =
    isRoomSelected ||
    isTypeSelected ||
    rangeValues[0] !== 0 ||
    rangeValues[1] !== 200000
      ? filteredData
      : data;

  return (
    <>
      <section className="text-gray-600 body-font mt-10" id="apartments">
        <div className="py-3 mx-auto">
          <div className="flex flex-row justify-between items-center w-full ">
            <h1 className="sm:text-xl text-xl font-semibold title-font mb-4 text-gray-900">
              {t("home.residences")}
            </h1>
            <h1 className="sm:text-xl text-xl font-medium title-font mb-4 text-primary">
              {t("home.apartments_count", { count: displayData.length })}
            </h1>
          </div>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 ">
            <div className="relative flex-grow w-full">
              <Select
                fullWidth
                size="small"
                id="room-select"
                value={room || "all"}
                onChange={(e) => setRoom(e.target.value as RoomType)}
              >
                <MenuItem value="all">{t("home.apartment_card.all")}</MenuItem>
                {Array.from({ length: 10 }, (_, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {t("home.filter.room", { room: index + 1 })}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="relative flex-grow w-full rounded border flex flex-col justify-between border-[#0000003B] h-[40px]">
              <div className="flex-grow flex justify-between items-center w-full px-3">
                <div className="text-gray-600">
                  <span className="">
                    {format.money(rangeValues[0], "USD")}
                  </span>
                </div>
                <div className="text-gray-600">
                  <span className="">
                    {format.money(rangeValues[1], "USD")}
                  </span>
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
                value={type || "all"}
                onChange={(e) => setType(e.target.value as ApartmentType)}
              >
                <MenuItem value="all" defaultChecked>
                  {t("home.apartment_card.all")}
                </MenuItem>
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
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-7 mb-10">
        {displayData.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default CardList;
