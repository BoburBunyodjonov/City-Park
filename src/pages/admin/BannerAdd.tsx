import { storage, firestore } from '../../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Button, Box, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChangeEvent, useEffect, useState } from 'react';

// Image interface
export interface Image {
  id: string;
  url: string;
  name: string;
}

const BannerAdd: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // Changed to hold only one image
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [newImageName, setNewImageName] = useState<string>(''); 
  const [open, setOpen] = useState(false); 
  const [editMode, setEditMode] = useState(false); // New state for edit mode

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "banners")); 
        const fetchedImages: Image[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Image[];
        setImages(fetchedImages);
      } catch (error) {
        toast.error("Failed to fetch images.");
      }
    };
    fetchImages();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]); // Update to set only one image
    }
  };

  const uploadImage = async () => {
    if (selectedImage) {
      const storageRef = ref(storage, `banners/${selectedImage.name}`);
      try {
        await uploadBytes(storageRef, selectedImage);
        const url = await getDownloadURL(storageRef);

        await addDoc(collection(firestore, "banners"), { 
          url,
          name: selectedImage.name,
        });
        toast.success("Image uploaded successfully!");
      } catch (error) {
        toast.error(`Failed to upload ${selectedImage.name}.`);
      }

      // Fetch updated images after upload
      const querySnapshot = await getDocs(collection(firestore, "banners")); 
      const fetchedImages: Image[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Image[];
      setImages(fetchedImages);
      setSelectedImage(null); // Clear selected image
    }
  };

  const handleDelete = async (id: string) => {
    const imageDoc = doc(firestore, "banners", id); 
    const imageRef = ref(storage, `banners/${images.find(img => img.id === id)?.name}`);

    try {
      await deleteDoc(imageDoc);
      await deleteObject(imageRef);
      setImages(images.filter(image => image.id !== id));
      toast.success("Image deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete image.");
    }
  };

  const handleEdit = (image: Image) => {
    setEditingImageId(image.id); 
    setNewImageName(image.name); 
    setEditMode(true); // Set edit mode
    setOpen(true); // Open the modal for editing
  };

  const handleUpdate = async () => {
    if (editingImageId && (newImageName || selectedImage)) {
      const imageDoc = doc(firestore, "banners", editingImageId);
      const editingImage = images.find(img => img.id === editingImageId);
      if (!editingImage) return; 
      
      const storageRef = ref(storage, `banners/${editingImage.name}`);
      const newStorageRef = newImageName ? ref(storage, `banners/${newImageName}`) : null;

      try {
        await updateDoc(imageDoc, { name: newImageName || editingImage.name });
        if (selectedImage) {
          await uploadBytes(newStorageRef!, selectedImage);
          if (editingImage.name !== newImageName) {
            await deleteObject(storageRef); 
          }
        }
        setEditingImageId(null); 
        setNewImageName('');
        setEditMode(false); // Reset edit mode
        toast.success("Image updated successfully!");
        const querySnapshot = await getDocs(collection(firestore, "banners"));
        const fetchedImages: Image[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Image[];
        setImages(fetchedImages);
      } catch (error) {
        toast.error("Failed to update image.");
      }
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false); // Reset edit mode when opening modal
  };
  
  const handleClose = () => {
    setOpen(false);
    setEditMode(false); // Reset edit mode when closing modal
    setNewImageName('');
    setSelectedImage(null); // Clear selected image
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Manage Banners</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen} 
        sx={{ marginBottom: '20px' }}
      >
        Add Banner
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {images.map(image => (
              <TableRow key={image.id}>
                <TableCell>
                  <img src={image.url} alt={image.name} width={100} />
                </TableCell>
                <TableCell>{image.name}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(image.id)}>
                    Delete
                  </Button>
                  <Button variant="outlined" color="primary" onClick={() => handleEdit(image)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ padding: 4, backgroundColor: 'white', borderRadius: 2, maxWidth: 400, margin: 'auto', marginTop: '20vh' }}>
          <Typography variant="h6">{editMode ? 'Edit Banner' : 'Upload New Banner'}</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: '20px' }}
          />
          {editMode && (
            <Box>
              <Typography variant="body1">Current Name: {newImageName}</Typography>
              <input
                type="text"
                value={newImageName}
                onChange={(e) => setNewImageName(e.target.value)}
                placeholder="New Image Name (Optional)"
                style={{ marginBottom: '20px', width: '100%' }}
              />
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={editMode ? handleUpdate : uploadImage}
            disabled={!selectedImage && !editMode} // Disable if no image is selected
          >
            {editMode ? 'Update Image' : 'Upload Image'}
          </Button>
        </Box>
      </Modal>

      <ToastContainer />
    </Box>
  );
};

export default BannerAdd;
