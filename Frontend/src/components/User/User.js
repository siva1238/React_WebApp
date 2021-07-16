import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import classes from "../../CSS/User.module.css";

const User = () => {
  const dobRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();
  const nameRef = useRef();
  const ageRef = useRef();
  const [age, setAge] = useState("");
  let history = useHistory();

  const calculateAge = () => {
    var today = new Date();
    var birthDate = new Date(dobRef.current.value);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
  };

  const switchAuthModeHandler = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/admin/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: pwdRef.current.value,
        name: nameRef.current.value,
        dob: dobRef.current.value,
        age: ageRef.current.value,
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
          throw new Error("Creating a user failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        history.replace("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className={classes.auth}>
      <form noValidate onSubmit={switchAuthModeHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input type="name" id="name" required ref={nameRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required ref={pwdRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="dob">DOB</label>
          <input
            type="Date"
            id="dob"
            required
            onChange={calculateAge}
            ref={dobRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            required
            value={age}
            readOnly
            ref={ageRef}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Add User</button>
        </div>
      </form>
    </section>
  );
};
export default User;
