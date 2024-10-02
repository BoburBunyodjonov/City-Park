import React, { useState } from "react";
import {
  Home,
  Building,
  Settings,
  LogOut,
  Contact,
  CommandIcon,
  LetterText,
  Image,
} from "lucide-react";
import { addApartment } from "../../firebase/firebaseUtils";
import { uploadFile } from "../../firebase/firebaseUtils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig";
import DashboardTable from "./DashboardTable";
import { DataType } from "../../constants/data";
import BannerAdd from "./BannerAdd";
import CommitAdd from "./CommitAdd";
import { Comment } from "@mui/icons-material";
import ContactTable from "./ContactTable";

const AdminDashboard: React.FC = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [apartmentData, setApartmentData] = useState<DataType>({
    title_uz: "",
    title_ru: "",
    title_tr: "",
    title_ae: "",
    img1: null,
    img2: null,
    img3: null,
    price: 0,
    description_uz: "",
    description_ru: "",
    description_tr: "",
    description_ae: "",
    rooms: "",
    location_uz: "",
    location_ru: "",
    location_tr: "",
    location_ae: "",
    type: "standard",
    mortgage: false,
    area: 0,
    furniture: false,
    repair: false,
    parking: false,
    floor: 0,
  });

  const [activeTab, setActiveTab] = useState<
    "add" | "manage" | "settings" | "contacts"
  >("add");

  const handleAddApartment = async () => {
    if (!apartmentData.img1 || !apartmentData.img2 || !apartmentData.img3) {
      alert("Please select all images.");
      return;
    }

    try {
      const img1Url = await uploadFile(apartmentData.img1).catch((err) => {
        console.error("Failed to upload img1:", err);
        throw new Error("Failed to upload first image.");
      });
      const img2Url = await uploadFile(apartmentData.img2).catch((err) => {
        console.error("Failed to upload img2:", err);
        throw new Error("Failed to upload second image.");
      });
      const img3Url = await uploadFile(apartmentData.img3).catch((err) => {
        console.error("Failed to upload img3:", err);
        throw new Error("Failed to upload third image.");
      });

      const counterRef = doc(firestore, "counters", "productCounter");
      const counterSnap = await getDoc(counterRef);

      let newId: number;

      if (counterSnap.exists()) {
        newId = counterSnap.data().currentId + 1;
        await updateDoc(counterRef, {
          currentId: increment(1),
        });
      } else {
        console.error("Counter document doesn't exist, creating it now.");
        newId = 1;
        await setDoc(counterRef, { currentId: newId });
      }

      await addApartment({
        title_uz: apartmentData.title_uz,
        title_ru: apartmentData.title_ru,
        title_tr: apartmentData.title_tr,
        title_ae: apartmentData.title_ae,
        img1: img1Url,
        img2: img2Url,
        img3: img3Url,
        price: +apartmentData.price,
        description_uz: apartmentData.description_uz,
        description_ru: apartmentData.description_ru,
        description_tr: apartmentData.description_tr,
        description_ae: apartmentData.description_ae,
        rooms: apartmentData.rooms,
        location_uz: apartmentData.location_uz,
        location_ru: apartmentData.location_ru,
        location_tr: apartmentData.location_tr,
        location_ae: apartmentData.location_ae,
        type: apartmentData.type,
        mortgage: apartmentData.mortgage,
        area: +apartmentData.area,
        furniture: apartmentData.furniture,
        repair: apartmentData.repair,
        parking: apartmentData.parking,
        floor: +apartmentData.floor,
      });

      setApartmentData({
        title_uz: "",
        title_ru: "",
        title_tr: "",
        title_ae: "",
        img1: null,
        img2: null,
        img3: null,
        price: 0,
        description_uz: "",
        description_ru: "",
        description_tr: "",
        description_ae: "",
        rooms: "",
        location_uz: "",
        location_ru: "",
        location_tr: "",
        location_ae: "",
        type: "standard",
        mortgage: false,
        area: 0,
        furniture: false,
        repair: false,
        parking: false,
        floor: 0,
      });

      toast.success("Kvartira qo'shildi");
    } catch (error) {
      console.error("Error adding apartment:", error);
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;

    setApartmentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;

    setApartmentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setApartmentData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    imgField: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setApartmentData((prevState) => ({
        ...prevState,
        [imgField]: file,
      }));
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <div
        className={`bg-primary text-white w-64 p-4 transition-transform duration-300`}
      >
        <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
        <ul>
          <li
            className={`flex cursor-pointer items-center p-2 mb-2 hover:bg-secondary rounded transition-colors ${
              activeTab === "add" ? "bg-secondary" : ""
            }`}
            onClick={() => setActiveTab("add")}
          >
            <Home className="mr-2" />
            <span>Apartment</span>
          </li>
          <li
            className={`flex cursor-pointer items-center p-2 mb-2 hover:bg-secondary rounded transition-colors ${
              activeTab === "manage" ? "bg-secondary" : ""
            }`}
            onClick={() => setActiveTab("manage")}
          >
            <Image className="mr-2" />
            <span>Banners</span>
          </li>
          <li
            className={`flex cursor-pointer items-center p-2 mb-2 hover:bg-secondary rounded transition-colors ${
              activeTab === "settings" ? "bg-secondary" : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <Comment className="mr-2" />
            <span>Comments</span>
          </li>
          <li
            className={`flex cursor-pointer items-center p-2 mb-2 hover:bg-secondary rounded transition-colors ${
              activeTab === "contacts" ? "bg-secondary" : ""
            }`}
            onClick={() => setActiveTab("contacts")}
          >
            <Contact className="mr-2" />
            <span>Contacts</span>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === "add" && (
          <>
            <ToastContainer />
            <Button
              variant="contained"
              className="bg-primary"
              style={{backgroundColor: "#1EA582"}}
              onClick={() => {
                setAddModalOpen(true);
              }}
              sx={{ marginBottom: "20px" }}
            >
              Add Apartment
            </Button>

            <DashboardTable />

            <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)}>
              <DialogTitle>Edit Apartment</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To update this apartment, please enter the new details below.
                </DialogContentText>
                <div className="grid grid-cols-3 gap-3">
                  <TextField
                    id="outlined-basic"
                    type="text"
                    name="title_uz"
                    placeholder="Nomi"
                    label="Nomi"
                    variant="outlined"
                    value={apartmentData.title_uz}
                    onChange={handleInputChange}
                  />
                  <TextField
                    id="outlined-basic"
                    type="text"
                    name="title_ru"
                    placeholder="Nomi"
                    label="Nomi"
                    variant="outlined"
                    value={apartmentData.title_ru}
                    onChange={handleInputChange}
                  />
                  <TextField
                    id="outlined-basic"
                    type="text"
                    name="title_tr"
                    placeholder="Nomi"
                    label="Nomi"
                    variant="outlined"
                    value={apartmentData.title_tr}
                    onChange={handleInputChange}
                  />
                  <TextField
                    id="outlined-basic"
                    type="text"
                    name="title_ae"
                    placeholder="Nomi"
                    label="Nomi"
                    variant="outlined"
                    value={apartmentData.title_ae}
                    onChange={handleInputChange}
                  />
                  <TextField
                    type="text"
                    name="price"
                    placeholder="Narxi"
                    label="Narxi"
                    variant="outlined"
                    value={apartmentData.price}
                    onChange={handleInputChange}
                  />
                  <TextField
                    type="text"
                    name="rooms"
                    placeholder="Xona soni"
                    label="Xona soni"
                    variant="outlined"
                    value={apartmentData.rooms}
                    onChange={handleInputChange}
                  />
                  <TextField
                    type="text"
                    name="location_uz"
                    placeholder="Joylashuv (Lakatsiya) Uzbekcha"
                    label="Joylashuv (Lakatsiya)"
                    variant="outlined"
                    value={apartmentData.location_uz}
                    onChange={handleInputChange}
                  />
                  <TextField
                    type="text"
                    name="location_ru"
                    placeholder="Joylashuv (Lakatsiya) Ruscha"
                    label="Joylashuv (Lakatsiya)"
                    variant="outlined"
                    value={apartmentData.location_ru}
                    onChange={handleInputChange}
                  />

                  <TextField
                    type="text"
                    name="location_tr"
                    placeholder="Joylashuv (Lakatsiya) Turchka"
                    label="Joylashuv (Lakatsiya)"
                    variant="outlined"
                    value={apartmentData.location_tr}
                    onChange={handleInputChange}
                  />
                  <TextField
                    type="text"
                    name="location_ae"
                    placeholder="Joylashuv (Lakatsiya) Arabcha"
                    label="Joylashuv (Lakatsiya)"
                    variant="outlined"
                    value={apartmentData.location_ae}
                    onChange={handleInputChange}
                  />

                  <TextField
                    type="text"
                    name="area"
                    placeholder="Maydoni"
                    label="Maydoni"
                    variant="outlined"
                    value={apartmentData.area}
                    onChange={handleInputChange}
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "img1")}
                    className="border border-gray-300 rounded p-3 w-full mb-4"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "img2")}
                    className="border border-gray-300 rounded p-3 w-full mb-4"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "img3")}
                    className="border border-gray-300 rounded p-3 w-full mb-4"
                  />

                  <div className="flex flex-col">
                    <label htmlFor="">Mortgage</label>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="mortgage"
                          checked={apartmentData.mortgage}
                          onChange={handleCheckboxChange}
                          color="primary"
                        />
                      }
                      label="Ipoteka mavjud"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Jihozlar</label>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="furniture"
                          checked={apartmentData.furniture}
                          onChange={handleCheckboxChange}
                          color="primary"
                        />
                      }
                      label="Jihoz mavjud"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Ta'mir</label>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="repair"
                          checked={apartmentData.repair}
                          onChange={handleCheckboxChange}
                          color="primary"
                        />
                      }
                      label="Ta'mir mavjud"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="">Avto Turargon</label>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="parking"
                          checked={apartmentData.parking}
                          onChange={handleCheckboxChange}
                          color="primary"
                        />
                      }
                      label="Avto turargon mavjud"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Turi</label>
                    <Select
                      id="demo-simple-select"
                      name="type"
                      onChange={handleSelectChange}
                      value={apartmentData.type || ""}
                    >
                      <MenuItem value={"business_center"}>
                        Biznes Senter
                      </MenuItem>
                      <MenuItem value={"beach"}>Beach</MenuItem>
                      <MenuItem value={"standard"}>Standard</MenuItem>
                    </Select>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="">Qavati</label>
                    <TextField
                      type="text"
                      name="floor"
                      placeholder="Qavati"
                      variant="outlined"
                      value={apartmentData.floor}
                      onChange={handleInputChange}
                    />
                  </div>
                  <textarea
                    name="description_uz"
                    placeholder="Description"
                    className="border border-gray-300 rounded p-3 w-full mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    value={apartmentData.description_uz}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name="description_ru"
                    placeholder="Description"
                    className="border border-gray-300 rounded p-3 w-full mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    value={apartmentData.description_ru}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name="description_tr"
                    placeholder="Description"
                    className="border border-gray-300 rounded p-3 w-full mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    value={apartmentData.description_tr}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name="description_ae"
                    placeholder="Description"
                    className="border border-gray-300 rounded p-3 w-full mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    value={apartmentData.description_ae}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  onClick={handleAddApartment}
                  className="bg-blue-600 text-white rounded p-3 w-full hover:bg-blue-700 transition"
                >
                  Kvartira qo'shish
                </button>
              </DialogContent>
              {/* <DialogActions>
                <Button onClick={handleEditClose}>Cancel</Button>
                <Button onClick={handleEditSubmit}>Update</Button>
              </DialogActions> */}
            </Dialog>
          </>
        )}

        {activeTab === "manage" && (
          <>
            <BannerAdd />
          </>
        )}

        {activeTab === "settings" && (
          <>
            <CommitAdd />
          </>
        )}

        {activeTab === "contacts" && (
          <>
            <ContactTable />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
