import { Send } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Questions = () => {
  const { t, } = useTranslation();
  // const language = i18n.language as "uz" | "ru" | "tr" | "ae";
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const db = getFirestore();
      await addDoc(collection(db, "questions"), {
        firstName,
        phone,
        timestamp: new Date(),
      });
      setLoading(false);
      toast.success(t("home.contact.form.success"));
      setFirstName("");
      setPhone("");
    } catch (error) {
      setLoading(false);
      console.error("Error adding document: ", error);
      toast.success(t("home.contact.form.error"));
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font" id="contact">
        <div className="py-24 mx-auto gap-7 bg-[#20A58233] px-10 rounded-xl">
          <div className="flex flex-col w-full space-y-2">
            <h1 className="text-black text-2xl mb-5 font-bold">
              {t("details.questions.title")}
            </h1>
            <p>{t("details.questions.description")}</p>
            <form onSubmit={handleSubmit} className="w-full ">
              <div className="flex mb-4 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 ">
                <div className="relative w-full">
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    placeholder={t("home.contact.form.first_name")}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="bg-white"
                  />
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
                    className="bg-white"
                  />
                </div>
                <div className="relative mb-4 w-full">
                  <LoadingButton
                    className="w-full"
                    variant="contained"
                    type="submit"
                    endIcon={<Send />}
                    loading={loading}
                    loadingPosition="end"
                  >
                    {t("details.questions.form.submit")}
                  </LoadingButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="h-[500px] w-full">
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
      </section>
    </>
  );
};

export default Questions;
