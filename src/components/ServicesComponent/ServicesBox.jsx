"use client"
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import data from "../json/service.json";

const ServicesBox = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".service-row").forEach((row, index) => {
      gsap.fromTo(
        row,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1.2,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            end: "bottom 30%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div className="container overflow-hidden mt-4">
   
      {data.map((service, index) => (
        <div
          key={service.id}
          className={`row p-5 p-md-2 my-5 overflow-hidden service-row rounded-5 shadow-lg ${index % 2 !== 0 ? " flex-row-reverse" : ""}`}
        >
          <div className="col-md-6 col-sm-12 vh-md-100 d-flex justify-content-center align-items-center">
            <div>
              <p className="fs-3 bold text-md-start text-center my-0 d-none d-md-block">
                {service.title}
              </p>
              <h1 className="Title text-white fw-bold text-md-start w-100 text-center my-0">
                {service.title}
              </h1>
              <p className="fs-6 text-md-start text-center my-3">
                {service.description}
              </p>
              <button className="btn bg-white">
                Preventivo gratuito per {service.title}
              </button>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 vh-md-100 d-flex justify-content-center align-items-center">
            <Image
              src={service.icon}
              alt={service.title}
              width={500}
              height={500}
              className="img-fluid"
            />
          </div>
        </div>
      ))}
    </div>
  );
};



export default ServicesBox;