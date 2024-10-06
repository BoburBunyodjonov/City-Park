import React, { useMemo } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { NextIcon, PrevIcon } from "../../../assets/svg";
import useHomeContext from "../services/homeContext";

interface ArrowProps {
  onClick?: () => void;
}

const SampleNextArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      className="absolute right-5 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300"
      onClick={onClick}
    >
      <NextIcon />
    </button>
  );
};

const SamplePrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      className="absolute left-5 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300"
      onClick={onClick}
    >
      <PrevIcon />
    </button>
  );
};

export default function Carousel() {
  const {
    state: { slides },
  } = useHomeContext();

  const settings: Settings = useMemo(
    () => ({
      fade: true,
      dots: slides.length > 1,
      infinite: slides.length > 1,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: slides.length > 1,
      autoplaySpeed: 2000,
      nextArrow: slides.length > 1 ? <SampleNextArrow /> : undefined,
      prevArrow: slides.length > 1 ? <SamplePrevArrow /> : undefined,
      waitForAnimate: false,
    }),
    [slides]
  );

  return (
    <div className="w-full my-10 h-auto" id="home">
      <Slider {...settings} className="rounded-3xl overflow-hidden">
        {slides.map((slide) => (
          <img
            key={slide.id}
            src={slide.url}
            alt={`Slide ${slide.id}`}
            className="w-full h-[250px] object-cover sm:h-[400px] lg:h-[600px]"
          />
        ))}
      </Slider>
    </div>
  );
}
