"use client";
import React, { useState, useEffect } from "react";
import MyNavbar from "../../components/navbar/MyNavbar";
import ContactForm from "../../components/form/ContactForm";
import Image from "next/image";
import Link from "next/link";
import { CgFacebook, CgInstagram } from "react-icons/cg";
import { FaTiktok,FaLinkedinIn,FaWhatsapp } from "react-icons/fa";

const ContactPage = () => {

  const WhatsAppButton = () => {
    const whatsappNumber = "3923171968"; // Sostituisci con il tuo numero in formato internazionale senza "+"
    const defaultMessage = "Ciao, vorrei avere più informazioni!";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
  
    return (
      <Link
        href={whatsappURL}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
     <FaWhatsapp className="fs-3"></FaWhatsapp>
      </Link>
    );
  };

  return (
    <>
      <MyNavbar />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 vh-md-100 d-flex justify-content-center align-items-center flex-column">
            <ContactForm />
            <div className="container my-4 d-flex justify-content-around align-items-center">
        <Link href="https://www.facebook.com/profile.php?id=61558973363975&locale=it_IT"><CgFacebook className="fs-3"/></Link>
        <Link href="https://www.instagram.com/dorida_solution24?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><CgInstagram className="fs-3"/></Link>
        <Link href="https://www.tiktok.com/@dorida.solution?_t=8lnpH3NzBCa&_r=1"><FaTiktok className="fs-3"></FaTiktok></Link>
        <Link href="https://www.linkedin.com/company/dorida-solution/"><FaLinkedinIn className="fs-3"></FaLinkedinIn></Link>
      <WhatsAppButton></WhatsAppButton>

      </div>
          </div>
          <div className="col-12 col-md-6">
            <Image
              src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/about/Progetto+senza+titolo+(1).png"
              alt="Foto della dorida Solution, i 3 componenti, dorin ciofalo, davide marchica, rino ciofalo"
              width={900} 
              height={600} 
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
