import React, {useState} from 'react';
import { QueryInputBox } from './QueryinputBox';
import { generateReportFetcher } from '../fetcher/project.fetcher';
import { useAuth } from '../context/AuthContext';

export function ReportQueryModal() {
  const {authToken} = useAuth();
  const [queryParams, setQueryParams] = useState({
    from: "",
    to: ""
  });

  const changeHandler = (event) => {
    setQueryParams({
      ...queryParams,
      [event.target.name]: event.target.value
    })
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    const response = await generateReportFetcher(authToken, queryParams);
    console.log(response.data);
  }

  return(
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Project report</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <QueryInputBox queryParams={queryParams} changeHandler={changeHandler} submitHandler={submitHandler} />
          </div>
        </div>
      </div>
    </div> 
  )
}