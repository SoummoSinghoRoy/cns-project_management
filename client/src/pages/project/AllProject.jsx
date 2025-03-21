import React, {useState, useEffect} from "react";
import { useAuth } from "../../context/AuthContext";
import { tokenDecoder } from "../../utility/token_decoded";
import { retrieveAllProjectFetcher, retrieveAssistantProjectFetcher, retrieveCoordinatorProjectFetcher } from "../../fetcher/project.fetcher";
import { Table } from "../../components/DataTable";
import { QueryInputBox } from "../../components/QueryinputBox";
import { ReportQueryModal } from "../../components/ReportQueryModal";

export function AllProject() {
  const {authToken} = useAuth();
  const decodeResult = tokenDecoder(authToken);
  const [allProject, setAllProject] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [projectId, setProjectId] = useState(null);
  const [queryParams, setQueryParams] = useState({
    from: "",
    to: ""
  });

  const closeModalClickhanlder = (event) => {
    setIsOpen(false);
    setProjectId(null)

  }

  const changeHandler = (event) => {
    setQueryParams({
      ...queryParams,
      [event.target.name]: event.target.value
    })
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await retrieveAllProjectFetcher(authToken, queryParams);
    setAllProject(response.data.data);
  }

  useEffect(() => {
    (async () => {
      if(decodeResult && decodeResult.employeeType === 'admin') {
        const response = await retrieveAllProjectFetcher(authToken);
        setAllProject(response.data.data);        
      } else if(decodeResult && decodeResult.employeeType === 'coordinator') {
        const response = await retrieveCoordinatorProjectFetcher(authToken, decodeResult.id);        
        setAllProject(response.data.data);
      } else if(decodeResult && decodeResult.employeeType === 'assistant') {
        const response = await retrieveAssistantProjectFetcher(authToken, decodeResult.id);        
        setAllProject(response.data.data);
      }
    })()
  }, [queryParams, projectId])

  return(
    <div className="row px-lg-3 px-md-3">
      <div className="col-12">
        <div className="card my-3"> 
          {
            decodeResult.employeeType === 'admin' ?
            <div className="row py-3">
              <div className="col-6 col-lg-2 col-md-3 order-0 order-lg-1 order-md-0">
                <h4 className="ps-2 py-3 py-lg-3 py-md-3">All project list</h4>
              </div>
              <div className="col-12 col-lg-8 col-md-6 order-2 order-lg-2 order-md-0 py-3 py-lg-0 py-md-0">
                {decodeResult.employeeType === 'admin' && <QueryInputBox queryParams={queryParams} changeHandler={changeHandler} submitHandler={submitHandler}/>}
              </div>
              <div className="col-6 col-lg-2 col-md-3 order-1 order-lg-3 order-md-0">
                <button type="button" className="btn btn-warning mt-2 mt-lg-3 mt-md-3 float-end me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Genrate report
                </button>
              </div>
            </div> :
            <h4 className="text-center py-3 py-lg-3 py-md-3">All project list</h4>
          }
          <Table isProjectTable={true} projects={allProject} updateProjectId={setProjectId} projectId={projectId} modalOpen={isOpen} modalCloseHanlder={closeModalClickhanlder}/>
        </div>
      </div>
      <ReportQueryModal />
    </div>
  )
}