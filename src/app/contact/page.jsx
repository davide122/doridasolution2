"use client";
import React, { useState, useEffect } from "react";
import MyNavbar from "../../components/navbar/MyNavbar";
import ContactForm from "../../components/form/ContactForm";
import Image from "next/image";
const ContactPage = () => {
  return (
    <>
      <MyNavbar />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 vh-md-100 d-flex justify-content-center align-items-center">
            <ContactForm />
          </div>
          <div className="col-12 col-md-6">
            <Image
              src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/about/Progetto+senza+titolo+(1).png"
              alt="Foto della dorida Solution, i 3 componenti, dorin ciofalo, davide marchica, rino ciofalo"
              width={900} // Sostituisci con la larghezza reale dell'immagine per migliorare layout shift
              height={600} // Sostituisci con l'altezza reale dell'immagine
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
