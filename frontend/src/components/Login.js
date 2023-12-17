import React, { useState } from "react";
import { useDispatch } from "react-redux";
import validator from "validator";
import { startLoginUser } from "../actions/userAction";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const errors = {};

  const dispatch = useDispatch();

  const navigation = () => {
    navigate("/");
  };

  const handleValidation = () => {
    if (validator.isEmpty(email)) {
      errors.email = "Email is required";
    } else if (!validator.isEmail(email)) {
      errors.email = "Invalid email Format";
    }

    if (validator.isEmpty(password)) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleValidation();

    if (Object.keys(errors).length === 0) {
      const formData = {
        email,
        password,
      };
      dispatch(startLoginUser(formData, navigation));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form
            onSubmit={handleSubmit}
            className="border p-4"
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <h1 className="mb-4">Login here</h1>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                id="email"
                className={`form-control ${
                  formErrors?.email ? "is-invalid" : ""
                }`}
                value={email}
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {formErrors?.email && (
                <div className="invalid-feedback">{formErrors?.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`form-control ${
                  formErrors?.password ? "is-invalid" : ""
                }`}
                value={password}
                placeholder="Enter your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {formErrors?.password && (
                <div className="invalid-feedback">{formErrors?.password}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
