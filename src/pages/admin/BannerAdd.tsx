import { storage, firestore } from "../../firebase/firebaseConfig";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  Button,
  Box,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChangeEvent, useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

// Image interface
export interface Image {
  id: string;
  url: string;
  name: string;
}

const BannerAdd: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [newImageName, setNewImageName] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(firestore, "banners"));
        const fetchedImages: Image[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Image[];
        setImages(fetchedImages);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch images.");
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (selectedImage) {
      const storageRef = ref(storage, `banners/${selectedImage.name}`);
      try {
        setBtnLoading(true)
        await uploadBytes(storageRef, selectedImage);
        const url = await getDownloadURL(storageRef);

        await addDoc(collection(firestore, "banners"), {
          url,
          name: selectedImage.name,
        });
        toast.success("Image uploaded successfully!");
        setBtnLoading(false)
        handleClose()
      } catch (error) {
        toast.error(`Failed to upload ${selectedImage.name}.`);
        setBtnLoading(false)
      }

      const querySnapshot = await getDocs(collection(firestore, "banners"));
      const fetchedImages: Image[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Image[];
      setImages(fetchedImages);
      setSelectedImage(null);
    }
  };

  const handleDelete = async (id: string) => {
    const imageDoc = doc(firestore, "banners", id);
    const imageRef = ref(
      storage,
      `banners/${images.find((img) => img.id === id)?.name}`
    );

    try {
      await deleteDoc(imageDoc);
      await deleteObject(imageRef);
      setImages(images.filter((image) => image.id !== id));
      toast.success("Image deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete image.");
    }
  };

  const handleEdit = (image: Image) => {
    setEditingImageId(image.id);
    setNewImageName(image.name);
    setEditMode(true);
    setOpen(true);
  };

  const handleUpdate = async () => {
    if (editingImageId && (newImageName || selectedImage)) {
      const imageDoc = doc(firestore, "banners", editingImageId);
      const editingImage = images.find((img) => img.id === editingImageId);
      if (!editingImage) return;

      const storageRef = ref(storage, `banners/${editingImage.name}`);
      const newStorageRef = newImageName
        ? ref(storage, `banners/${newImageName}`)
        : null;

      try {
        setBtnLoading(true)
        await updateDoc(imageDoc, { name: newImageName || editingImage.name });
        if (selectedImage) {
          await uploadBytes(newStorageRef!, selectedImage);
          if (editingImage.name !== newImageName) {
            await deleteObject(storageRef);
          }
        }
        setEditingImageId(null);
        setNewImageName("");
        setEditMode(false);
        toast.success("Image updated successfully!");
        const querySnapshot = await getDocs(collection(firestore, "banners"));
        const fetchedImages: Image[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Image[];
        setImages(fetchedImages);
        setBtnLoading(false)
        handleClose()
      } catch (error) {
        toast.error("Failed to update image.");
        setBtnLoading(false)
      }
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setNewImageName("");
    setSelectedImage(null);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Button
        variant="contained"
        className="bg-primary"
        style={{ backgroundColor: "#1EA582" }}
        onClick={handleOpen}
        sx={{ marginBottom: "20px" }}
      >
        Add Banner
      </Button>

      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {images.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>
                    <img src={image.url} alt={image.name} width={100} />
                  </TableCell>
                  <TableCell>{image.name}</TableCell>
                  <TableCell>
                    <Edit
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleEdit(image)}
                    />
                  </TableCell>
                  <TableCell>
                    <Delete
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(image.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            padding: 4,
            backgroundColor: "white",
            borderRadius: 2,
            maxWidth: 400,
            margin: "auto",
            marginTop: "20vh",
          }}
        >
          <Typography variant="h6">
            {editMode ? "Edit Banner" : "Upload New Banner"}
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: "20px" }}
          />
          {editMode && (
            <Box>
              <Typography variant="body1">
                Current Name: {newImageName}
              </Typography>
              <input
                type="text"
                value={newImageName}
                onChange={(e) => setNewImageName(e.target.value)}
                placeholder="New Image Name (Optional)"
                style={{ marginBottom: "20px", width: "100%" }}
              />
            </Box>
          )}
          <LoadingButton
            onClick={editMode ? handleUpdate : uploadImage}
            fullWidth
            variant="contained"
            className="bg-primary py-4"
            style={{ backgroundColor: "#1EA582" }}
            sx={{ marginTop: "50px" }}
            disableElevation
            loading={btnLoading}
          >
            {editMode ? "Update Image" : "Upload Image"}
          </LoadingButton>
        </Box>
      </Modal>

      <ToastContainer />
    </Box>
  );
};

export default BannerAdd;
