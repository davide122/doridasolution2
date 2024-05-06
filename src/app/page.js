"use client"
import MyNavbar from "../components/navbar/MyNavbar";
import HeroSection from "../components/HeroSection/HeroSection";
import Carouseltext from "../components/Carousel/Carouseltext";
import ServicesSection from "../components/Section/ServicesSection";
import ServicesExplain from "../components/Section/ServicesExplain/ServiceExplain";
import ChangeColor from "../components/Section/ChangeColor";
import VideoPresentazione from "../components/Section/VideoPresentazione";
import MyFooter from "../components/Footer/MyFooter";
import AboutUs from "../components/Section/aboutsection/AboutUs";
import { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import Tippy from "@tippyjs/react";
import { Tooltip } from "react-bootstrap";

export default function Home() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const warnMessage = "ATTENZIONE: Questa console è monitorata. L'abuso sarà perseguito.";
    const cssWarning = 'background: red; color: white; font-size: 16px;';

    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    console.clear()

    console.log = function(...args) {
      originalLog('%c' + warnMessage + warnMessage + warnMessage + warnMessage, cssWarning);
      originalLog(...args);
      const noop = () => {};
      const warnUser = () => console.warn('%c' + warnMessage, cssWarning);
  
     
        console.log = console.info = console.debug = warnUser;
        console.error = console.warn = noop; 
   

    };

    console.error = function(...args) {
      originalError('%c' + warnMessage + warnMessage + warnMessage + warnMessage, cssWarning);
      originalError(...args);
      const noop = () => {};
    const warnUser = () => console.warn('%c' + warnMessage, cssWarning);

   
      console.log = console.info = console.debug = warnUser;
      console.error = console.warn = noop; 


    };

    console.warn = function(...args) {
      originalWarn('%c' + warnMessage + warnMessage + warnMessage + warnMessage, cssWarning);
      originalWarn(...args);
      const noop = () => {};
      const warnUser = () => console.warn('%c' + warnMessage, cssWarning);
  
     
        console.log = console.info = console.debug = warnUser;
        console.error = console.warn = noop; 

    };

   
  }, []);


  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Verifica se lo scroll ha superato il 100vh
      if (window.scrollY > window.innerHeight) {
        setShowTooltip(true);

        setShowImage(true);
        // Aggiungi animazione all'immagine con GSAP
        gsap.fromTo(
          ".sticky-bottom-image",
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 4 }
        );
      } else {
        setShowImage(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <>
      <MyNavbar />
      <HeroSection />
      <Carouseltext />
      <ServicesSection />
      <ServicesExplain />
      <AboutUs />
      <ChangeColor />
      <VideoPresentazione />
      {showImage && (
          <Image
            src="/image/rodeo.png"
            alt="Immagine di nova, un ai di dorida solution"
            width={300}
            height={300}
            className="d-md-block d-none sticky-bottom-image"
          />
      )}
      <MyFooter />
      {showTooltip && (
        <Tooltip id="tooltip" place="top" effect="solid">
          Clicca per parlare con me
        </Tooltip>
      )}
    </>
  );
}