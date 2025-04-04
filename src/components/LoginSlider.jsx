import React, { useRef, useState } from 'react'
/* assets...*/
import img1 from '@assets/slide-1.jpg';
import img2 from '@assets/slide-2.jpg';
import img3 from '@assets/slide-3.jpg';

/* icons...*/
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

const slides = [
    {
        image: img1,
        title: 'Effortless Inventory Tracking,',
        bullets: 'Never Run Out of Essential Items Again'
    },
    {
        image: img2,
        title: 'Powerful Analytics,',
        bullets: 'Never Run Out of Essential Items Again'
    },
    {
        image: img3,
        title: 'Powerful Analytics,',
        bullets: 'Make Data-Driven Inventory Decisions'
    }
];

const LoginSlider = () => {

const [render, setRender] = useState(0); 
const indexRef = useRef(0);
const timeoutRef = useRef(null);

const startSlider = () => {
    timeoutRef.current = setTimeout(() => {
      indexRef.current = (indexRef.current + 1) % slides.length;
      setRender((r) => r + 1);
      startSlider();
    }, 4000);
  };

  const stopSlider = () => {
    clearTimeout(timeoutRef.current);
  };

  const handlePrev = () => {
    stopSlider();
    indexRef.current = indexRef.current === 0 ? slides.length - 1 : indexRef.current - 1;
    setRender((r) => r + 1);
    startSlider();
  };

  const handleNext = () => {
    stopSlider();
    indexRef.current = (indexRef.current + 1) % slides.length;
    setRender((r) => r + 1);
    startSlider();
  };

  React.useLayoutEffect(() => {
    //startSlider();
    return () => stopSlider();
  }, []);

  const current = indexRef.current;

  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="content">
            <h2>{slide.title}</h2>
            <p>{slide.bullets}</p>
          </div>
        </div>
      ))}
      <button className="nav nav-left" onClick={handlePrev}><FaChevronLeft /></button>
      <button className="nav nav-right" onClick={handleNext}><FaChevronRight /></button>
    </div>
  )
}

export default LoginSlider
