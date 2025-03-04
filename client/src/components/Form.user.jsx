import React from "react";
import '../asset/styles/auth.css'

export function UserForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="form-control"
          onChange={props.handleChange}
          value={props.formData.username}
          autoComplete="true"
        />
        {props.apiResponse.statusCode === 400 && (
          <div className="invalid-feedback d-block">
            {props.apiResponse.error.message?.username}
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
          onChange={props.handleChange}
          value={props.formData.password}
          placeholder="Password length min 6, max 10"
          autoComplete="true"
        />
        {props.apiResponse.statusCode === 400 && (
          <div className="invalid-feedback d-block">
            {props.apiResponse.error.message?.password}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="designation" className="mb-2">
          Designation
        </label>
        <input
          type="text"
          id="designation"
          name="designation"
          className="form-control"
          onChange={props.handleChange}
          value={props.formData.designation}
          autoComplete="true"
        />
        {props.apiResponse.statusCode === 400 && (
          <div className="invalid-feedback d-block">
            {props.apiResponse.error.message?.designation}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="department" className="mb-2">
          Department
        </label>
        <input
          type="text"
          id="department"
          name="department"
          className="form-control"
          onChange={props.handleChange}
          value={props.formData.department}
          autoComplete="true"
        />
        {props.apiResponse.statusCode === 400 && (
          <div className="invalid-feedback d-block">
            {props.apiResponse.error.message?.department}
          </div>
        )}
      </div>
      {
        props.isEmployeeForm && 
        <>
          <div className="mb-3">
            <label htmlFor="employee_type" className="mb-2">Employee type</label>
            <select 
              className="form-select"
              name="employee_type"
              onChange={props.handleChange}
              value={props.formData.employee_type}
              aria-label="employee_type"
            >
              <option>Select one type....</option>
              <option value="assistant">Assistant</option>
              <option value="coordinator">Co-ordinator</option>
            </select>
            {props.apiResponse.statusCode === 400 && (
              <div className="invalid-feedback d-block">
                {props.apiResponse.error.message?.employee_type}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="work_status" className="mb-2">Work status</label>
            <select 
              className="form-select" 
              name="work_status"
              onChange={props.handleChange} 
              value={props.formData.work_status}
              aria-label="work_status"
            >
              <option>Select one status....</option>
              <option value="available">Available</option>
              <option value="engaged">Engaged</option>
            </select>
            {props.apiResponse.statusCode === 400 && (
              <div className="invalid-feedback d-block">
                {props.apiResponse.error.message?.work_status}
              </div>
            )}
          </div>
        </>
      }

      {
        !props.isEmployeeForm ? 
        <>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
          <button
            type="submit"
            className="btn btn-outline-secondary fw-semibold form-button"
          >
            Sign up
          </button>
        </> :
        <button
          type="submit"
          className="btn btn-outline-secondary form-button fw-semibold"
        >
          Registration
        </button>
      }
    </form>
  );
}
