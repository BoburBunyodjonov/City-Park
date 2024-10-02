import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { divide, multiply, subtract } from "mathjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Range } from "react-range";
import useHomeContext from "../../pages/home/services/homeContext";
import { format } from "../../utils/format";

const Mortgage = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language as "uz" | "ru" | "tr" | "ae";
  const [apartment, setApartment] = useState<string>("");
  const [price, setPrice] = useState<number>(100000);
  const [initialPayment, setInitialPayment] = useState<number[]>([100000]);

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [discount, setDiscount] = useState(0);

  const {
    state: { data },
  } = useHomeContext();

  const handleChangeApartment = (e: SelectChangeEvent) => {
    const selectedApartment = data.find(
      (apartment) => apartment.id === e.target.value
    );
    if (selectedApartment) {
      setApartment(e.target.value);
      setPrice(selectedApartment.price);
    }
  };

  useEffect(() => {
    if (data.length) {
      setApartment(data?.[0]?.id ?? "");
      setPrice(data?.[0]?.price);
    }
  }, [data]);

  useEffect(() => {
    setMonthlyPayment(divide(subtract(price, initialPayment[0]), 240));
    setTotalPayment(subtract(price, multiply(price, 0.05)));
    setDiscount(multiply(price, 0.05));
  }, [apartment, price, initialPayment]);

  return (
    <div className="my-10">
      <h1 className="text-xl font-semibold">{t("home.mortgage.title")}</h1>
      <div className="flex flex-col flex-wrap content-stretch py-5 gap-5 lg:flex-row">
        <div className="lg:w-[calc(50%-0.75rem)] xl:w-[calc((100%-250px)/2)]">
          <div className="relative mb-4 w-full">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              {t("home.mortgage.form.select_apartment")}
            </label>
            <Select
              fullWidth
              size="small"
              id="demo-simple-select"
              value={apartment}
              onChange={handleChangeApartment}
            >
              {data?.map((apartment, index) => (
                <MenuItem key={index} value={apartment.id}>
                  {apartment[`title_${language}`]}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="relative mb-4 w-full">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              {t("home.mortgage.form.price")}
            </label>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              type="number"
              value={price}
              onChange={() => {}}
            />
          </div>
          <div className="relative mb-4 w-full">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              {t("home.mortgage.form.initial_payment")}
            </label>
            <div className="relative w-full rounded border flex flex-col border-[#0000003B] h-[40px]">
              <div className="flex-grow flex items-center">
                <span className="ps-3 text-gray-600">$ {initialPayment}</span>
              </div>
              <div className="w-full px-2">
                <Range
                  step={1000}
                  min={5000}
                  max={200000}
                  values={initialPayment}
                  onChange={(values) => setInitialPayment(values)}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "2px",
                        width: "100%",
                        background: "#20A582",
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
          </div>
        </div>
        <div className="lg:w-[calc(50%-0.75rem)] xl:w-[calc((100%-250px)/2)] p-5 bg-[#F8F8F8] rounded-3xl flex flex-col justify-between">
          <div className="grid md:grid-cols-2 px-3">
            <div className="py-3">
              <p>{t("home.mortgage.monthly_payment")}</p>
              <span className="text-primary text-3xl font-semibold">
                {format.money(monthlyPayment, "USD")}
              </span>
            </div>
            <div className="py-3">
              <p>{t("home.mortgage.discount")}</p>
              <span className="text-primary text-3xl font-semibold">
                {format.money(discount, "USD")}
              </span>
            </div>
            <div className="py-3">
              <p>{t("home.mortgage.total_payment")}</p>
              <span className="text-primary text-3xl font-semibold">
                {format.money(totalPayment, "USD")}
              </span>
            </div>
            <div className="py-3">
              <p>{t("home.mortgage.title")}</p>
              <span className="text-primary text-3xl font-semibold">
                {t("home.mortgage.duration", { year: 20 })}
              </span>
            </div>
          </div>
          <p className="text-[#BABABA] text-xs">
            {t("home.mortgage.description", { phone: "+998 (78) 113-04-59" })}
          </p>
        </div>
        <div className="lg:w-[100%] xl:w-[200px] h-[252px] p-5 bg-gradient-to-b from-[#20A582] to-[#123F3C] rounded-3xl relative overflow-hidden">
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <p className="text-center text-white">
              {t("home.mortgage.only_with_us")}
            </p>
            <span className="text-[10rem] font-extrabold text-white text-center leading-none">
              0%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mortgage;
