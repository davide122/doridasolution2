"use client";
import React, { useState, useEffect } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { Offcanvas } from 'react-bootstrap';
import Image from 'next/image';
import logo from "../../../public/logo.png";
import "./mynav.css";

const MyNavbar = ({ className }) => {
   const [show, setShow] = useState(false);
   const [navbarScrolled, setNavbarScrolled] = useState(false);

   const toggleOffcanvas = () => setShow(!show);

   // Funzione per gestire lo scorrimento e cambiare lo stile della navbar
   useEffect(() => {
       const handleScroll = () => {
           if (window.scrollY > 50) {  // Ridotto a 50px per vedere meglio l'effetto
               setNavbarScrolled(true);
           } else {
               setNavbarScrolled(false);
           }
       };

       window.addEventListener('scroll', handleScroll);
       return () => {
           window.removeEventListener('scroll', handleScroll);
       };
   }, [navbarScrolled]);

   return (
       <nav className={`navbar navi navbar-expand-lg navbar-dark ${navbarScrolled ? 'navbar-scrolled' : ''} ${className}`}>
           <div className="container-fluid">
               <Link href="/" passHref className='text-decoration-none'>
                   <div className="navbar-brand d-flex align-items-center">
                       <Image src={logo} alt="Logo" width={40} height={40} className="me-2" />
                       <span>Dorida Solution</span>
                   </div>
               </Link>

               <button className="navbar-toggler" type="button" onClick={toggleOffcanvas} aria-expanded={show}>
                   <FaBars size={24} color="white" />
               </button>

               <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                   <div className="navbar-nav">
                       <Link href="/" passHref className='text-decoration-none'>
                           <div className="nav-item nav-link d-flex align-items-center nav-animated">
                             Home
                           </div>
                       </Link>
                       <Link href="/music" passHref className='text-decoration-none'>
                           <div className="nav-item nav-link d-flex align-items-center nav-animated">
                             Dorida Music
                           </div>
                       </Link>
                       <Link href="/services" passHref className='text-decoration-none'>
                           <div className="nav-item nav-link d-flex align-items-center nav-animated">
                             Servizi
                           </div>
                       </Link>
                       <Link href="/portfoliopage" passHref className='text-decoration-none'>
                           <div className="nav-item nav-link d-flex align-items-center nav-animated">
                             Portfolio
                           </div>
                       </Link>
                       <Link href="/contact" passHref className='text-decoration-none'>
                           <div className="nav-item nav-link d-flex align-items-center nav-animated">
                            Contatti
                           </div>
                       </Link>
                       <Link href="/About" passHref className='text-decoration-none'>
                           <div className="nav-item nav-link d-flex align-items-center nav-animated">
                               Chi siamo
                           </div>
                       </Link>
                   </div>
               </div>

               <Link href="/login" passHref className='text-decoration-none'>
                   <div className="d-none d-lg-block ms-3 swhite">
                       <FaUserCircle size={30} color="white" />
                   </div>
               </Link>

               <Offcanvas show={show} onHide={toggleOffcanvas} placement="end" className="fs-2 text-center d-flex justify-content-center align-items-center">
                   <Offcanvas.Header closeButton className='text-white'></Offcanvas.Header>
                   <Offcanvas.Body className='text-center'>
                       <ul className="navbar-nav text-center">
                           <Link href="/" passHref className='text-decoration-none'>
                               <div className="nav-link" onClick={toggleOffcanvas}>Home</div>
                           </Link>
                           <Link href="/music" passHref className='text-decoration-none'>
                               <div className="nav-link" onClick={toggleOffcanvas}>Dorida Music</div>
                           </Link>
                           <Link href="/services" passHref className='text-decoration-none'>
                               <div className="nav-link" onClick={toggleOffcanvas}>Servizi</div>
                           </Link>
                           <Link href="/contact" passHref className='text-decoration-none'>
                               <div className="nav-link" onClick={toggleOffcanvas}>Contatti</div>
                           </Link>
                           <Link href="/About" passHref className='text-decoration-none'>
                               <div className="nav-link" onClick={toggleOffcanvas}>Chi siamo</div>
                           </Link>
                       </ul>
                   </Offcanvas.Body>
               </Offcanvas>
           </div>
       </nav>
   );
};

export default MyNavbar;
