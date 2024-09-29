const Contact = () => {
  return (
    <>
            <section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Form Section */}
    <div className="bg-white flex flex-col w-full md:py-8 mt-8 p-5 rounded-lg">
      <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
        Biz bilan bog'lanish
      </h2>

      <div className="flex mb-4 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full">
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
            type="text"
            placeholder="Familiya"
            id="surname"
            name="surname"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="flex mb-4 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full">
          <select
            id="option"
            name="option"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-[9.5px] px-3 leading-8 transition-colors duration-200 ease-in-out"
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
            type="tel"
            id="phone"
            name="phone"
            placeholder="Telefon Raqam"
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

    {/* Map Section */}
    <div className=" rounded-lg overflow-hidden p-5 flex items-center justify-center relative">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          width="100%"
          height="100%"
          className="absolute inset-0"
          title="Google Map"
          src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Toshken city, Magic city&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          frameBorder="0"
          allowFullScreen
          style={{ border: 0 }}
        ></iframe>
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default Contact;
