import React, { useState } from "react";
import logo from "../../asset/images/logo.png";
import { signupFetcher } from "../../fetcher/auth.fetcher";
import { Alert } from "../../components/Alert";
import { useNavigate } from "react-router";
import { UserForm } from "../../components/Form.user";

export function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    designation: "",
    department: "",
  });
  const [apiResponse, setApiResponse] = useState({});

  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData({
      username: "",
      password: "",
      designation: "",
      department: "",
    });
    const signupResponse = await signupFetcher(formData);

    if (signupResponse.data.statusCode === 200) {
      navigate("/login");
    } else if (
      signupResponse.data.statusCode >= 400 ||
      signupResponse.data.statusCode === 500
    ) {
      setApiResponse(signupResponse.data);
    }
  };

  return (
    <div className="row">
      <div className="col-4"></div>
      <div className="col-12 col-lg-4 col-md-4">
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
        <div className="card px-2 py-3 py-lg-4 py-md-4 justify-content-center form-card">
          <h4 className="text-center">SignUp Now</h4>
          <div className="card-body">
            <UserForm
              formData={formData}
              apiResponse={apiResponse}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
