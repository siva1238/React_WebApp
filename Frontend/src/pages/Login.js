import React, { useState, useRef, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../CSS/Login.css";
import AuthContext from "../store/auth-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailError, setemailError] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);

    setFormIsValid(e.target.value.includes("@") && password.trim().length > 3);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);

    setFormIsValid(email.includes("@") && event.target.value.trim().length > 3);
  };

  const validateEmailHandler = () => {
    if (!email.includes("@")) {
      setEmailIsValid(email.includes("@"));
      setemailError("Enter correct Email");
    }
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(password.trim().length > 3);
  };

  function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    fetch("http://localhost:8080/admin/login", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then((data) => {
        authCtx.login(data);
        history.replace("/home");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }

  return (
    <div className="Login col-md-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            ref={emailInputRef}
            required
            placeholder="Enter your Email"
          />
          <span className="error">{emailError}</span>
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            ref={passwordInputRef}
            required
            placeholder="Enter your Password"
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!formIsValid}>
          Login
        </Button>
      </Form>
    </div>
  );
};
export default Login;
