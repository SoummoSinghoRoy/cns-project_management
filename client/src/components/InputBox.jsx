import React, {useState} from "react";

export function EditInputBox (props) {
  const [formData, setFormData] = useState("")
  if(props.inputFor === 'employee') {
    return(
      <form>
        <div className="input-group mb-3">
          <select 
            className="form-select"
            name="employee_type"
            value={formData}
          >
            <option>Select one type....</option>
            <option value="assistant">Assistant</option>
            <option value="coordinator">Co-ordinator</option>
          </select>
          <button className="btn btn-outline-secondary" type="button" id="button-addon2">Update</button>
        </div>
      </form>
    )
  } else if(props.inputFor === 'employee') {
    return(
      <form>
        <div Name="input-group mb-3">
          <select 
            className="form-select"
            name="status"
            value={formData}
          >
            <option>Select one.....</option>
            <option value="0">Pre</option>
            <option value="3">End</option>
          </select>
          <button className="btn btn-outline-secondary" type="button" id="button-addon2">Update</button>
        </div>
      </form>
    )
  }
}