import React, { useState, useEffect } from "react";
import { retrieveAvailableTeamMember } from "../fetcher/project.fetcher";
import { useAuth } from "../context/AuthContext";
import Select from 'react-select'
import { textCapitalize } from "../utility/textCapitalize";

export function ProjectForm(props) {
  const { authToken } = useAuth();
  const [availableTeamMembers, setAvailableTeamMembers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await retrieveAvailableTeamMember(authToken);
      const formattedTeamMembers = response.data.data.map((member) => ({
        value: member.id,
        label: `${textCapitalize(member.username)} - ${member.designation}`,
      }));
      setAvailableTeamMembers(formattedTeamMembers);
    })();
  }, [props.isProjectAddFrom]);

  return (
    <form onSubmit={props.handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={props.formData.name}
          onChange={props.handleChange}
        />
        {props.apiResponse.statusCode === 400 && (
          <div className="invalid-feedback d-block">
            {props.apiResponse.error.message?.name}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="intro" className="mb-2">Intro</label>
        <input
          type="text"
          id="intro"
          name="intro"
          className="form-control"
          value={props.formData.intro}
          onChange={props.handleChange}
        />
        {props.apiResponse.statusCode === 400 && (
          <div className="invalid-feedback d-block">
            {props.apiResponse.error.message?.intro}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="startDateTime" className="mb-2">Start date</label>
        <input
          type="date"
          id="startDateTime"
          name="startDateTime"
          className="form-control"
          value={props.formData.startDateTime}
          onChange={props.handleChange}
        />
        {props.apiResponse.statusCode === 400 && (
          <div className="invalid-feedback d-block">
            {props.apiResponse.error.message?.startDateTime}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="endDateTime" className="mb-2">End Date</label>
        <input
          type="date"
          id="endDateTime"
          name="endDateTime"
          className="form-control"
          value={props.formData.endDateTime}
          onChange={props.handleChange}
        />
        {props.apiResponse.statusCode === 400 && (
          <div className="invalid-feedback d-block">
            {props.apiResponse.error.message?.endDateTime}
          </div>
        )}
      </div>
      {props.isProjectAddFrom && (
        <>
          <div className="mb-3">
            <label htmlFor="status" className="mb-2">Status</label>
            <select 
              className="form-select" 
              aria-label="Default select example"
              id="status"
              name="status"
              value={props.formData.status}
              onChange={props.handleChange}
            >
              <option>Choose one....</option>
              <option value="1">Start</option>
              <option value="3">End</option>
            </select>
            {props.apiResponse.statusCode === 400 && (
          <div className="invalid-feedback d-block">
            {props.apiResponse.error.message?.status}
          </div>
        )}
          </div>

          <div className="mb-3">
            <label className="mb-2">Select team member</label>
            {
              availableTeamMembers.length > 0 ?
              <>
                <Select
                isMulti
                name="teamMembers"
                options={availableTeamMembers}
                value={props.selectedMembers}
                onChange={props.handleSelect}
                className="basic-multi-select"
                classNamePrefix="select" 
                placeholder="Max 5 members alow"
              />
              {props.apiResponse.statusCode === 400 && (
                <div className="invalid-feedback d-block">
                  {props.apiResponse.error.message?.name}
                </div>
              )} 
              </>
              :
              <p>No members found</p>
            }

          </div>
        </>
      )}
      <button
        type="submit"
        className="btn btn-outline-secondary fw-semibold form-button"
      >
        Submit
      </button>
    </form>
  );
}
