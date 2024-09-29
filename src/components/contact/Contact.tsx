const Contact = () => {
  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-1/2 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Biz bilan bog'lanish
            </h2>

            <div className="flex space-x-2">
              <div className="relative mb-4 w-full">
                <input
                  type="text"
                  placeholder="Ism"
                  id="name"
                  name="name"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4 w-full">
                <input
                  type="email"
                  placeholder="Familiya"
                  id="email"
                  name="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="relative mb-4 w-full">
                <select
                  id="name"
                  name="name"
                  className="w-full bg-white rounded border  border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-[9.5px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </select>
              </div>
              <div className="relative mb-4 w-full">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Telfon Raqam"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="relative mb-4">
              <textarea
                placeholder="Izoh"
                id="message"
                name="message"
                className="w-full bg-white rounded border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-secondary rounded text-lg">
              Yuborish
            </button>
          </div>
          <div className="lg:w-1/2 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:ml-10 p-10 flex items-end justify-start relative">
            <iframe
              width="100%"
              height="600" // Set a fixed height
              className="absolute inset-0"
              title="Google Map"
              src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Toshken city, Magic city&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
