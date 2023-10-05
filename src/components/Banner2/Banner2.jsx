import React from "react";
import { register } from 'swiper/element/bundle';
import Image3 from '../../assets/peining2.jpg'
import Image4 from '../../assets/revendedor.jpg'

import { Swiper, SwiperSlide } from "swiper/react";

import './Banner2.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

register();

function Banner2 () {
    const ImageBanner = [
        {id: '1', image: Image4}
        
    ];

    return (
        <div className="container_banner2">

            <Swiper 
            slidesPerView={1} 
            pagination={{ clickable: true }} 
            navigation
            >
                {ImageBanner.map ( (item) => (
                    <SwiperSlide key={item.id}>
                        <img src={item.image} alt="Slider" className="slide-item"/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner2;