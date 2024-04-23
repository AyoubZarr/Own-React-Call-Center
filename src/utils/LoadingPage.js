import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Modal from "react-bootstrap/Modal";

const LoadingPage = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <ProgressBar animated now={100} />
      </Modal.Body>
    </Modal>
  );
};

export default LoadingPage;
