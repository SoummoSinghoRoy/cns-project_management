import React, {useState} from 'react';
import { Alert } from '../../components/Alert';
import { useAuth } from '../../context/AuthContext';
import { tokenDecoder } from '../../utility/token_decoded';
import { ProjectForm } from '../../components/Form.project';

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
  const [apiResponse, setApiResponse] = useState({});

  const handleChange = (event) => {}
  const handleSubmit = (event) => {}

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
              apiResponse={apiResponse} 
              handleChange={handleChange} 
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}