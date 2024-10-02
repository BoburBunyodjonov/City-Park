import { storage, firestore } from '../../firebase/firebaseConfig'; // Importing storage and firestore
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Button, Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';
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
  const [selectedImages, setSelectedImages] = useState<File[]>(Array(3).fill(null));
  const [editingImageId, setEditingImageId] = useState<string | null>(null); // Store the ID of the image being edited
  const [newImageName, setNewImageName] = useState<string>(''); // State for the new image name
  const [newImageFile, setNewImageFile] = useState<File | null>(null); // State for new image file during editing

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "banners")); // Use firestore here
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

  const handleImageChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const updatedImages = [...selectedImages];
      updatedImages[index] = e.target.files[0]; // Store the selected file
      setSelectedImages(updatedImages);
    }
  };

  const uploadImages = async () => {
    let uploadSuccess = true;

    for (const file of selectedImages) {
      if (file) {
        const storageRef = ref(storage, `banners/${file.name}`);
        try {
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);

          // Add uploaded image to Firestore
          await addDoc(collection(firestore, "banners"), { // Use firestore here
            url,
            name: file.name,
          });
        } catch (error) {
          uploadSuccess = false;
          toast.error(`Failed to upload ${file.name}.`);
        }
      }
    }

    if (uploadSuccess) {
      toast.success("Images uploaded successfully!");
    }

    // Refresh images after upload
    const querySnapshot = await getDocs(collection(firestore, "banners")); // Use firestore here
    const fetchedImages: Image[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Image[];
    setImages(fetchedImages);
    setSelectedImages(Array(3).fill(null)); // Reset selected images
  };

  const handleDelete = async (id: string) => {
    const imageDoc = doc(firestore, "banners", id); // Use firestore here
    const imageRef = ref(storage, `banners/${images.find(img => img.id === id)?.name}`);

    try {
      // Delete from Firestore
      await deleteDoc(imageDoc);
      
      // Delete from Storage
      await deleteObject(imageRef);

      // Update local state
      setImages(images.filter(image => image.id !== id));
      toast.success("Image deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete image.");
    }
  };

  const handleEdit = (image: Image) => {
    setEditingImageId(image.id); // Set the ID of the image to edit
    setNewImageName(image.name); // Set the current name for editing
    setNewImageFile(null); // Reset the new image file state
  };

  const handleUpdate = async () => {
    if (editingImageId && (newImageName || newImageFile)) {
      const imageDoc = doc(firestore, "banners", editingImageId); // Reference to the document to update
      const editingImage = images.find(img => img.id === editingImageId);
      if (!editingImage) return; // If the image is not found, do nothing
      
      const storageRef = ref(storage, `banners/${editingImage.name}`);
      const newStorageRef = newImageName ? ref(storage, `banners/${newImageName}`) : null;

      try {
        // Update the image name in Firestore
        await updateDoc(imageDoc, { name: newImageName || editingImage.name });

        // If the name changed or a new file is provided, update the image file in storage
        if (newImageFile) {
          // Upload the new image file
          await uploadBytes(newStorageRef!, newImageFile);

          // Delete the old image if the name has changed
          if (editingImage.name !== newImageName) {
            await deleteObject(storageRef); // Delete the old image
          }
        }

        // Reset editing state
        setEditingImageId(null); // Reset the editing image ID
        setNewImageName('');
        setNewImageFile(null); // Reset the new image file
        toast.success("Image updated successfully!");

        // Refresh images after update
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

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Upload Three Images</Typography>
      {selectedImages.map((image, index) => (
        <input
          key={index}
          type="file"
          accept="image/*"
          onChange={handleImageChange(index)}
          style={{ marginBottom: '20px' }}
        />
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={uploadImages}
        disabled={selectedImages.every(image => image === null)}
      >
        Upload Images
      </Button>

      <Typography variant="h5" sx={{ marginTop: '20px' }}>
        Uploaded Images
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: '10px' }}>
        {images.map(image => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={image.url}
                alt={image.name}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {image.name}
                </Typography>
                <Button variant="outlined" color="error" onClick={() => handleDelete(image.id)}>
                  Delete
                </Button>
                <Button variant="outlined" color="primary" onClick={() => handleEdit(image)}>
                  Edit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {editingImageId && (
        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="h6">Edit Image</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setNewImageFile(e.target.files[0]); // Set the new image file
              }
            }}
            style={{ marginBottom: '20px', marginTop: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update Image
          </Button>
        </Box>
      )}

      <ToastContainer />
    </Box>
  );
};

export default BannerAdd;
