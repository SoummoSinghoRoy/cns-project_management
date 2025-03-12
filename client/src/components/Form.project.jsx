import React, {useState, useEffect} from 'react';
import { retrieveAvailableTeamMember } from '../fetcher/project.fetcher';
import { useAuth } from '../context/AuthContext';
import { tokenDecoder } from '../utility/token_decoded';

export function ProjectForm(props) {
  const {authToken} = useAuth();
  const decodeResult= tokenDecoder(authToken);
  const [availableTeamMembers, setAvailableTeamMembers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await retrieveAvailableTeamMember(authToken);
      console.log(response);
      
      if(response.data.statusCode === 200) {
        setAvailableTeamMembers(response.data.data);
        console.log(availableTeamMembers);
        
      } else {
        setAvailableTeamMembers(null)
      }
    })()
  }, [])

  return(
    <form onSubmit={props.handleSubmit}>
      <div className='form-floating mb-3'>
        <label htmlFor="name">Name</label>
        <input 
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={props.formData.name}
          onChange={props.handleChange} 
        />
      </div>

      <div className='form-floating mb-3'>
        <label htmlFor="intro">Intro</label>
        <input 
          type="text"
          id="intro"
          name="intro"
          className="form-control"
          value={props.formData.intro}
          onChange={props.handleChange} 
        />
      </div>

      <div className='form-floating mb-3'>
        <label htmlFor="startDateTime">Start date</label>
        <input 
          type="text"
          id="startDateTime"
          name="startDateTime"
          className="form-control"
          value={props.formData.startDateTime}
          onChange={props.handleChange} 
        />
      </div>

      <div className='form-floating mb-3'>
        <label htmlFor="endDateTime">End Date</label>
        <input 
          type="text"
          id="endDateTime"
          name="endDateTime"
          className="form-control"
          value={props.formData.endDateTime}
          onChange={props.handleChange} 
        />
      </div>
      {
        props.isProjectAddFrom &&
        <>
          <div className='form-floating mb-3'>
            <label htmlFor="status">Status</label>
            <input 
              type="text"
              id="status"
              name="status"
              className="form-control"
              value={props.formData.status}
              onChange={props.handleChange} 
            />
          </div>

          <div className='form-floating mb-3'>
            <select 
              className="form-select" 
              id="teamMembers" 
              aria-label="Select team members"
              value={props.formData.status}
              onChange={props.handleChange} 
            >
              <option>Choose members....</option>
              {
                availableTeamMembers.lenght > 0 ?
                availableTeamMembers.map((member) => (
                  <>
                    <option value={member.id}>{member.username}</option>
                  </>
                )):
                <option>No members found</option>
              }
            </select>
            <label htmlFor="teamMembers">Add team members</label>
          </div>
        </> 
      }
      <button
        type="submit"
        className="btn btn-outline-secondary fw-semibold form-button"
      >
        Submit
      </button>
    </form>
  )
}