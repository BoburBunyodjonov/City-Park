import { MenuItem, Select, SelectChangeEvent, TextField, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useHomeContext from "../../pages/home/services/homeContext";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language as "uz" | "ru" | "tr" | "ae";
  const [apartment, setApartment] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    state: { data },
  } = useHomeContext();

  const handleChangeApartment = (e: SelectChangeEvent) => {
    const selectedApartment = data.find(
      (apartment) => apartment.id === e.target.value
    );
    if (selectedApartment) {
      setApartment(e.target.value);
    }
  };

  useEffect(() => {
    if (data.length) {
      setApartment(data?.[0]?.id || "");
    }
  }, [data]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const db = getFirestore();
      await addDoc(collection(db, "contacts"), {
        firstName,
        lastName,
        phone,
        message,
        apartmentId: apartment,
        timestamp: new Date(),
      });
      setLoading(false); 
      toast.success("Form submitted successfully!");
      
      setFirstName("");
      setLastName("");
      setPhone("");
      setMessage("");
      setApartment(data?.[0]?.id || "");
    } catch (error) {
      setLoading(false); 
      console.error("Error adding document: ", error);
      toast.error("Error submitting the form!");
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font relative" id="aloqa">
        <div className="container px-5 py-24 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white flex flex-col w-full md:py-8 mt-8 p-5 rounded-lg">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Biz bilan bog'lanish
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="flex mb-4 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative w-full">
                  <TextField
                    size="small"
                    fullWidth
                    id="first-name"
                    variant="outlined"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="relative mb-4 w-full">
                  <TextField
                    size="small"
                    fullWidth
                    id="last-name"
                    variant="outlined"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex mb-4 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative w-full">
                  <Select
                    fullWidth
                    size="small"
                    id="apartment-select"
                    value={apartment}
                    onChange={handleChangeApartment}
                    required
                  >
                    {data?.map((apartment, index) => (
                      <MenuItem key={index} value={apartment.id}>
                        {apartment[`title_${language}`]}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="relative mb-4 w-full">
                  <TextField
                    size="small"
                    fullWidth
                    id="phone"
                    variant="outlined"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="relative mb-4">
                <textarea
                  placeholder="Izoh"
                  id="message"
                  name="message"
                  className="w-full bg-white rounded border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-secondary rounded text-lg"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Yuborish"}
              </button>
            </form>
          </div>

          <div className="rounded-lg overflow-hidden p-5 flex items-center justify-center relative">
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
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
