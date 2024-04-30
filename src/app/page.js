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
import { useEffect } from "react";

export default function Home() {
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
  return (
    <>
<MyNavbar ></MyNavbar>
<HeroSection></HeroSection>
<Carouseltext></Carouseltext>
<ServicesSection></ServicesSection>
<ServicesExplain></ServicesExplain>
<AboutUs></AboutUs>
<ChangeColor></ChangeColor>
<VideoPresentazione></VideoPresentazione>
<MyFooter></MyFooter>
    </>
  );
}
