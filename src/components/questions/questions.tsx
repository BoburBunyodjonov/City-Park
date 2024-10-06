import { Send } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Questions = () => {
  const { t } = useTranslation();
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
      <section className="text-black body-font" id="contact">
        <div className="p-10 mx-auto gap-7 bg-[#20A58233] rounded-3xl">
          <h1 className="text-black text-2xl font-bold mb-2">
            {t("details.questions.title")}
          </h1>
          <p className="mb-5">{t("details.questions.description")}</p>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex mb-4 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 ">
              <div className="relative w-full">
                <TextField
                  size="small"
                  fullWidth
                  variant="outlined"
                  placeholder={t("home.contact.form.first_name")}
                  value={firstName}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z]*$/.test(value)) {
                      setFirstName(value);
                    }
                  }}
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
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\+?\d*$/.test(value)) {
                      setPhone(value);
                    }
                  }}
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
                  disableElevation
                >
                  {t("details.questions.form.submit")}
                </LoadingButton>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Questions;
