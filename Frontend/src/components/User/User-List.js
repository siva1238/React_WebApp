import { Table } from "react-bootstrap";
import { useState } from "react";
import UserDialog from "./User-Dialog";
import { Fragment } from "react";
import classes from "../../CSS/User.module.css";

const UserList = (props) => {
  const [showModal, setShow] = useState(false);
  const [rowData, setRowData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    setShow((prev) => !prev);

    setRowData(props.obj);
  };

  return (
    <Fragment>
      <Table className="table table-striped">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr key={props.obj.id} id={props.obj.id}>
            <td onClick={handleShow}>{props.obj.name}</td>
            <td>{props.obj.email}</td>
          </tr>
        </tbody>
      </Table>
      {showModal && (
        <UserDialog data={rowData} show={showModal} onHide={handleClose} />
      )}
    </Fragment>
  );
};

export default UserList;
