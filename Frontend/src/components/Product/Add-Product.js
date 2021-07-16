import React, { useRef, useContext } from "react";
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

  const handleProduct = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/admin/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        price: amountRef.current.value,
        expiryDate: dateRef.current.value,
        imageUrl: "",
        userId: authCtx.userId,
      }),
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
