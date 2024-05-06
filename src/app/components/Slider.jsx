"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const data = [
  {
    id: 1,
    image: "/images/cinema.png",
  },

  {
    id: 2,
    image: "/images/cinema2.png",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      500
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <Image
      className="object-cover rounded "
      src={data[currentSlide].image}
      alt="img"
      width={1500}
      height={300}
      priority
      style={{ objectFit: "cover", width: "100%", height: "100%" }}
    />
  );
};

export default Slider;
