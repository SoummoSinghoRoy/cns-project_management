import React, {useState, useEffect} from "react";
import { useParams } from "react-router";
import { ProjectForm } from "../../components/Form.project";
import { Alert } from "../../components/Alert";
import { singleProjectretrieveFetcher } from "../../fetcher/project.fetcher";
import { useAuth } from "../../context/AuthContext";

export function EditProject() {
  const {projectId} = useParams();
  const {authToken} = useAuth();
  const [currentProjectData, setCurrentProjectData] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    intro: '',
    startDateTime: '',
    endDateTime: ''
  });
  const [apiResponse, setApiResponse] = useState({});

  useEffect(() => {
    (async () => {
      const response = await singleProjectretrieveFetcher(authToken, projectId);
      setCurrentProjectData(response.data.data)
    })()
  })

  const changeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const submitHanlder = (event) => {}

  // first I will fetch specifc project by projectId
  // then share recent data to the form at edit time
  
  return(
    <div className="row">
      <div className="col-4"></div>
      <div className="col-12 col-lg-4 col-md-4">
        {Object.keys(apiResponse).length !== 0 && (
          <Alert
            alertStatus={apiResponse.statusCode}
            alertMessage={apiResponse.message}
            updateApiResponse={setApiResponse}
          />
        )}
        <div className="card px-2 py-3 py-lg-4 py-md-4 mt-5 justify-content-center form-card">
          <h4 className="text-center">Edit project</h4>
          <div className="card-body">
            <ProjectForm 
              currentProjectData={currentProjectData}
              formData= {formData} 
              handleChange={changeHandler} 
              handleSubmit={submitHanlder}
            />
          </div>
        </div>
      </div>
    </div>
  )
}