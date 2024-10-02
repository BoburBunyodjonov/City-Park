import { t } from "i18next";
import Slider from "react-slick";
import { NextIcon, PrevIcon } from "../../../assets/svg";
import useHomeContext from "../services/homeContext";

interface SampleNextArrowProps {
  onClick: () => void;
}

const SampleNextArrow: React.FC<SampleNextArrowProps> = ({ onClick }) => (
  <button
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300"
    onClick={onClick}
  >
    <NextIcon />
  </button>
);

const SamplePrevArrow: React.FC<SampleNextArrowProps> = ({ onClick }) => (
  <button
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300"
    onClick={onClick}
  >
    <PrevIcon />
  </button>
);

const Reviews: React.FC = () => {
  const {
    state: { reviews },
  } = useHomeContext();

  return (
    <div
      className="bg-[#20A58233] py-10 px-5 pb-0 my-[5rem] rounded-3xl"
      id="reviews"
    >
      <h1 className="text-center text-3xl text-secondary font-bold mb-10">
        {t("home.reviews.title")}
      </h1>
      <Slider
        slidesToShow={4}
        slidesToScroll={1}
        autoplay
        autoplaySpeed={2000}
        nextArrow={<SampleNextArrow onClick={() => {}} />}
        prevArrow={<SamplePrevArrow onClick={() => {}} />}
        responsive={[
          {
            breakpoint: 1400,
            settings: { slidesToShow: 3 },
          },
          {
            breakpoint: 1024,
            settings: { slidesToShow: 2 },
          },
          {
            breakpoint: 480,
            settings: { slidesToShow: 1 },
          },
        ]}
        infinite
        className="rounded-2xl"
      >
        {reviews.map((review, index) => (
          <div key={index} className="p-2">
            <div className="group">
              <video
                className="w-full h-[500px] object-cover rounded-2xl"
                src={review.src}
                controls
              ></video>
              <div className="w-full p-4 text-center">
                <span className="text-sm line-clamp-3">{review.comment}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Reviews;
