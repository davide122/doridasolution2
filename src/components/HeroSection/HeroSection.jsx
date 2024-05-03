"use client"
import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import Image from 'next/image';
import imageHumanSrc from "../../../public/image/Screenshot 2024-03-26 alle 12.03.30.png"; // Assicurati di spostare l'immagine nella cartella public
import ChatWithGPT from '../ChatGpt/ChatWithGP'; // Aggiorna il percorso se necessario
import { BsChatDots, BsRobot } from 'react-icons/bs';
import Tippy from '@tippyjs/react';
import Link from 'next/link';

const HeroSection = () => {
  const [showSpline, setShowSpline] = useState(true);

  const handleButtonClick = () => {
    setShowSpline(!showSpline);
  };

  return (
    <div className="container">
      <div className="row vh-100">
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center align-items-md-start text-center text-md-left bg-black hero-text vh-50 ">
          <h1 className="text-white Title mt-3">La Dorida Solution <span className='d-none d-xl-block'>è qui per te.</span></h1>
          <h2 className="text-white Title2 d-md-none">è qui per aiutarvi</h2>
          <Tippy content="Offriamo un preventivo gratuito" className="fs-5 bg-black">
          <Link href="/contact" className='Call-Button text-decoration-none my-2'>Preventivo Gratuito</Link>
          </Tippy>
          <div className='Utilies mb-4'>
            <ChatWithGPT className="buttontalk" />
          </div>
        </div>
        
        <div className="col-12 col-md-6">
        
            <div className='object'>
              <Spline scene="https://prod.spline.design/fG63sTT4o138JOix/scene.splinecode" className='vh-100 d-none d-md-block d-md' />
              <div className="d-block d-md-none mx-0">
                <Image src={imageHumanSrc} alt="Immagine di nova, un ai di dorida solution" className="imgHuman" width={500} height={500}/>
              </div>
            </div>

          
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
