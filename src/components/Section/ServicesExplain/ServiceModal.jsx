import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./Modal.css";
import Image from "next/image";

const ServiceModal = ({ show, onHide, serviceInfo }) => {
  const modalBodyClass = serviceInfo.color === "Blu" ? "Blu" : "Lilla";
  const modalBodyText = serviceInfo.color === "Blu" ? "TestoBlu" : "TestoLilla";
  const Changebg = serviceInfo.color === "Blu" ? "ChangeBlue" : "ChangeLilla";

  console.log(modalBodyClass);
  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open-custom");
    } else {
      document.body.classList.remove("modal-open-custom");
    }

    return () => {
      document.body.classList.remove("modal-open-cusstom");
    };
  }, [show]);

  const handleShowMore = () => {
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className={`CloseButtonDiv ${Changebg}`}>
        <button onClick={onHide} className={`Close-Button`}></button>
      </div>
      <Modal.Body id="prova" className={modalBodyClass}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-7 order-md-1 order-2">
              <h2 className={`Titolo ${modalBodyText}`}>
                {" "}
                {serviceInfo.title}
              </h2>
              <p className="Sottotitolo">
                {serviceInfo.description.slice(0, 350) + "..."}
              </p>
            </div>
            <div className="col-12 col-md-5 order-md-2 order-1">
              <Image
                src={serviceInfo.src}
                alt={serviceInfo.title}
                width={500}
                height={500}
                className="img-fluid imageExplain"
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ServiceModal;
