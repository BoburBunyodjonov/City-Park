"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SliderImg from "../assets/slider-bg.png";

import {SendIcon, PhoneIcon} from "../../../assets/svg"

interface SampleNextArrowProps {
  onClick: () => void; // Required onClick function
}

interface SamplePrevArrowProps {
  onClick: () => void; // Required onClick function
}

const slides = [
  {
    title: "To'liq ta'mirlangan kvartiralar",
    description:
      "Issiq taklif! Barcha qulayliklarni o'z ichiga olgan yangi Vody residence loyihamizdan arzon narxlarda kvartiralarni sotib olishga tayyor bo'ling.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "To'liq ta'mirlangan kvartiralar",
    description:
      "Issiq taklif! Barcha qulayliklarni o'z ichiga olgan yangi Vody residence loyihamizdan arzon narxlarda kvartiralarni sotib olishga tayyor bo'ling.",
    image: "/placeholder.svg?height=600&width=800",
  },
  // Add more slides here
];

const SampleNextArrow: React.FC<SampleNextArrowProps> = ({ onClick }) => {
  return (
    <button
      className="absolute right-4 lg:right-[-50px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300"
      onClick={onClick}
    >
      <ChevronRight className="h-6 w-6 text-gray-600" />
    </button>
  );
};

const SamplePrevArrow: React.FC<SamplePrevArrowProps> = ({ onClick }) => {
  return (
    <button
      className="absolute left-4 lg:left-[-50px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300"
      onClick={onClick}
    >
      <ChevronLeft className="h-6 w-6 text-gray-600" />
    </button>
  );
};

export default function Component() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow onClick={() => {}} />,
    prevArrow: <SamplePrevArrow onClick={() => {}} />,
    dotsClass: "slick-dots !bottom-[-25px]",
  };

  return (
    <div className="relative w-full mx-auto py-7">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative h-[450px] overflow-hidden rounded-3xl "
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${SliderImg})`,
                backgroundSize: "contain",
                backgroundPosition: "right",
                backgroundRepeat: "repeat-x"
              }}
            >
              <div className="w-[70%] md:w-[50%] h-full bg-gradient-to-b from-[#20A582] to-[#123F3C] p-8 flex flex-col justify-evenly rounded-r-[150px]">
                <h2 className=" text-3xl md:text-5xl font-bold text-white mb-4">
                  {slide.title}
                </h2>
                <p className="text-slate-300 mb-6 text-[13px] lg:w-[60%]">{slide.description}</p>
                <div className="flex space-x-3">
                  <button className="bg-[rgba(255,255,255,0.172)] py-2 px-2 pr-4 rounded-full flex justify-between space-x-4 items-center ">
                    <span className="bg-white p-2 rounded-full"><SendIcon/></span>
                    <span className="text-white font-semibold md:text-lg">Buyurtma berish</span>
                  </button>
                  <button className="bg-[rgba(255,255,255,0.172)] p-2 rounded-full flex justify-between space-x-4 items-center ">
                    <span className="bg-white p-2 rounded-full flex justify-center items-center"><PhoneIcon/></span>
                  </button>
                  {/* <button className="py-2 px-2 pr-4"> */}
                 
                  {/* </button> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
