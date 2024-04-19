"use client"
import { FiHome, FiMusic, FiRadio, FiUser } from "react-icons/fi";
import Link from "next/link"; // Usa Link di Next.js
import Image from 'next/image'; // Usa Image di Next.js per ottimizzazione immagini
import logo from "../../../public/logo.png"; // Assicurati che il percorso sia corretto e spostato nella cartella public
import "./Css/Musicnav.css";

const MusicNavbar = () => {
  return (
    <nav className="navbar navbar-dark bg-black">
      <div className="container-fluid">
        <Link href="/" passHref>
          <span className="navbar-brand d-flex align-items-center" role="button">
            <Image src={logo} alt="Dorida Logo" height="60" className="d-inline-block align-top" />
            <span className='navbar-text ms-2'>Dorida Music</span>
          </span>
        </Link>

        {/* Toggler e offcanvas per dispositivi mobili */}
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/" passHref>
                  <span className="nav-link" role="button">
                    <FiHome className="fs-4" /><span className="ms-2 navbar-text">Home</span>
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/music" passHref>
                  <span className="nav-link" role="button">
                    <FiMusic className="fs-4" /><span className="ms-2 navbar-text">Music</span>
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/radio" passHref>
                  <span className="nav-link" role="button">
                    <FiRadio className="fs-4" /><span className="ms-2 navbar-text">Radio</span>
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/user" passHref>
                  <span className="nav-link" role="button">
                    <FiUser className="fs-4" /><span className="ms-2 navbar-text">User</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MusicNavbar;
