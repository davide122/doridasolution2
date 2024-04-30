"use client"
import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import Image from 'next/image';
import imageHumanSrc from "../../../public/image/Screenshot 2024-03-26 alle 12.03.30.png"; // Assicurati di spostare l'immagine nella cartella public
import ChatWithGPT from '../ChatGpt/ChatWithGpt'; // Aggiorna il percorso se necessario
import { BsChatDots, BsRobot } from 'react-icons/bs';

const HeroSection = () => {
  const [showSpline, setShowSpline] = useState(true);

  const handleButtonClick = () => {
    setShowSpline(!showSpline);
  };

  return (
    <div className="container vh-100">
      <div className="row vh-100">
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center align-items-md-start text-center text-md-left bg-black hero-text vh-50 ">
          <h1 className="text-white Title mt-3">La Dorida Solution <span className='d-none d-xl-block'>è qui per te.</span></h1>
          <h2 className="text-white Title2 d-md-none">è qui per aiutarvi</h2>
          <button className='Call-Button mt-2 mt-md-3 p-md-3 p-2'>Preventivo gratuito</button>
        </div>
        
        <div className="col-12 col-md-6">
          {showSpline ? (
            <div>
              <Spline scene="https://prod.spline.design/fG63sTT4o138JOix/scene.splinecode" className='vh-100 d-none d-md-block d-md' />
              <div className="d-block d-md-none vh-100 mx-0">
                <Image src={imageHumanSrc} alt="Immagine di nova, un ai di dorida solution" className="imgHuman" width={500} height={500}/>
              </div>
            </div>
          ) : (
            <video src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/video/robot.mp4" className="video d-md-block" autoPlay loop  playsInline> </video>
          )}

          <div className='Utilies'>
            <button onClick={handleButtonClick} className="Call-Button mb-2">
              {showSpline ? <BsChatDots /> : <BsRobot />}
            </button>
            <ChatWithGPT className="buttontalk" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
