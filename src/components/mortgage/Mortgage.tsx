import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Mortgage = () => {
  const [apartment, setApartment] = useState<number>(2);
  const [price, setPrice] = useState<number>(100000);
  const [initialPayment, setInitialPayment] = useState<number>(15000);
  const { t } = useTranslation();
  return (
    <div className="">
      <h1 className="text-xl font-semibold">{t("home.mortgage.title")}</h1>
      <div className="flex py-5 gap-5">
        <div className="lg:w-[42%]">
          <div className="relative mb-4 w-full">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              {t("home.mortgage.form.select_apartment")}
            </label>
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
          <div className="relative mb-4 w-full">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              {t("home.mortgage.form.price")}
            </label>
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              variant="outlined"
            />
          </div>
          <div className="relative mb-4 w-full">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              {t("home.mortgage.form.initial_payment")}
            </label>
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              variant="outlined"
            />
          </div>
        </div>
        <div className="lg:w-[42%] p-5 bg-[#F8F8F8] rounded-3xl flex flex-col justify-between">
          <div className="grid md:grid-cols-2 px-3">
            <div className="py-3">
              <p>Oylik to'lov</p>
              <span className="text-primary text-xl font-semibold">
                $ 1,300
              </span>
            </div>
            <div className="py-3">
              <p>Chegirma</p>
              <span className="text-primary text-xl font-semibold">
                $ 19,200
              </span>
            </div>
            <div className="py-3">
              <p>Birlamchi to'lov</p>
              <span className="text-primary text-xl font-semibold">
                $ 178,900
              </span>
            </div>
            <div className="py-3">
              <p>Ipoteka</p>
              <span className="text-primary text-xl font-semibold">20 yil</span>
            </div>
          </div>
          <p className="text-[#BABABA] text-xs">
            Tijorat ipotekani qanday olish mumkin, iltimos, telefon orqali savdo
            bo'limiga murojaat qiling +998 (78) 113-04-59
          </p>
        </div>
        <div className="lg:w-[16%] flex ">
          <div className="h-full w-full p-5 bg-gradient-to-b from-[#20A582] to-[#123F3C] rounded-3xl flex flex-col justify-around">
            <p className="text-center text-white">Faqatgina Ikan Parkda</p>
            <h1 className="text-[11rem] font-extrabold text-white text-center">
              0%
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mortgage;
