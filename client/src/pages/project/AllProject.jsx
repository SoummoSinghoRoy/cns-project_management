import React, {useState, useEffect} from "react";
import { useAuth } from "../../context/AuthContext";
import { tokenDecoder } from "../../utility/token_decoded";
import { retrieveAllProjectFetcher } from "../../fetcher/project.fetcher";
import { Table } from "../../components/DataTable";
import { QueryInputBox } from "../../components/QueryinputBox";

export function AllProject() {
  const {authToken} = useAuth();
  const decodeResult = tokenDecoder(authToken);
  const [allProject, setAllProject] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [queryParams, setQueryParams] = useState({
    from: "",
    to: ""
  });

  const closeModalClickhanlder = (event) => {
    setIsOpen(false);
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
      }
      // here also handle project api request for coordinator & assistant
    })()
  }, [queryParams])

  if(decodeResult && decodeResult.employeeType === 'admin') {
    return(
      <div className="row px-lg-3 px-md-3">
        <div className="col-12">
          <div className="card my-3"> 
            <div className="row py-3">
              <div className="col-12 col-lg-3 col-md-3">
                <h4 className="ps-2 py-3">All project list</h4>
              </div>
              <div className="col-12 col-lg-6 col-md-6">
                <QueryInputBox queryParams={queryParams} changeHandler={changeHandler} submitHandler={submitHandler}/>
              </div>
              <div className="col-12 col-lg-3 col-md-3"></div>
            </div>
            <Table isProjectTable={true} projects={allProject} modalOpen={isOpen} modalCloseHanlder={closeModalClickhanlder}/>
          </div>
        </div>
      </div>
    )
  }
}