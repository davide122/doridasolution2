"use client"
import React, { useEffect, useState } from 'react';
import Typewriter from './Typewriter';

const ChangeColor = () => {
  const [color, setColor] = useState('#DA70D6'); // Colore iniziale
  const [title, setTitle] = useState('Visionaria'); // Titolo iniziale

  useEffect(() => {
    const handleScroll = () => {
      const section2Top = document.getElementById('sectionBelow1').offsetTop;
      const section3Top = document.getElementById('sectionBelow2').offsetTop;
      const scrollPosition = window.scrollY + window.innerHeight;

      if (scrollPosition >= section3Top) {
        setColor('#222B47'); // Cambia al colore della terza sezione
        setTitle('Unica'); // Cambia al titolo della terza sezione
      } else if (scrollPosition >= section2Top) {
        setColor('#A78FB5'); // Cambia al colore della seconda sezione
        setTitle('Innovativa'); // Cambia al titolo della seconda sezione
      } else {
        setColor('#000000'); // Colore originale
        setTitle('Visionaria'); // Titolo originale
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      

      <div id="changeColor" className="section w-100" style={{backgroundColor: color}}>
        <h2 className='Title text-white ' id='title1'>{title}</h2>
      
      </div>
      <div id="sectionBelow1" className="section">
        {/* Contenuto opzionale per la sezione 1 */}
      </div>
      <div id="sectionBelow2" className="section">
        {/* Contenuto opzionale per la sezione 2 */}
      </div>
    
    </div>
  );
};

export default ChangeColor;
