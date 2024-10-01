import React, { useState } from "react";
import { Home, Building, Settings, LogOut } from "lucide-react"; // Importing Lucide icons
import { addApartment } from "../../firebase/firebaseUtils"; // Adjust the import path
import { uploadFile } from "../../firebase/firebaseUtils"; // Function to upload images
import { v4 as uuidv4 } from "uuid";
import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

const AdminDashboard: React.FC = () => {
  const [apartmentData, setApartmentData] = useState<{
    id: string;
    title: string;
    price: string;
    description: string;
    img1: File | null;
    img2: File | null;
    img3: File | null;
    rooms: string;
    location: string;
    type: string;
    ipoteka: string;
    area: string;
    furniture: string;
    repair: string;
    parking: string;
    currency: string;
    floor: string;
  }>({
    id: "",
    title: "",
    price: "",
    description: "",
    img1: null,
    img2: null,
    img3: null,
    rooms: "",
    location: "",
    type: "",
    ipoteka: "",
    area: "",
    furniture: "",
    repair: "",
    parking: "",
    currency: "",
    floor: "",
  });
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"add" | "manage" | "settings">("add");
  
  const handleAddApartment = async () => {
    const apartmentId = uuidv4();
  
    if (!apartmentData.img1 || !apartmentData.img2 || !apartmentData.img3) {
      alert("Please select all images.");
      return;
    }
  
    try {
      const img1Url = await uploadFile(apartmentData.img1);
      const img2Url = await uploadFile(apartmentData.img2);
      const img3Url = await uploadFile(apartmentData.img3);
  
      await addApartment({
        id: apartmentId,  
        title: apartmentData.title,
        price: apartmentData.price,
        description: apartmentData.description,
        img1: img1Url,
        img2: img2Url,
        img3: img3Url,
        rooms: apartmentData.rooms,
        location: apartmentData.location,
        type: apartmentData.type,
        ipoteka: apartmentData.ipoteka,
        area: apartmentData.area,
        furniture: apartmentData.furniture,
        repair: apartmentData.repair,
        parking: apartmentData.parking,
        currency: apartmentData.currency,
        floor: apartmentData.floor,
      });
  
      setApartmentData({
        id: apartmentId,
        title: "",
        price: "",
        description: "",
        img1: null,
        img2: null,
        img3: null,
        rooms: "",
        location: "",
        type: "",
        ipoteka: "",
        area: "",
        furniture: "",
        repair: "",
        parking: "",
        currency: "$",
        floor: "",
      });
  
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error adding apartment:", error);
    }
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
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
            <span>Add Apartment</span>
          </li>
          <li
            className={`flex cursor-pointer items-center p-2 mb-2 hover:bg-secondary rounded transition-colors ${
              activeTab === "manage" ? "bg-secondary" : ""
            }`}
            onClick={() => setActiveTab("manage")}
          >
            <Building className="mr-2" />
            <span>Manage Apartments</span>
          </li>
          <li
            className={`flex cursor-pointer items-center p-2 mb-2 hover:bg-secondary rounded transition-colors ${
              activeTab === "settings" ? "bg-secondary" : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="mr-2" />
            <span>Settings</span>
          </li>
          <li className="flex cursor-pointer items-center p-2 mb-2 hover:bg-secondary rounded transition-colors">
            <LogOut className="mr-2" />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === "add" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Add Apartment</h1>
            <div className="grid grid-cols-3 gap-3">
              <TextField
                id="outlined-basic"
                type="text"
                name="title"
                placeholder="Nomi"
                label="Nomi"
                variant="outlined"
                value={apartmentData.title}
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
                name="location"
                placeholder="Joylashuv (Lakatsiya)"
                label="Joylashuv (Lakatsiya)"
                variant="outlined"
                value={apartmentData.location}
                onChange={handleInputChange}
              />
              <TextField
                type="text"
                name="currency"
                placeholder="Pul birligi"
                variant="outlined"
                value={apartmentData.currency}
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
                <label htmlFor="">Ipoteka</label>
                <Select
                  name="ipoteka"
                  id="demo-simple-select"
                  onChange={handleSelectChange}
                  value={apartmentData.ipoteka || ""}
                >
                  <MenuItem value={"Mavjud"}>Mavjud</MenuItem>
                  <MenuItem value={"Mavjud emas"}>Mavjud emas</MenuItem>
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Jihozlar</label>
                <Select
                  id="demo-simple-select"
                  name="furniture"
                  onChange={handleSelectChange}
                  value={apartmentData.furniture || ""}
                >
                  <MenuItem value={"Mavjud"}>Mavjud</MenuItem>
                  <MenuItem value={"Mavjud emas"}>Mavjud emas</MenuItem>
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Ta'mir</label>
                <Select
                  id="demo-simple-select"
                  name="repair"
                  onChange={handleSelectChange}
                  value={apartmentData.repair || ""}
                >
                  <MenuItem value={"Mavjud"}>Mavjud</MenuItem>
                  <MenuItem value={"Mavjud emas"}>Mavjud emas</MenuItem>
                </Select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Avto Turargon</label>
                <Select
                  id="demo-simple-select"
                  name="parking"
                  onChange={handleSelectChange}
                  value={apartmentData.parking || ""}
                >
                  <MenuItem value={"Mavjud"}>Mavjud</MenuItem>
                  <MenuItem value={"Mavjud emas"}>Mavjud emas</MenuItem>
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Turi</label>
                <Select
                  id="demo-simple-select"
                  name="type"
                  onChange={handleSelectChange}
                  value={apartmentData.type || ""}
                >
                  <MenuItem value={"Turar joy majmuasi"}>
                    Turar joy majmuasi
                  </MenuItem>
                  <MenuItem value={"Do'kon"}>Do'kon</MenuItem>
                  <MenuItem value={"Office"}>Office</MenuItem>
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
                name="description"
                placeholder="Description"
                className="border border-gray-300 rounded p-3 w-full mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                value={apartmentData.description}
                onChange={handleInputChange}
              />
            </div>
            <button
              onClick={handleAddApartment}
              className="bg-blue-600 text-white rounded p-3 w-full hover:bg-blue-700 transition"
            >
              Add Apartment
            </button>

            {snackbarOpen && (
              <div className="bg-green-600 text-white p-4 rounded mt-4">
                Apartment added successfully!
              </div>
            )}
          </>
        )}

        {activeTab === "manage" && (
          <h1 className="text-3xl font-bold mb-6">Manage Apartments</h1>
        )}

        {activeTab === "settings" && (
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;