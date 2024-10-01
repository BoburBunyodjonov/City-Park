import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
} from "@mui/material";
import {
  getApartments,
  deleteApartment,
  updateApartment,
  uploadFile,
} from "../../firebase/firebaseUtils";
import { DataType } from "../../constants/data";

const DashboardTable: React.FC = () => {
  const [apartments, setApartments] = useState<DataType[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentApartment, setCurrentApartment] = useState<DataType | null>(
    null
  );
  const [formData, setFormData] = useState<{
    id: string;
    title: string;
    price: string;
    description: string;
    img1: File | null; // Change type from string to File
    img2: File | null; // Change type from string to File
    img3: File | null; // Change type from string to File
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
        id: apartment.id !== undefined ? String(apartment.id) : "", // Convert id to string, default to empty string if undefined
      title: apartment.title || "", // Default to empty string if undefined
      price: apartment.price || "", // Default to empty string if undefined
      description: apartment.description || "",
      img1: null,
      img2: null,
      img3: null,
      rooms: apartment.rooms || "",
      location: apartment.location || "",
      type: apartment.type || "",
      ipoteka: apartment.ipoteka || "",
      area: apartment.area || "",
      furniture: apartment.furniture || "",
      repair: apartment.repair || "",
      parking: apartment.parking || "",
      currency: apartment.currency || "",
      floor: apartment.floor || "",
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
      // Handle file input for images
      setFormData((prev) => ({
        ...prev,
        [name]: files?.[0] || null, // Set the first file or null if none
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
          title: formData.title ?? "",
          price: formData.price ?? "", 
          description: formData.description ?? "", 
          img1: formData.img1 ? await uploadFile(formData.img1) : null, 
          img2: formData.img2 ? await uploadFile(formData.img2) : null, 
          img3: formData.img3 ? await uploadFile(formData.img3) : null, 
          rooms: formData.rooms ?? "", 
          location: formData.location ?? "", 
          type: formData.type ?? "", 
          ipoteka: formData.ipoteka ?? "", 
          area: formData.area ?? "", 
          furniture: formData.furniture ?? "", 
          repair: formData.repair ?? "",
          parking: formData.parking ?? "", 
          currency: formData.currency ?? "", 
          floor: formData.floor ?? "", 
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
        const apartmentsData = await getApartments(); 
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apartments.map((apartment) => (
              <TableRow key={apartment.id}>
                <TableCell>{apartment.id}</TableCell>
                <TableCell>{apartment.title}</TableCell>
                <TableCell>{apartment.price}</TableCell>
                <TableCell>{apartment.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditOpen(apartment)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(apartment.id?.toString() || "")}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
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
            name="title"
            type="text"
            fullWidth
            value={formData.title}
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
            name="location"
            type="text"
            fullWidth
            value={formData.location}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            type="text"
            fullWidth
            value={formData.description}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Pul birligi"
            name="currency"
            type="text"
            fullWidth
            value={formData.currency}
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
            type="file" // Change to file input for images
            fullWidth
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Image 2"
            name="img2"
            type="file" // Change to file input for images
            fullWidth
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Image 3"
            name="img3"
            type="file" // Change to file input for images
            fullWidth
            onChange={handleEditChange}
          />
          <div className="flex flex-col">
            <label htmlFor="">Ipoteka</label>
            <Select
              name="ipoteka"
              id="demo-simple-select"
              onChange={handleSelectChange}
              value={formData.ipoteka || ""}
            >
              <MenuItem value={"Mavjud"}>Mavjud</MenuItem>
              <MenuItem value={"Mavjud emas"}>Mavjud emas</MenuItem>
            </Select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Jihozlar</label>
            <Select
              name="furniture"
              id="demo-simple-select"
              onChange={handleSelectChange}
              value={formData.furniture || ""}
            >
              <MenuItem value={"Mavjud"}>Mavjud</MenuItem>
              <MenuItem value={"Mavjud emas"}>Mavjud emas</MenuItem>
            </Select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Ta'mir</label>
            <Select
              name="repair"
              id="demo-simple-select"
              onChange={handleSelectChange}
              value={formData.repair || ""}
            >
              <MenuItem value={"Mavjud"}>Mavjud</MenuItem>
              <MenuItem value={"Mavjud emas"}>Mavjud emas</MenuItem>
            </Select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Avto turargoh</label>
            <Select
              name="parking"
              id="demo-simple-select"
              onChange={handleSelectChange}
              value={formData.parking || ""}
            >
              <MenuItem value={"Mavjud"}>Mavjud</MenuItem>
              <MenuItem value={"Mavjud emas"}>Mavjud emas</MenuItem>
            </Select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Turi</label>
            <Select
              name="type"
              id="demo-simple-select"
              onChange={handleSelectChange}
              value={formData.type || ""}
            >
              <MenuItem value={"business_center"}>
                    Biznes Center
                  </MenuItem>
                  <MenuItem value={"Do'kon"}>Do'kon</MenuItem>
                  <MenuItem value={"Office"}>Office</MenuItem>
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
