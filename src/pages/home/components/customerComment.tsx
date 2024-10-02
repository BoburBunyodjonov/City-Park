import { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { PlayIcon, PrevIcon, NextIcon } from "../../../assets/svg";
import videoPoster from "../assets/08-Cephe 1.png"; // Ensure you have a default poster
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Import Firestore functions

interface SampleNextArrowProps {
  onClick: () => void;
}

interface SamplePrevArrowProps {
  onClick: () => void;
}

const CustomerComment = () => {
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
  const [videoData, setVideoData] = useState<{ src: string; poster: string; title: string }[]>([]);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    const fetchVideoData = async () => {
      const db = getFirestore(); 
      const videoCollection = collection(db, "videos"); 

      try {
        const videoSnapshot = await getDocs(videoCollection); 
        const videoList = videoSnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(data); 
          return {
            id: doc.id,
            src: data.src || "",
            poster: data.poster || videoPoster, 
            title: data.title || "Untitled Video", 
          };
        });
        setVideoData(videoList); 
        console.log(videoList); 
      } catch (error) {
        console.error("Failed to fetch video data:", error);
      }
    };

    fetchVideoData();
  }, []);

  const handlePlayVideo = (index: number) => {
    if (videoRefs.current[index]) {
      setPlayingVideoIndex(index);
      videoRefs.current[index].play();
    }
  };

  const SampleNextArrow: React.FC<SampleNextArrowProps> = ({ onClick }) => (
    <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300" onClick={onClick}>
      <NextIcon />
    </button>
  );

  const SamplePrevArrow: React.FC<SamplePrevArrowProps> = ({ onClick }) => (
    <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300" onClick={onClick}>
      <PrevIcon />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow onClick={() => {}} />,
    prevArrow: <SamplePrevArrow onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  console.log(videoData)

  return (
    <div className="bg-[#20A58233] py-10 px-6 rounded-3xl" id="sharhlar">
      <h1 className="text-center text-3xl text-secondary font-bold mb-10">Mijozlar Fikri</h1>
      <Slider {...settings}>
        {videoData.map((video, index) => (
          <div key={index} className="p-2">
            <div className="relative group overflow-hidden rounded-2xl bg-white transition transform">
              <video
                ref={(el) => (videoRefs.current[index] = el!)}
                className="w-full h-[400px] object-cover rounded-2xl"
                src={video.src}
                poster={video.poster} 
                muted
              ></video>
              {playingVideoIndex !== index && (
                <div
                  onClick={() => handlePlayVideo(index)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                >
                  <span className="p-3 px-4 bg-white rounded-full">
                    <PlayIcon />
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-transparent p-4 text-white text-center">
                <span className="text-xs line-clamp-3">{videoData.comment}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomerComment;
