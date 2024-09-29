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
          <div className="relative mb-4 w-full">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Narxi
            </label>
            <input
              type="text"
              placeholder="Familiya"
              id="email"
              name="email"
              value="$200,000"
              className="w-full bg-[#F8F8F8] rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4 w-full">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Boshlang'ich to'lov
            </label>
            <input
              type="text"
              placeholder="Familiya"
              id="email"
              name="email"
              value="$15,000"
              className="w-full bg-[#F8F8F8] rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
