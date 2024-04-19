import Image from "next/image";
import styles from "./page.module.css";
import MyNavbar from "../components/navbar/MyNavbar";
import HeroSection from "../components/HeroSection/HeroSection";
import Carouseltext from "../components/Carousel/Carouseltext";
import ServicesSection from "../components/Section/ServicesSection";

export default function Home() {
  return (
    <>
<MyNavbar className={"gradient"}></MyNavbar>
<HeroSection></HeroSection>
<Carouseltext></Carouseltext>
<ServicesSection></ServicesSection>
    </>
  );
}
