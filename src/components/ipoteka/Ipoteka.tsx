import { MenuItem, Select, TextField } from "@mui/material";

const Ipoteka = () => {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-xl font-semibold">Ipoteka</h1>
      <div className="grid md:grid-cols-3 py-5 gap-5">
        <div>
          <div className="relative mb-4 w-full">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Xonadoni tanlang
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
              Narxi
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
              Boshlang'ich to'lov
            </label>
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              variant="outlined"
            />
          </div>
        </div>
        <div className="p-5 bg-[#F8F8F8] rounded-3xl flex flex-col justify-between">
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
        <div className="flex justify-end">
          <div className="xl:w-3/5 h-full w-full p-5 bg-gradient-to-b from-[#20A582] to-[#123F3C] rounded-3xl flex flex-col justify-around">
            <p className="text-center text-white">Faqatgina Ikan Parkda</p>
            <h1 className="text-9xl font-extrabold text-white text-center">
              0%
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ipoteka;
