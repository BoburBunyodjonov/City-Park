import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import useLayoutContext from "../services/layoutContext";
import Loading from "../../components/loading/Loading";
import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

import { Modal, Box, TextField } from "@mui/material";

import CallCenter from "../../assets/call.png";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Send } from "@mui/icons-material";

const RootLayout = () => {
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const {
    state: { loading },
  } = useLayoutContext();

  useEffect(() => {
    if (loading === false) {
      window.scrollTo({ top: 0 });
    }
  }, [loading]);

  const [opeModalCall, setOpenModalCall] = useState(false);

  const handleOpen = () => setOpenModalCall(true);
  const handleClose = () => setOpenModalCall(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleOpen();
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setFormLoading(true);
      const db = getFirestore();
      await addDoc(collection(db, "questions"), {
        firstName,
        phone,
        timestamp: new Date(),
      });
      toast.success(t("home.contact.form.success"));
      setFirstName("");
      setPhone("");
      setFormLoading(false);
      handleClose();
    } catch (error) {
      setFormLoading(false);
      console.error("Error adding document: ", error);
      toast.success(t("home.contact.form.error"));
    }
  };

  return (
    <>
      {loading && <Loading />}
      <Navbar />
      <div className="container mx-auto">
        <Outlet />

        <Modal
          open={opeModalCall}
          onClose={handleClose}
          className="rounded-2xl"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              borderRadius: "20px",
              border: "1px solid white",
              p: 1,
              display: "flex",
            }}
            className="w-[90%] md:w-auto"
          >
            <div className="flex flex-col md:flex-row w-full md:w-auto">
              <img
                src={CallCenter}
                alt="call-center-ikan-park"
                className="rounded-2xl w-full h-[305px] object-cover md:min-w-[250px]"
              />
              <form
                onSubmit={handleSubmit}
                className="w-full p-4 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl">{t("call.title")}</h1>
                  <p className="text-[#A6A6A6] text-base">
                    {t("call.description")}
                  </p>
                </div>
                <div className="w-full  flex flex-col justify-between md:flex-col space-y-4 ">
                  <div className="relative w-full">
                    <TextField
                      size="small"
                      fullWidth
                      variant="outlined"
                      placeholder={t("call.name")}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="bg-white w-full"
                    />
                  </div>
                  <div className="relative mb-4 w-full">
                    <TextField
                      size="small"
                      fullWidth
                      variant="outlined"
                      placeholder={t("call.phone_number")}
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
                      loading={formLoading}
                      loadingPosition="end"
                      disableElevation
                    >
                      {t("call.submit")}
                    </LoadingButton>
                  </div>
                </div>
              </form>
            </div>
          </Box>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
