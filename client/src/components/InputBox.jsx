import React, {useState, useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import { updateEmployeeTypeFetcher } from "../fetcher/employee.fetcher";
import { Alert } from "./Alert";

export function EditInputBox (props) {
  const { authToken } = useAuth();
  const [formData, setFormData] = useState({
    employee_type: '',
    status: ''
  });
  const [apiResponse, setApiResponse] = useState({});

  useEffect(() => {
    if (!props.modalOpen) {
      setFormData({
        employee_type: '',
        status: ''
      });
    }
  }, [props.modalOpen]); 

  const changeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const submitHandler =  async(event) => {
    event.preventDefault();
    setFormData({
      employee_type: ''
    })
    if(props.inputFor === 'employee') {
      const updateResponse = await updateEmployeeTypeFetcher(authToken, props.employeeId, formData);
      console.log(updateResponse);
      
      if (updateResponse.data.statusCode === 200) {
        setApiResponse(updateResponse.data)
      } else if (
        updateResponse.data.statusCode >= 400 ||
        updateResponse.data.statusCode === 500
      ) {
        setApiResponse(updateResponse.data);
      }
    } else if(props.inputFor === 'project') {
      // it'll call project status update api.
    }
  }

  if(props.inputFor === 'employee') {
    return(
      <>
      {Object.keys(apiResponse).length !== 0 && (
          <Alert
            alertStatus={apiResponse.statusCode}
            alertMessage={apiResponse.message}
            updateApiResponse={setApiResponse}
          />
        )}
        <form onSubmit={submitHandler} className="py-3">
          <div className="input-group mb-3">
            <select 
              className="form-select"
              name="employee_type"
              value={formData.employee_type}
              onChange={changeHandler}
            >
              <option>Select one type....</option>
              <option value="assistant">Assistant</option>
              <option value="coordinator">Co-ordinator</option>
            </select>
            <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Update</button>
          </div>
        </form>
      </>
    )
  } else if(props.inputFor === 'project') {
    return(
      <>
        <form onSubmit={submitHandler} className="py-3">
          <div Name="input-group mb-3">
            <select 
              className="form-select"
              name="status"
              value={formData.status}
              onChange={changeHandler}
            >
              <option>Select one.....</option>
              <option value="0">Pre</option>
              <option value="3">End</option>
            </select>
            <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Update</button>
          </div>
        </form>
      </>
    )
  }
}