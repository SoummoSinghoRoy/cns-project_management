import React, { useState } from "react";
import { UserForm } from "../../components/Form.user";
import { useAuth } from "../../context/AuthContext";
import { employeeRegistrationFetcher } from "../../fetcher/employee.fetcher";
import { Alert } from "../../components/Alert";

export function EmployeeRegistration() {
  const { authToken } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    designation: "",
    department: "",
    employee_type: "",
    work_status: "",
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
      employee_type: "",
      work_status: "",
    });
    const registrationResponse = await employeeRegistrationFetcher(
      formData,
      authToken
    );
    if (registrationResponse.data.statusCode === 200) {
      setApiResponse(registrationResponse.data)
    } else if (
      registrationResponse.data.statusCode >= 400 ||
      registrationResponse.data.statusCode === 500
    ) {
      setApiResponse(registrationResponse.data);
    }
  };
  
  return (
    <div className="row">
      <div className="col-3"></div>
      <div className="col-12 col-lg-6 col-md-6">
        {Object.keys(apiResponse).length !== 0 && (
          <Alert
            alertStatus={apiResponse.statusCode}
            alertMessage={apiResponse.message}
            updateApiResponse={setApiResponse}
          />
        )}
        <div className="card px-2 py-3 py-lg-4 py-md-4 mt-5 justify-content-center form-card">
          <h4 className="text-center">Employee Registration</h4>
          <div className="card-body">
            <UserForm
              isEmployeeForm={true}
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
