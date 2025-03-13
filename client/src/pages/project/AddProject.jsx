import React, {useState} from 'react';
import { Alert } from '../../components/Alert';
import { useAuth } from '../../context/AuthContext';
import { tokenDecoder } from '../../utility/token_decoded';
import { ProjectForm } from '../../components/Form.project';
import { projectAddFetcher } from '../../fetcher/project.fetcher';

export function AddProject() {
  const {authToken} = useAuth();
  const decodeResult= tokenDecoder(authToken);
  const [formData, setFormData] = useState({
    name: "",
    intro: "",
    startDateTime: "",
    endDateTime: "",
    ownerId: decodeResult.id,
    status: "",
    teamMembers: []
  });
  const [selectedMembers, setSelectedMembers] = useState([]);

  const [apiResponse, setApiResponse] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSelect= (selectedOptions) => {
    const membersId = selectedOptions.map(member => member.value);

    setSelectedMembers(selectedOptions);
    setFormData({
      ...formData,
      teamMembers: membersId
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormData({
      name: "",
      intro: "",
      startDateTime: "",
      endDateTime: "",
      ownerId: decodeResult.id,
      status: "",
      teamMembers: []
    })
    const response = await projectAddFetcher(authToken, formData);
    setApiResponse(response.data)
  }

  return(
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
          <h4 className="text-center">Add new project</h4>
          <div className="card-body">
            <ProjectForm
              isProjectAddFrom={true} 
              formData={formData}
              selectedMembers= {selectedMembers} 
              apiResponse={apiResponse} 
              handleChange={handleChange} 
              handleSubmit={handleSubmit}
              handleSelect={handleSelect}
            />
          </div>
        </div>
      </div>
    </div>
  )
}