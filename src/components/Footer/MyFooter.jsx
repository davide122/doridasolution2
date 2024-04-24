"use client"
import React from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from "next/link"; // Importa Link da Next.js
import logo from "../../../public/logo.png"; // Assicurati che il percorso sia corretto
import { CgFacebook, CgInstagram } from "react-icons/cg";
import { FaTiktok,FaLinkedinIn } from "react-icons/fa";

function MyFooter() {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      transition={{ duration: 0.5 }}
      className="bg-black text-white pt-1 Offcanvas"
    >
      <div className="container-fluid p-5 bor d-flex ">
        <div className="row">
          <div className="col-12 col-md-6 mb-3 mb-md-0 pd-3 d-flex">
            <div className="">
              <div className="mt-n3 ">
                <Link href="/" passHref className="text-decoration-none">
                  <span className="d-flex mb-3 align-items-center link-dark text-decoration-none" role="button">
                    <Image src={logo} alt="Dorida Solution Logo" width={100} height={103} />
                    <span className="fs-5 navtitle text-white">
                      Dorida Solution
                    </span>
                  </span>
                </Link>
              </div>
              <p className="text-white fs-6 text-start w-100">
                Unire tradizione e innovazione per plasmare il futuro dell&apos;Italia.
              </p>
              <p className="text-white fs-6 text-start">
                In Dorida Solution, abilitiamo il progresso tramite soluzioni tecnologiche  all&apos;avanguardia, promuovendo la conoscenza e la connettività per dare forma a un domani più luminoso e sostenibile per tutti.
              </p>
            </div>
          </div>
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h5 className="navtitle">Sezione</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2 lifooter">
                <Link href="/" passHref className="text-decoration-none"><span className="nav-link p-0 lifooter " role="button">Home</span></Link>
              </li>
              <li className="nav-item mb-2 lifooter">
                <Link href="/features" passHref className="text-decoration-none"><span className="nav-link p-0 lifooter" role="button">Features</span></Link>
              </li>
              <li className="nav-item mb-2 lifooter">
                <Link href="/pricing" passHref className="text-decoration-none"><span className="nav-link p-0 lifooter" role="button">Pricing</span></Link>
              </li>
              <li className="nav-item mb-2 lifooter">
                <Link href="/faqs" passHref className="text-decoration-none"><span className="nav-link p-0 lifooter" role="button">FAQs</span></Link>
              </li>
              <li className="nav-item mb-2 lifooter">
                <Link href="/about" passHref className="text-decoration-none"><span className="nav-link p-0 lifooter" role="button">About</span></Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <h5 className="navtitle">Contatti</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2 lifooter">
                <Link href="/tiktok" passHref className="text-decoration-none"><span className="nav-link p-0 lifooter" role="button">Tiktok</span></Link>
              </li>
              <li className="nav-item mb-2 lifooter">
                <Link href="/facebook" passHref className="text-decoration-none"><span className="nav-link p-0 lifooter" role="button">Facebook</span></Link>
              </li>
              <li className="nav-item mb-2 lifooter">
                <Link href="/instagram" passHref className="text-decoration-none"><span className="nav-link p-0 lifooter" role="button">Instagram</span></Link>
              </li>
              <li className="nav-item mb-2 lifooter">
                <Link href="/linkedin" passHref className="text-decoration-none"><span className="nav-link p-0 lifooter" role="button">Linkedin</span></Link>
              </li>
              <li className="nav-item mb-2 lifooter">
                <Link href="/doridamusic" passHref className="text-decoration-none"><span className="nav-link p-0 lifooter" role="button">DoridaMusic</span></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container py-2 d-flex justify-content-around align-items-center">
        <Link href="https://www.facebook.com/profile.php?id=61558973363975&locale=it_IT"><CgFacebook className="fs-3"/></Link>
        <Link href="https://www.instagram.com/dorida_solution24?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><CgInstagram className="fs-3"/></Link>
        <Link href="https://www.tiktok.com/@dorida.solution?_t=8lnpH3NzBCa&_r=1"><FaTiktok className="fs-3"></FaTiktok></Link>
        <Link href="https://www.linkedin.com/company/dorida-solution/"><FaLinkedinIn className="fs-3"></FaLinkedinIn></Link>


      </div>
      <hr />
      <div className="w-100 py-2">
        <p className="fs-6" id="PositionBottom">
          © {new Date().getFullYear()} Dorida Solution. Tutti i diritti riservati.
        </p>
      </div>
    </motion.footer>
  );
}

export default MyFooter;
