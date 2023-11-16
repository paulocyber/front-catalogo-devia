import React, { useState } from "react";
import { register } from "swiper/element/bundle";
import Image1 from "./../../assets/banner01.jpg";

import { Swiper, SwiperSlide } from "swiper/react";

import "./Banner.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

register();

function Banner() {
  const ImageBanner = [
    { id: "1", image: Image1 },
  ];

  return (
    <div className="bg-gray-50 flex w-full z-100 pt-20 pb-5">
      <section className="bg-cover bg-center w-full ">
        <Swiper className="bg-cover bg-center w-full" slidesPerView={1} pagination={{ clickable: true }} navigation>
          {ImageBanner.map((item) => (
            <SwiperSlide key={item.id}>
              <img src={item.image} alt="Slider" className="w-full" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}

export default Banner;
