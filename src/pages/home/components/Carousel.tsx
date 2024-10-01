"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SliderImg from "../assets/slider-bg.png";

import { NextIcon, PrevIcon } from "../../../assets/svg";

interface ArrowProps {
  onClick?: () => void;
}

const slides = [{}, {}]; // Your slide data

// Next Arrow Component
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

// Previous Arrow Component
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

// Carousel Component
export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="w-full my-5 h-auto" id="home">
      <Slider {...settings} className="rounded-3xl overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={SliderImg}
            // src={slide?.img}
            // alt={slide?.img}
            className="w-full h-[250px] object-cover sm:h-[400px] lg:h-[600px]"
          />
        ))}
      </Slider>
    </div>
  );
}
