import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ProductDialog = (props) => {
  const [show, setShow] = useState(true);
  const [modelData, setModelData] = useState(props.modelData);

  let path = "http://localhost:8080/" + `${modelData.imageUrl}`;

  const handleClose = () => {
    setShow(false);
    props.closeModelHandler();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={path}
            className="card-img-top"
            alt="Image is not available"
          />

          <p> Title: {modelData.name}</p>
          <p>Price: {modelData.price}</p>
          <p>Expiry Date: {modelData.expiryDate}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductDialog;
