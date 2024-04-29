"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import ServiceModal from "./ServiceModal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const ServicesExplain = () => {
  const Orizzontalesx1 =
    "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/Image/Graficheexplain/BRANDING.png";
  const Orizzontalesx2 =
    "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/Image/Graficheexplain/CAMPAGNE+PUBBLICITARIE.png";
  const Orizzontalex1 =
    "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/Image/Graficheexplain/VIDEO+MAKING.png";
  const Orizzontalex2 =
    "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/Image/Graficheexplain/CREAZIONE+LIBRI.png";
  const Orizzontaledx1 =
    "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/Image/Graficheexplain/ECOMMERCE.png";
  const Orizzontaledx2 =
    "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/Image/Graficheexplain/JINGLE.png";
  const Verticalesx =
    "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/Image/Graficheexplain/DIGITAL+MARKETING.png";
  const Verticaledx =
    "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/Image/Graficheexplain/SVILUPPO+WEB.png";
  const [modalContent, setModalContent] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const settings = {
    dots: true, // continua a mostrare i puntini di navigazione in basso, se li vuoi ancora
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false, // disabilita le frecce di navigazione
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false, // assicurati che le frecce siano disabilitate anche nei breakpoints
        },
      },
    ],
  };

  const columnData = [
    {
      id: "col1",
      colMdSize: "2",
      color: "Lilla;",
      images: [
        {
          id: "img1",
          src: Orizzontalesx1,
          title: "Branding",
          color: "Blu",
          description:
            "Il nostro approccio al branding si concentra sulla creazione di un'identità visiva che rappresenta al meglio i valori e la visione della tua azienda.",
        },
        {
          id: "img2",
          src: Orizzontalesx2,
          title: "Campagne Pubblicitarie",
          color: "Lilla",
          description:
            "Progettiamo campagne pubblicitarie che catturano l'attenzione e coinvolgono il pubblico, aumentando la visibilità del brand.",
        },
      ],
    },
    {
      id: "col2",
      colMdSize: "3",
      color: "Blu;",
      images: [
        {
          id: "img3",
          src: Verticalesx,
          title: "Digital Marketing",
          color: "Blu",
          description:
            "Trasformiamo la tua presenza digitale attraverso strategie di marketing innovative, concepite per catturare e coinvolgere il tuo pubblico target. Specializzati in soluzioni su misura, i nostri servizi di marketing digitale spaziano dalla SEO all'ottimizzazione delle campagne pay-per-click, fino alla gestione sofisticata dei social media.",
          vertical: true,
        },
      ],
    },
    {
      id: "col3",
      colMdSize: "2",
      color: "Blu;",
      images: [
        {
          id: "img4",
          src: Orizzontalex1,
          color: "Blu",
          title: "Produzione Video",
          description:
            "Realizziamo video che raccontano storie, promuovono prodotti e trasmettono messaggi in modo efficace e coinvolgente",
        },
        {
          id: "img5",
          src: Orizzontalex2,
          color: "Lilla",
          title: "Creazione di Libri",
          description:
            "Supportiamo autori nella trasformazione delle loro opere in libri pubblicati, curando ogni aspetto dall'editing alla distribuzione.",
        },
      ],
    },
    {
      id: "col4",
      colMdSize: "3",
      color: "Blu;",
      images: [
        {
          id: "img6",
          src: Verticaledx,
          title: "Sviluppo Web Fullstack",
          description:
            "Nel dinamico mondo digitale di oggi, un sito web performante e interattivo è fondamentale per il successo di ogni business. A Dorida Solution, offriamo servizi di sviluppo web full-stack che coprono ogni aspetto del processo di sviluppo: dal frontend visivamente accattivante al backend robusto e sicuro.",
          vertical: true,
        },
      ],
    },
    {
      id: "col5",
      colMdSize: "2",
      images: [
        {
          id: "img7",
          src: Orizzontaledx1,
          title: "Soluzioni E-commerce",
          description:
            "In un mercato globale sempre più competitivo, avere una soluzione e-commerce robusta e personalizzata è fondamentale. Dorida Solution si specializza nella progettazione e realizzazione di piattaforme e-commerce che non solo attraggono e coinvolgono i clienti, ma ottimizzano anche il percorso di acquisto per massimizzare le conversioni e la fedeltà del cliente.",
        },
        {
          id: "img8",
          src: Orizzontaledx2,
          title: "Jingle",
          description:
            "Cattura l'attenzione del tuo pubblico e lascia un'impressione duratura con i jingle unici di Dorida Solution. Specializzati nella creazione di jingle sia musicali che parlati, trasformiamo il tuo messaggio aziendale in un richiamo memorabile che risona con il tuo pubblico e rafforza la tua identità di marca.",
        },
      ],
    },
  ];

  const handleImageClick = (imageData) => {
    setModalContent(imageData);
    setModalShow(true);
  };

  return (
    <div className="container-fluid slide">
      {/* Carosello visibile solo su dispositivi mobili */}
      <div className="d-md-none">
        <Slider {...settings} className="my-3">
          {columnData
            .flatMap((column) =>
              column.images.filter((image) => !image.vertical)
            )
            .map((image) => (
              <div
                key={image.id}
                onClick={() => {
                  setModalContent(image);
                  setModalShow(true);
                }}
              >
                <Image
                  src={image.src}
                  width={500}
                  height={500}
                  alt={image.title}
                  className="img-fluid rounded-2"
                />
              </div>
            ))}
        </Slider>
      </div>

      {/* Layout griglia per dispositivi non mobili */}
      <div className="d-none d-md-flex row">
        {columnData.map((column) => (
          <div key={column.id} className={`col-md-${column.colMdSize}`}>
            {column.images.map((image) => (
              <div
                key={image.id}
                className={`mb-5 ${image.vertical ? "d-none d-md-block" : ""}`}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  width={500}
                  height={500}
                  className="img-fluid rounded-2"
                  onClick={() => {
                    setModalContent(image);
                    setModalShow(true);
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {modalContent && (
        <ServiceModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            setModalContent(null);
          }}
          serviceInfo={modalContent}
        />
      )}
    </div>
  );
};

export default ServicesExplain;
