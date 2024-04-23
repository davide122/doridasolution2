
import MyNavbar from "../components/navbar/MyNavbar";
import HeroSection from "../components/HeroSection/HeroSection";
import Carouseltext from "../components/Carousel/Carouseltext";
import ServicesSection from "../components/Section/ServicesSection";
import ServicesExplain from "@/components/Section/ServicesExplain/ServiceExplain";
import ChangeColor from "@/components/Section/ChangeColor";
import VideoPresentazione from "@/components/Section/VideoPresentazione";
import MyFooter from "@/components/Footer/MyFooter";

export default function Home() {
  return (
    <>
<MyNavbar className={"gradient"}></MyNavbar>
<HeroSection></HeroSection>
<Carouseltext></Carouseltext>
<ServicesSection></ServicesSection>
<ServicesExplain></ServicesExplain>
<ChangeColor></ChangeColor>
<VideoPresentazione></VideoPresentazione>
<MyFooter></MyFooter>
    </>
  );
}
