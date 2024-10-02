import { storage, firestore } from "../../firebase/firebaseConfig"; // Import Firebase config
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
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChangeEvent, useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";

export interface Video {
  id: string;
  url: string;
  name: string;
  comment: string;
}

const CommitAdd: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoName, setVideoName] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "videos"));
        const fetchedVideos: Video[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Video[];
        setVideos(fetchedVideos);
      } catch (error) {
        toast.error("Failed to fetch videos.");
      }
    };
    fetchVideos();
  }, []);

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedVideo(e.target.files[0]);
      setVideoName(e.target.files[0].name);
    }
  };

  const uploadVideo = async () => {
    if (!selectedVideo) return;

    const storageRef = ref(storage, `videos/${selectedVideo.name}`);
    try {
      await uploadBytes(storageRef, selectedVideo);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(firestore, "videos"), {
        url,
        name: videoName,
        comment,
      });

      toast.success("Video uploaded successfully!");

      const querySnapshot = await getDocs(collection(firestore, "videos"));
      const fetchedVideos: Video[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Video[];
      setVideos(fetchedVideos);
      setSelectedVideo(null);
      setVideoName("");
      setComment("");
      setOpen(false);
    } catch (error) {
      toast.error(`Failed to upload ${videoName}.`);
    }
  };

  const handleDelete = async (id: string) => {
    const videoDoc = doc(firestore, "videos", id);
    const videoRef = ref(
      storage,
      `videos/${videos.find((video) => video.id === id)?.name}`
    );

    try {
      await deleteDoc(videoDoc);
      await deleteObject(videoRef);

      setVideos(videos.filter((video) => video.id !== id));
      toast.success("Video deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete video.");
    }
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setVideoName(video.name);
    setComment(video.comment);
    setOpen(true);
  };

  const handleUpdate = async () => {
    if (editingVideo) {
      const videoDoc = doc(firestore, "videos", editingVideo.id);
      const storageRef = ref(storage, `videos/${editingVideo.name}`);
      const newStorageRef = ref(storage, `videos/${videoName}`);

      try {
        await updateDoc(videoDoc, { name: videoName, comment });

        if (selectedVideo) {
          await uploadBytes(newStorageRef, selectedVideo);
          if (editingVideo.name !== videoName) {
            await deleteObject(storageRef);
          }
        }

        setEditingVideo(null);
        setVideoName("");
        setComment("");
        setSelectedVideo(null);
        setOpen(false);
        toast.success("Video updated successfully!");

        const querySnapshot = await getDocs(collection(firestore, "videos"));
        const fetchedVideos: Video[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Video[];
        setVideos(fetchedVideos);
      } catch (error) {
        toast.error("Failed to update video.");
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingVideo(null);
    setSelectedVideo(null);
    setVideoName("");
    setComment("");
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Button
        variant="contained"
        className="bg-primary"
        style={{ backgroundColor: "#1EA582" }}
        onClick={handleClickOpen}
        sx={{ marginBottom: "0px" }}
      >
        Upload New Video and Comment
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingVideo ? "Edit Video" : "Upload a Video"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editingVideo
              ? "Edit the video details and comment."
              : "Select a video file and add a comment."}
          </DialogContentText>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            style={{ marginBottom: "20px", marginTop: "10px" }}
          />
          <TextField
            label="Video Name"
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
            fullWidth
            style={{ marginBottom: "20px" }}
          />
          <TextField
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline
            rows={2}
            style={{ marginBottom: "20px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={editingVideo ? handleUpdate : uploadVideo}
            disabled={!videoName || (!selectedVideo && !editingVideo)}
          >
            {editingVideo ? "Update Video" : "Upload Video"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Uploaded Videos Table */}
      <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Video</TableCell>
              <TableCell>Video Name</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videos.map((video) => (
              <TableRow key={video.id}>
                <TableCell>
                  <video width="120" controls>
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </TableCell>
                <TableCell>{video.name}</TableCell>
                <TableCell>{video.comment}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(video)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(video.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ToastContainer />
    </Box>
  );
};

export default CommitAdd;
