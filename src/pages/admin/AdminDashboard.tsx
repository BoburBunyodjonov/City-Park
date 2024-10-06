import { Contact, Home, Image } from "lucide-react";
import { MuiFileInput } from "mui-file-input";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addApartment, updateApartment, uploadFile } from "../../firebase/firebaseUtils";

// import { v4 as uuidv4 } from "uuid";
import { Close, Comment, Folder, Photo } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { DataType } from "../../constants/data";
import { firestore } from "../../firebase/firebaseConfig";
import BannerAdd from "./BannerAdd";
import CommitAdd from "./CommitAdd";
import ContactTable from "./ContactTable";
import DashboardTable from "./DashboardTable";
import QuestionsTable from "./QuestionsTable";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login'); 
    }
  }, [navigate]);
  const [apartmentData, setApartmentData] = useState<DataType>({
    id: undefined,
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
    rooms: 0,
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
    catalog_file: null,
  });
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "add" | "manage" | "settings" | "contacts" | "questions"
  >("add");

  const handleAddApartment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const img1Url = apartmentData.img1 ? await uploadFile(apartmentData.img1) : apartmentData.img1;
      const img2Url = apartmentData.img2 ? await uploadFile(apartmentData.img2) : apartmentData.img2;
      const img3Url = apartmentData.img3 ? await uploadFile(apartmentData.img3) : apartmentData.img3;
      const catalog_file = apartmentData.catalog_file ? await uploadFile(apartmentData.catalog_file) : apartmentData.catalog_file;
  
      if (apartmentData.id) {
        await updateApartment(apartmentData.id, {
          title_uz: apartmentData.title_uz,
          title_ru: apartmentData.title_ru,
          title_tr: apartmentData.title_tr,
          title_ae: apartmentData.title_ae,
          img1: apartmentData.img1,
          img2: apartmentData.img2,
          img3: apartmentData.img3,
          price: apartmentData.price,
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
          catalog_file: catalog_file,
        });
        toast.success("Apartment updated successfully");
      } else {
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
          price: apartmentData.price,
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
          catalog_file: catalog_file,
        });
        toast.success("Apartment added successfully");
      }
  
      setApartmentData({
        id: undefined,
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
        rooms: 0,
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
        catalog_file: null,
      });
  
      setLoading(false);
      setAddModalOpen(false);
      setRender((prev) => !prev);
    } catch (error) {
      setLoading(false);
      console.error("Error adding/updating apartment:", error);
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

  const handleFileChange = (file: File | null, imgField: string) => {
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
          <li
            className={`flex cursor-pointer items-center p-2 mb-2 hover:bg-secondary rounded transition-colors ${
              activeTab === "questions" ? "bg-secondary" : ""
            }`}
            onClick={() => setActiveTab("questions")}
          >
            <Contact className="mr-2" />
            <span>Questions</span>
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
              style={{ backgroundColor: "#1EA582" }}
              onClick={() => {
                setAddModalOpen(true);
              }}
              sx={{ marginBottom: "20px" }}
              disableElevation
            >
              Add Apartment
            </Button>

            <DashboardTable
              setAddModalOpen={setAddModalOpen}
              setApartmentData={setApartmentData}
              render={render}
            />

            <Dialog
              open={addModalOpen}
              onClose={() => setAddModalOpen(false)}
              fullScreen
            >
              <AppBar sx={{ position: "relative", boxShadow: "none" }}>
                <Toolbar className="flex justify-between items-center">
                  <Typography variant="h6" component="div">
                    Add Apartment
                  </Typography>
                  <IconButton
                    edge="start"
                    onClick={() => setAddModalOpen(false)}
                    aria-label="close"
                  >
                    <Close className="text-white" />
                  </IconButton>
                </Toolbar>
              </AppBar>
              <DialogContent>
                <form onSubmit={handleAddApartment}>
                  <div className="grid grid-cols-4 gap-3">
                    <TextField
                      size="small"
                      required
                      type="text"
                      name="title_uz"
                      placeholder="Title (uz)"
                      label="Title (uz)"
                      variant="outlined"
                      value={apartmentData.title_uz}
                      onChange={handleInputChange}
                    />
                    <TextField
                      size="small"
                      required
                      type="text"
                      name="title_ru"
                      placeholder="Title (ru)"
                      label="Title (ru)"
                      variant="outlined"
                      value={apartmentData.title_ru}
                      onChange={handleInputChange}
                    />
                    <TextField
                      size="small"
                      required
                      type="text"
                      name="title_tr"
                      placeholder="Title (tr)"
                      label="Title (tr)"
                      variant="outlined"
                      value={apartmentData.title_tr}
                      onChange={handleInputChange}
                    />
                    <TextField
                      size="small"
                      required
                      type="text"
                      name="title_ae"
                      placeholder="Title (ae)"
                      label="Title (ae)"
                      variant="outlined"
                      value={apartmentData.title_ae}
                      onChange={handleInputChange}
                    />
                    <TextField
                      size="small"
                      required
                      type="text"
                      name="location_uz"
                      placeholder="Location (uz)"
                      label="Location (uz)"
                      variant="outlined"
                      value={apartmentData.location_uz}
                      onChange={handleInputChange}
                    />
                    <TextField
                      size="small"
                      required
                      type="text"
                      name="location_ru"
                      placeholder="Location (ru)"
                      label="Location (ru)"
                      variant="outlined"
                      value={apartmentData.location_ru}
                      onChange={handleInputChange}
                    />

                    <TextField
                      size="small"
                      required
                      type="text"
                      name="location_tr"
                      placeholder="Location (tr)"
                      label="Location (tr)"
                      variant="outlined"
                      value={apartmentData.location_tr}
                      onChange={handleInputChange}
                    />
                    <TextField
                      size="small"
                      required
                      type="text"
                      name="location_ae"
                      placeholder="Location (ae)"
                      label="Location (ae)"
                      variant="outlined"
                      value={apartmentData.location_ae}
                      onChange={handleInputChange}
                    />
                    <TextField
                      size="small"
                      multiline
                      rows={4}
                      name="description_uz"
                      placeholder="Description (uz)"
                      label="Description (uz)"
                      value={apartmentData.description_uz}
                      onChange={handleInputChange}
                    />
                    <TextField
                      size="small"
                      multiline
                      rows={4}
                      name="description_ru"
                      placeholder="Description (ru)"
                      label="Description (ru)"
                      value={apartmentData.description_ru}
                      onChange={handleInputChange}
                    />
                    <TextField
                      size="small"
                      multiline
                      rows={4}
                      name="description_tr"
                      placeholder="Description (tr)"
                      label="Description (tr)"
                      value={apartmentData.description_tr}
                      onChange={handleInputChange}
                    />
                    <TextField
                      size="small"
                      multiline
                      rows={4}
                      name="description_ae"
                      placeholder="Description (ae)"
                      label="Description (ae)"
                      value={apartmentData.description_ae}
                      onChange={handleInputChange}
                    />
                    <div className="col-span-4 py-5">
                      <Divider />
                    </div>
                    <TextField
                      size="small"
                      required
                      type="number"
                      name="price"
                      placeholder="Price"
                      label="Price"
                      variant="outlined"
                      value={apartmentData.price}
                      onChange={handleInputChange}
                    />
                    <TextField
                      size="small"
                      required
                      type="number"
                      name="rooms"
                      placeholder="Room count"
                      label="Room count"
                      variant="outlined"
                      value={apartmentData.rooms}
                      onChange={handleInputChange}
                    />

                    <TextField
                      size="small"
                      required
                      type="number"
                      name="area"
                      placeholder="Area (km)"
                      label="Area (km)"
                      variant="outlined"
                      value={apartmentData.area}
                      onChange={handleInputChange}
                    />

                    <TextField
                      size="small"
                      required
                      type="number"
                      name="floor"
                      label="Floor"
                      placeholder="Floor"
                      variant="outlined"
                      value={apartmentData.floor}
                      onChange={handleInputChange}
                    />

                    <MuiFileInput
                      label="Main image"
                      size="small"
                      variant="outlined"
                      value={apartmentData.img1}
                      onChange={(e) => handleFileChange(e, "img1")}
                      InputProps={{
                        inputProps: {
                          accept: "image/*",
                        },
                        startAdornment: <Photo />,
                      }}
                    />

                    <MuiFileInput
                      label="Main image"
                      size="small"
                      variant="outlined"
                      value={apartmentData.img2}
                      onChange={(e) => handleFileChange(e, "img2")}
                      InputProps={{
                        inputProps: {
                          accept: "image/*",
                        },
                        startAdornment: <Photo />,
                      }}
                    />

                    <MuiFileInput
                      label="Main image"
                      size="small"
                      variant="outlined"
                      value={apartmentData.img3}
                      onChange={(e) => handleFileChange(e, "img3")}
                      InputProps={{
                        inputProps: {
                          accept: "image/*",
                        },
                        startAdornment: <Photo />,
                      }}
                    />
                    <MuiFileInput
                      label="Main image"
                      size="small"
                      variant="outlined"
                      value={apartmentData.catalog_file}
                      onChange={(e) => handleFileChange(e, "catalog_file")}
                      InputProps={{
                        inputProps: {
                          accept: "image/*,application/pdf",
                        },
                        startAdornment: <Folder />,
                      }}
                    />

                    <Select
                      name="type"
                      size="small"
                      onChange={handleSelectChange}
                      value={apartmentData.type}
                    >
                      <MenuItem value={"business_center"}>
                        Business center
                      </MenuItem>
                      <MenuItem value={"beach"}>Beach</MenuItem>
                      <MenuItem value={"standard"}>Standard</MenuItem>
                    </Select>
                    <div className="col-span-3 grid grid-cols-4">
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="mortgage"
                            checked={apartmentData.mortgage}
                            onChange={handleCheckboxChange}
                            color="primary"
                          />
                        }
                        label="Mortgage"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="furniture"
                            checked={apartmentData.furniture}
                            onChange={handleCheckboxChange}
                            color="primary"
                          />
                        }
                        label="Furniture"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="repair"
                            checked={apartmentData.repair}
                            onChange={handleCheckboxChange}
                            color="primary"
                          />
                        }
                        label="Repaired"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            name="parking"
                            checked={apartmentData.parking}
                            onChange={handleCheckboxChange}
                            color="primary"
                          />
                        }
                        label="Parking lot"
                      />
                    </div>
                  </div>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    className="bg-primary py-4"
                    style={{ backgroundColor: "#1EA582" }}
                    sx={{ marginTop: "50px" }}
                    disableElevation
                    loading={loading}
                  >
                    Add Apartment
                  </LoadingButton>
                </form>
              </DialogContent>
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
        {activeTab === "questions" && (
          <>
            <QuestionsTable />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
