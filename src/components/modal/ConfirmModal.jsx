import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, onHide, onConfirm, title, children }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>Annulla</Button>
      <Button variant="danger" onClick={onConfirm}>Elimina</Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmModal;
