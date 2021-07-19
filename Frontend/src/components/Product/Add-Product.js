import React, { useRef, useContext, useState } from "react";
import classes from "../../CSS/Add-Product.module.css";
import { useHistory } from "react-router";
import AuthContext from "../../store/auth-context";

const Product = () => {
  var today = new Date().toISOString().split("T")[0];
  let history = useHistory();
  const nameRef = useRef();
  const amountRef = useRef();
  const dateRef = useRef();
  const authCtx = useContext(AuthContext);
  const [file, setFile] = useState();

  // On file select (from the pop up)
  const onFileChange = (e) => {
    // Update the state
    setFile(e.target.files[0]);
  };

  const handleProduct = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", nameRef.current.value);
    formData.append("price", amountRef.current.value);
    formData.append("expiryDate", dateRef.current.value);
    formData.append("userId", authCtx.userId);
    formData.append("image", file);
    console.log(file);

    fetch("http://localhost:8080/admin/add-product", {
      method: "POST",

      body: formData,
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Creating a product failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        history.replace("/products");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className={classes.auth}>
      <form onSubmit={handleProduct}>
        <h1>The Products Page</h1>
        <div className={classes.control}>
          <input type="file" onChange={onFileChange} />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input type="name" id="name" required ref={nameRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="amount">Amount</label>
          <input type="amount" id="amount" required ref={amountRef} />
        </div>
        <div></div>
        <div className={classes.control}>
          <label htmlFor="expirydate">Expiry Date</label>
          <input
            type="date"
            id="expirydate"
            required
            min={today}
            ref={dateRef}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Save Product</button>
        </div>
      </form>
    </section>
  );
};
export default Product;
