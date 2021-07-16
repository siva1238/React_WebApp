import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "../../CSS/User.module.css";

const UserDialog = (props) => {
  //const obj = props.data[0];
  console.log(props);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <ul className={classes.modalList}>
            <li key={props.data.id}>Name: {props.data.name} </li>
            <li> Email: {props.data.email} </li>
            <li> DOB: {props.data.dob} </li>
            <li> Age: {props.data.age} </li>
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDialog;
