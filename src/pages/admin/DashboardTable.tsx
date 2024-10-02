import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import {
  getApartments,
  deleteApartment,
  updateApartment,
  uploadFile,
} from "../../firebase/firebaseUtils";
import { DataType } from "../../constants/data";
import { DeleteIcon, EditIcon } from "lucide-react";

const DashboardTable: React.FC = () => {
  const [apartments, setApartments] = useState<DataType[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentApartment, setCurrentApartment] = useState<DataType | null>(
    null
  );
  const [formData, setFormData] = useState<DataType>({
    id: "", // or 0 if you prefer a number for the initial state
    title_uz: "",
    title_ru: "",
    title_tr: "",
    title_ae: "",
    img1: null,
    img2: null,
    img3: null,
    price: "",
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
    area: "",
    furniture: false,
    repair: false,
    parking: false,
    floor: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apartmentsData = await getApartments();
        setApartments(apartmentsData);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditOpen = (apartment: DataType) => {
    setCurrentApartment(apartment);
    setFormData({
      id: apartment.id !== undefined ? String(apartment.id) : "",
      title_uz: apartment.title_uz || "",
      title_ru: apartment.title_ru || "",
      title_tr: apartment.title_tr || "",
      title_ae: apartment.title_ae || "",
      price: apartment.price || "",
      description_uz: apartment.description_uz || "",
      description_ru: apartment.description_ru || "",
      description_tr: apartment.description_tr || "",
      description_ae: apartment.description_ae || "",
      img1: null,
      img2: null,
      img3: null,
      rooms: apartment.rooms || "",
      location_uz: apartment.location_uz || "",
      location_ru: apartment.location_ru || "",
      location_tr: apartment.location_tr || "",
      location_ae: apartment.location_ae || "",
      type: apartment.type || "",
      mortgage: apartment.mortgage || false,
      area: apartment.area || "",
      furniture: apartment.furniture || false,
      repair: apartment.repair || false,
      parking: apartment.parking || false,
      floor: apartment.floor || 0,
    });

    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setCurrentApartment(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name.startsWith("img")) {
      setFormData((prev) => ({
        ...prev,
        [name]: files?.[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    if (currentApartment) {
      try {
        const sanitizedData: DataType = {
          id: formData.toString(),
          title_uz: formData.title_uz ?? "",
          title_ru: formData.title_ru ?? "",
          title_tr: formData.title_tr ?? "",
          title_ae: formData.title_ae ?? "",

          img1: formData.img1 ? await uploadFile(formData.img1) : "",
          img2: formData.img2 ? await uploadFile(formData.img2) : "",
          img3: formData.img3 ? await uploadFile(formData.img3) : "",

          price: formData.price ?? "",
          description_uz: formData.description_uz ?? "",
          description_ru: formData.description_ru ?? "",
          description_tr: formData.description_tr ?? "",
          description_ae: formData.description_ae ?? "",

          rooms: formData.rooms ?? "",
          location_uz: formData.location_uz ?? "",
          location_ru: formData.location_ru ?? "",
          location_tr: formData.location_tr ?? "",
          location_ae: formData.location_ae ?? "",

          type: formData.type as "business_center" | "beach" | "standard",

          mortgage: formData.mortgage === false,
          area: formData.area ?? "",

          furniture: formData.furniture === false,
          repair: formData.repair === false,
          parking: formData.parking === false,

          floor: Number(formData.floor) || 0,
        };

        const apartmentId = currentApartment.id?.toString() || "";

        await updateApartment(apartmentId, sanitizedData);

        setApartments((prev) =>
          prev.map((apartment) =>
            apartment.id === currentApartment.id
              ? { ...apartment, ...sanitizedData }
              : apartment
          )
        );

        setSnackbarMessage("Apartment updated successfully!");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error updating apartment:", error);
        setSnackbarMessage("Failed to update apartment.");
        setSnackbarOpen(true);
      }
      handleEditClose();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this apartment?")) {
      try {
        await deleteApartment(id);
        const apartmentsData = await getApartments(); // Call without id
        setApartments(apartmentsData);
        setSnackbarMessage("Apartment deleted successfully!");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error deleting apartment:", error);
        setSnackbarMessage("Failed to delete apartment.");
        setSnackbarOpen(true);
      }
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <TableContainer
        sx={{ boxShadow: 3, borderRadius: 2, border: "1px solid #ddd" }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Title (UZ)
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Title (RU)
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Title (TR)
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Title (AE)
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Price
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Description (UZ)
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Description (RU)
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Description (TR)
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Description (AE)
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Rooms
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Location (UZ)
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Location (RU)
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Location (TR)
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Location (AE)
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Type
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Mortgage
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Area
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Furniture
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Repair
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Parking
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Floor
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Images 1
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Images 2
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
              >
                Images 3
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid #ddd", fontWeight: "bold" }}
                align="center"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apartments.map((apartment) => (
              <TableRow
                key={apartment.id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                  "&:hover": { backgroundColor: "#eaeaea" },
                  borderBottom: "1px solid #ddd",
                }}
              >
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.id}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.title_uz}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.title_ru}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.title_tr}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.title_ae}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.price}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.description_uz}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.description_ru}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.description_tr}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.description_ae}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.rooms}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.location_uz}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.location_ru}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.location_tr}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.location_ae}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.type}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.mortgage ? "Available" : "Not Available"}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.area}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.furniture ? "Yes" : "No"}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.repair ? "Yes" : "No"}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.parking ? "Yes" : "No"}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.floor}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.img1 && (
                    <img
                      src={
                        typeof apartment.img1 === "string"
                          ? apartment.img1
                          : URL.createObjectURL(apartment.img1)
                      }
                      alt="Image 1"
                      style={{ width: 50, height: 50, borderRadius: 4 }}
                    />
                  )}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.img2 && (
                    <img
                      src={
                        typeof apartment.img2 === "string"
                          ? apartment.img2
                          : URL.createObjectURL(apartment.img2)
                      }
                      alt="Image 2"
                      style={{ width: 50, height: 50, borderRadius: 4 }}
                    />
                  )}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd" }}>
                  {apartment.img3 && (
                    <img
                      src={
                        typeof apartment.img3 === "string"
                          ? apartment.img3
                          : URL.createObjectURL(apartment.img3)
                      }
                      alt="Image 3"
                      style={{ width: 50, height: 50, borderRadius: 4 }}
                    />
                  )}
                </TableCell>
                <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditOpen(apartment)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(String(apartment.id))} 
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.includes("Failed") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Edit Apartment Modal */}
      <Dialog open={editModalOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Apartment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update this apartment, please enter the new details below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            name="title_uz"
            type="text"
            fullWidth
            value={formData.title_uz}
            onChange={handleEditChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            name="title_ru"
            type="text"
            fullWidth
            value={formData.title_ru}
            onChange={handleEditChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            name="title_tr"
            type="text"
            fullWidth
            value={formData.title_tr}
            onChange={handleEditChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            name="title_ae"
            type="text"
            fullWidth
            value={formData.title_ae}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="text"
            fullWidth
            value={formData.price}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Rooms"
            name="rooms"
            type="text"
            fullWidth
            value={formData.rooms}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Location"
            name="location_uz"
            type="text"
            fullWidth
            value={formData.location_uz}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Location"
            name="location_ru"
            type="text"
            fullWidth
            value={formData.location_ru}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Location"
            name="location_tr"
            type="text"
            fullWidth
            value={formData.location_tr}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Location"
            name="location_ae"
            type="text"
            fullWidth
            value={formData.location_ae}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description_uz"
            type="text"
            fullWidth
            value={formData.description_uz}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description_ru"
            type="text"
            fullWidth
            value={formData.description_ru}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description_tr"
            type="text"
            fullWidth
            value={formData.description_tr}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description_ae"
            type="text"
            fullWidth
            value={formData.description_ae}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Maydoni"
            name="area"
            type="text"
            fullWidth
            value={formData.area}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Qavati"
            name="floor"
            type="text"
            fullWidth
            value={formData.floor}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Image 1"
            name="img1"
            type="file"
            fullWidth
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Image 2"
            name="img2"
            type="file"
            fullWidth
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Image 3"
            name="img3"
            type="file"
            fullWidth
            onChange={handleEditChange}
          />
          <div className="flex flex-col">
            <label htmlFor="">Ipoteka</label>
            <FormControlLabel
              control={
                <Checkbox
                  name="mortgage"
                  checked={formData.mortgage}
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
                  checked={formData.furniture}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Jihozlar mavjud"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Ta'mir</label>
            <FormControlLabel
              control={
                <Checkbox
                  name="repair"
                  checked={formData.repair}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Ta'mir mavjud"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Avto turargoh</label>
            <FormControlLabel
              control={
                <Checkbox
                  name="parking"
                  checked={formData.parking}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Avto turargoh mavjud"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Turi</label>
            <Select
              name="type"
              id="demo-simple-select"
              onChange={handleSelectChange}
              value={formData.type || ""}
            >
              <MenuItem value={"business_center"}>Biznes Senter</MenuItem>
              <MenuItem value={"beach"}>Beach</MenuItem>
              <MenuItem value={"standard"}>Standard</MenuItem>
            </Select>
          </div>
          {/* Add more fields as necessary */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DashboardTable;
