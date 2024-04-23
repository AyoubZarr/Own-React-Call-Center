import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ConfirmationModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn-sm"
          variant="primary"
          onClick={() => props.onResponse(1)}
        >
          Yes
        </Button>
        <Button
          className="btn-sm"
          variant="secondary"
          onClick={() => props.onResponse(0)}
        >
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
