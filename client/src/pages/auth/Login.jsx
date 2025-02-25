import react, { useState } from "react";
import { Alert } from "../../components/Alert";
import logo from '../../asset/images/logo.png';

export function Login() {
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
    designation: "",
    department: "",
  });
  const [validationResult, setValidationResult] = useState({});
  const [responseStatus, setResponseStatus] = useState(0);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {}

  const handleSubmit = (event) => {}

  return (
    <div className="container ">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-12 col-lg-4 col-md-4">
          {responseStatus !== 200 && (
            <Alert
              alertStatus={responseStatus}
              alertMessage={message}
              updateMessage={setMessage}
              updateStatus={setResponseStatus}
            />
          )}
          <img
            src={logo}
            alt="Logo"
            className="img-fluid mx-auto d-block"
            width="160"
            height="auto"
          />
          <div className="card px-2 py-3 py-lg-4 py-md-4 justify-content-center login-card">
            <h4 className="text-center">Login Now</h4>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    onChange={handleChange}
                    value={loginFormData.username}
                    autoComplete="true"
                  />
                  {/* {responseStatus === 400 && (
                    <div className="invalid-feedback d-block">
                      {validationResult.message?.username}
                    </div>
                  )} */}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    onChange={handleChange}
                    value={loginFormData.password}
                    autoComplete="true"
                  />
                  {/* {responseStatus === 400 && (
                    <div className="invalid-feedback d-block">
                      {validationResult.message?.password}
                    </div>
                  )} */}
                </div>

                <p>
                  Don't have an account? <a href="/register">Signup</a>
                </p>
                <button type="submit" className="btn btn-outline-secondary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
