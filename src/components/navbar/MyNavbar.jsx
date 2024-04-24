"use client"
import React, { useState } from 'react';
import { FaBars, FaUserCircle, FaHome, FaMusic, FaBriefcase, FaPhone, FaInfoCircle } from 'react-icons/fa';
import Link from 'next/link';
import { Offcanvas } from 'react-bootstrap';
import Image from 'next/image';
import logo from "../../../public/logo.png"
import "./mynav.css"
const MyNavbar = ({ className }) => {
    const [show, setShow] = useState(false);

    const toggleOffcanvas = () => setShow(!show);

    return (
        <nav className={`navbar navi navbar-expand-lg navbar-dark ${className}`} style={{ backgroundColor: '#000' }}>
            <div className="container-fluid">
                <Link href="/" passHref className='text-decoration-none'>
                    <div className="navbar-brand d-flex align-items-center">
                        <Image src={logo} alt="Logo" width={40} height={40} className="me-2" />
                        <span>Dorida Solution</span>
                    </div>
                </Link>

                <button className="navbar-toggler" type="button" onClick={toggleOffcanvas}>
                    <FaBars size={24} color="white" />
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link href="/" passHref className='text-decoration-none'>
                            <div className="nav-item nav-link d-flex align-items-center">
                                <FaHome className="me-2" />Home
                            </div>
                        </Link>
                        <Link href="/music" passHref className='text-decoration-none'>
                            <div className="nav-item nav-link d-flex align-items-center">
                                <FaMusic className="me-2" />Dorida Music
                            </div>
                        </Link>
                        <Link href="/services" passHref className='text-decoration-none'>
                            <div className="nav-item nav-link d-flex align-items-center">
                                <FaBriefcase className="me-2" />Servizi
                            </div>
                        </Link>
                        <Link href="/contact" passHref className='text-decoration-none'>
                            <div className="nav-item nav-link d-flex align-items-center">
                                <FaPhone className="me-2" />Contatti
                            </div>
                        </Link>
                        <Link href="/About" passHref className='text-decoration-none'>
                            <div className="nav-item nav-link d-flex align-items-center">
                                <FaInfoCircle className="me-2" />Chi siamo
                            </div>
                        </Link>
                    </div>
                </div>

                <Link href="/login" passHref className='text-decoration-none'>
                    <div className="d-none d-lg-block ms-3">
                        <FaUserCircle size={30} color="white" />
                    </div>
                </Link>

                <Offcanvas show={show} onHide={toggleOffcanvas} placement="end" className="gradient fs-2 text-center d-flex justify-content-center align-items-center">
                    <Offcanvas.Header closeButton className='text-white'>
                    </Offcanvas.Header>
                    <Offcanvas.Body className='text-center'>
                        <ul className="navbar-nav text-center">
                            <Link href="/" passHref className='text-decoration-none'>
                                <div className="nav-link" onClick={toggleOffcanvas}>
                                    <FaHome className="me-2" />Home
                                </div>
                            </Link>
                            <Link href="/music" passHref  className='text-decoration-none'>
                                <div className="nav-link" onClick={toggleOffcanvas}>
                                    <FaMusic className="me-2" />Dorida Music
                                </div>
                            </Link>
                            <Link href="/services" passHref  className='text-decoration-none'>
                                <div className="nav-link" onClick={toggleOffcanvas}>
                                    <FaBriefcase className="me-2" />Servizi
                                </div>
                            </Link>
                            <Link href="/contact" passHref  className='text-decoration-none'>
                                <div className="nav-link" onClick={toggleOffcanvas}>
                                    <FaPhone className="me-2" />Contatti
                                </div>
                            </Link>
                            <Link href="/About" passHref  className='text-decoration-none'>
                                <div className="nav-link" onClick={toggleOffcanvas}>
                                    <FaInfoCircle className="me-2" />Chi siamo
                                </div>
                            </Link>
                        </ul>
                    </Offcanvas.Body>
               
                </Offcanvas>
            </div>
        </nav>
    );
};

export default MyNavbar;
