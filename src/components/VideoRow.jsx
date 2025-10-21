"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import VideoCard from "./VideoCard";

export default function VideoRow({ title, videos }) {
  return (
    <section className="mt-10 px-10 text-white">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={15}
        navigation
        modules={[Navigation]}
        className="flex"
      >
        {videos.map((v, i) => (
          <SwiperSlide key={i} style={{ width: "270px" }}>
            <VideoCard video={v} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
