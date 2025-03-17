import React, { useState } from "react";
import { Alert } from "../../components/Alert";
import logo from "../../asset/images/logo.png";
import { loginFetcher } from "../../fetcher/auth.fetcher";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  const [apiResponse, setApiResponse] = useState({});

  const handleChange = (event) => {
    let { name, value } = event.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginFormData({
      username: "",
      password: "",
    });
    const loginResponse = await loginFetcher(loginFormData);

    if (loginResponse.data.statusCode === 200) {
      login(loginResponse.data.token);
      navigate("/");
    } else if (
      [400, 401, 403, 404, 406].includes(loginResponse.data.statusCode)
    ) {
      setApiResponse(loginResponse.data);
    } else if (loginResponse.data.statusCode >= 500) {
      setApiResponse(loginResponse.data);
    }
  };

  return (
    <div className="row mx-2 mx-lg-0 mx-md-0 align-items-center">
      <div className="col-lg-4 col-md-2"></div>
      <div className="col-12 col-lg-4 col-md-8 px-lg-4 px-md-4">
        {!apiResponse.success && (
          <Alert
            alertStatus={apiResponse.statusCode}
            alertMessage={apiResponse.message}
            updateApiResponse={setApiResponse}
          />
        )}
        <img
          src={logo}
          alt="Logo"
          className="img-fluid mx-auto d-block"
          width="160"
          height="auto"
        />
        <div className="card px-2 py-3 py-lg-4 py-md-4 form-card">
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
                {apiResponse.statusCode === 400 && (
                  <div className="invalid-feedback d-block">
                    {apiResponse.error.message?.username}
                  </div>
                )}
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
                {apiResponse.statusCode === 400 && (
                  <div className="invalid-feedback d-block">
                    {apiResponse.error.message?.password}
                  </div>
                )}
              </div>

              <p>
                Don't have an account? <a href="/signup">Signup</a>
              </p>
              <button
                type="submit"
                className="btn btn-outline-secondary fw-semibold form-button"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
