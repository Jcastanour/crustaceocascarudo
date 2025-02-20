import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/swiper-bundle.css"; // Importa todos los estilos de Swiper

import "./Slider.css";

import burgerImage from "../assets/SliderImages/burgerimage.jpg";
import cangreburguer from "../assets/SliderImages/Cangreburguer.jpg";

export const Slider: React.FC = () => {
  const images = [burgerImage, cangreburguer];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      className="slider-container"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={`Slide ${index + 1}`} className="slide-image" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
