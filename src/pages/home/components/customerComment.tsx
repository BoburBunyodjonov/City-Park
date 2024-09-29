import { useRef, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { PlayIcon } from "../../../assets/svg";
import videoPoster from "../assets/08-Cephe 1.png"


interface SampleNextArrowProps {
  onClick: () => void; 
}

interface SamplePrevArrowProps {
  onClick: () => void; 
}

const CustomerComment = () => {
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(
    null
  ); 
  const videoRefs = useRef<HTMLVideoElement[]>([]); 

  const handlePlayVideo = (index: number) => {
    if (videoRefs.current[index]) {
      setPlayingVideoIndex(index); 
      videoRefs.current[index].play(); 
    }
  };

  const SampleNextArrow: React.FC<SampleNextArrowProps> = ({ onClick }) => {
    return (
      <button
        className="absolute right-0  top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300"
        onClick={onClick}
      >
        <ChevronRight className="h-6 w-6 text-gray-600" />
      </button>
    );
  };

  const SamplePrevArrow: React.FC<SamplePrevArrowProps> = ({ onClick }) => {
    return (
      <button
        className="absolute left-0  top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300"
        onClick={onClick}
      >
        <ChevronLeft className="h-6 w-6 text-gray-600" />
      </button>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4, // Show 4 cards at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow onClick={() => {}} />,
    prevArrow: <SamplePrevArrow onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const videoData = [
    {
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: videoPoster,
      title:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on",
    },
    {
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: videoPoster,
      title:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on",
    },
    {
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: videoPoster,
      title:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on",
    },
    {
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: videoPoster,
      title:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on",
    },
    {
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      poster: videoPoster,
      title:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on",
    },
  ];

  return (
    <div className="bg-[#20A58233] py-10 px-6 rounded-3xl">
      <h1 className="text-center text-3xl text-secondary font-bold mb-10">
        Mijozlar Fikri
      </h1>
      <Slider {...settings}>
        {videoData.map((video, index) => (
          <div key={index} className="p-2">
            <div className="relative group overflow-hidden rounded-2xl bg-white transition transform ">
              <video
                ref={(el) => (videoRefs.current[index] = el!)}
                className="w-full h-[400px] object-cover rounded-2xl"
                src={video.src}
                muted
                poster={video.poster}
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
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-transparent p-4  text-white text-center">
                <span className="text-xs  line-clamp-3 ">{video.title}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomerComment;
