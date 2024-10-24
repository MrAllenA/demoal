"use client"
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

import japanImage from '/public/japan.jpg'; // Correct path to the public directory
const carouselItems = [
  { id: 1, text: 'ALLEN ANAND', image: japanImage.src },
  // Add more items here
];
export default function Banner() {
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const containerRef = useRef(null);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (containerRef.current) {
  //       const container = containerRef.current;
  //       const scrollPosition = container.scrollLeft;
  //       const itemWidth = container.clientWidth;
  //       const newIndex = Math.floor(scrollPosition / itemWidth) % carouselItems.length;
  //       setCurrentIndex(newIndex);
  //     }
  //   };
  return  (
      <div className="relative w-full h-full overflow-hidden group rounded-lg p-3 wave-animation"> {/* Use padding instead of margin */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
          style={{ 
            backgroundImage: `url(${japanImage.src})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat',
            borderRadius: '16px'
          }}
        ></div>
        <h1
          className="absolute inset-0 flex items-center justify-center text-8xl font-bold bg-clip-text text-transparent bg-no-repeat bg-cover transition-all duration-500 ease-in-out transform group-hover:scale-110 group-hover:text-opacity-100  group-hover:text-white"
          style={{ 
            backgroundImage: `url(${japanImage.src})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat',
            padding: '0 20px',
            borderRadius: '16px'
          }}
        >
          ALLEN ANAND
        </h1>
      </div>
    );

}
