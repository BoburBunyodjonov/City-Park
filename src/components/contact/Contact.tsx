import { Send } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useHomeContext from "../../pages/home/services/homeContext";

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
      toast.success(t("home.contact.form.success"));

      setFirstName("");
      setLastName("");
      setPhone("");
      setMessage("");
      setApartment(data?.[0]?.id || "");
    } catch (error) {
      setLoading(false);
      console.error("Error adding document: ", error);
      toast.success(t("home.contact.form.error"));
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font" id="contact">
        <div className="py-24 mx-auto grid grid-cols-1 md:grid-cols-2 gap-7">
          <div className="flex flex-col w-full">
            <h1 className="text-black text-2xl mb-5 font-bold">
              {t("home.contact.title")}
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="flex mb-4 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative w-full">
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    placeholder={t("home.contact.form.first_name")}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="relative mb-4 w-full">
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    placeholder={t("home.contact.form.last_name")}
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
                    placeholder={t("home.contact.form.apartment")}
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
                    variant="outlined"
                    placeholder={t("home.contact.form.phone_number")}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="relative mb-4">
                <TextField
                  size="small"
                  fullWidth
                  variant="outlined"
                  placeholder={t("home.contact.form.note")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  multiline
                  rows={4}
                />
              </div>
              <LoadingButton
                variant="contained"
                type="submit"
                endIcon={<Send />}
                loading={loading}
                loadingPosition="end"
              >
                {t("home.contact.form.submit")}
              </LoadingButton>
            </form>
          </div>
          <YMaps>
            <Map
              width={"100%"}
              height={"100%"}
              className="rounded-3xl overflow-hidden"
              defaultState={{
                center: [55.684758, 37.738521],
                zoom: 11,
              }}
            >
              <Placemark geometry={[55.684758, 37.738521]} />
            </Map>
          </YMaps>
        </div>
      </section>
    </>
  );
};

export default memo(Contact);
