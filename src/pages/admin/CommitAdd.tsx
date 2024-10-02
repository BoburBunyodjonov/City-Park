import { storage, firestore } from '../../firebase/firebaseConfig'; // Import Firebase config
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Button, Card, CardContent, Typography, Grid, Box, TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChangeEvent, useEffect, useState } from 'react';

// Video interface
export interface Video {
  id: string;
  url: string;
  name: string;
  comment: string;
}

const CommitAdd: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoName, setVideoName] = useState<string>(''); // State for the video name
  const [comment, setComment] = useState<string>(''); // State for comment
  const [editingVideo, setEditingVideo] = useState<Video | null>(null); // State for the video being edited

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "videos"));
        const fetchedVideos: Video[] = querySnapshot.docs.map(doc => ({
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
      setVideoName(e.target.files[0].name); // Set the name of the selected video
    }
  };

  const uploadVideo = async () => {
    if (!selectedVideo) return;

    const storageRef = ref(storage, `videos/${selectedVideo.name}`);
    try {
      await uploadBytes(storageRef, selectedVideo);
      const url = await getDownloadURL(storageRef);

      // Add uploaded video to Firestore
      await addDoc(collection(firestore, "videos"), {
        url,
        name: videoName,
        comment,
      });

      toast.success("Video uploaded successfully!");

      // Refresh videos after upload
      const querySnapshot = await getDocs(collection(firestore, "videos"));
      const fetchedVideos: Video[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Video[];
      setVideos(fetchedVideos);
      setSelectedVideo(null); // Reset selected video
      setVideoName(''); // Reset video name
      setComment(''); // Reset comment
    } catch (error) {
      toast.error(`Failed to upload ${videoName}.`);
    }
  };

  const handleDelete = async (id: string) => {
    const videoDoc = doc(firestore, "videos", id);
    const videoRef = ref(storage, `videos/${videos.find(video => video.id === id)?.name}`);

    try {
      // Delete from Firestore
      await deleteDoc(videoDoc);
      // Delete from Storage
      await deleteObject(videoRef);

      // Update local state
      setVideos(videos.filter(video => video.id !== id));
      toast.success("Video deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete video.");
    }
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video); // Set the video to edit
    setVideoName(video.name); // Set the current name for editing
    setComment(video.comment); // Set the current comment for editing
  };

  const handleUpdate = async () => {
    if (editingVideo) {
      const videoDoc = doc(firestore, "videos", editingVideo.id);
      const storageRef = ref(storage, `videos/${editingVideo.name}`);
      const newStorageRef = ref(storage, `videos/${videoName}`);

      try {
        // Update the video details in Firestore
        await updateDoc(videoDoc, { name: videoName, comment });

        // If a new file is provided, upload the new video file in storage
        if (selectedVideo) {
          await uploadBytes(newStorageRef, selectedVideo);
          // Delete the old video if the name has changed
          if (editingVideo.name !== videoName) {
            await deleteObject(storageRef); // Delete the old video
          }
        }

        // Reset editing state
        setEditingVideo(null);
        setVideoName('');
        setComment(''); // Reset the comment
        setSelectedVideo(null); // Reset the selected video
        toast.success("Video updated successfully!");

        // Refresh videos after update
        const querySnapshot = await getDocs(collection(firestore, "videos"));
        const fetchedVideos: Video[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Video[];
        setVideos(fetchedVideos);
      } catch (error) {
        toast.error("Failed to update video.");
      }
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Upload a Video</Typography>
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        label="Video Name"
        value={videoName}
        onChange={(e) => setVideoName(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <TextField
        label="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        multiline
        rows={2}
        style={{ marginBottom: '20px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={uploadVideo}
        disabled={!selectedVideo || !videoName}
      >
        Upload Video
      </Button>

      <Typography variant="h5" sx={{ marginTop: '20px' }}>
        Uploaded Videos
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: '10px' }}>
        {videos.map(video => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <Card>
              <video width="100%" controls>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {video.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Comment: {video.comment}
                </Typography>
                <Button variant="outlined" color="error" onClick={() => handleDelete(video.id)}>
                  Delete
                </Button>
                <Button variant="outlined" color="primary" onClick={() => handleEdit(video)}>
                  Edit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {editingVideo && (
        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="h6">Edit Video</Typography>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            style={{ marginBottom: '20px', marginTop: '10px' }}
          />
          <TextField
            label="Video Name"
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline
            rows={2}
            style={{ marginBottom: '20px' }}
          />
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update Video
          </Button>
        </Box>
      )}

      <ToastContainer />
    </Box>
  );
};

export default CommitAdd;
