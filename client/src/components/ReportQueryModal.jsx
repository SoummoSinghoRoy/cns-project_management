import React, {useState} from 'react';
import { QueryInputBox } from './QueryinputBox';
import { generateReportFetcher } from '../fetcher/project.fetcher';
import { useAuth } from '../context/AuthContext';
import { Alert } from './Alert';

export function ReportQueryModal() {
  const {authToken} = useAuth();
  const [queryParams, setQueryParams] = useState({
    from: "",
    to: ""
  });
  const [queryFailResponse, setQueryFailResponse] = useState({});

  const changeHandler = (event) => {
    setQueryParams({
      ...queryParams,
      [event.target.name]: event.target.value
    })
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    setQueryParams({
      from: "",
      to: ""
    })
    const response = await generateReportFetcher(authToken, queryParams);
    if(response.report.success) {
      const pdfBlob = new Blob([response.report.result], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 60000);
    } else {
      setQueryFailResponse(response.report);
    }
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
            <Alert alertStatus={queryFailResponse.statusCode} alertMessage={queryFailResponse.message} updateApiResponse={setQueryFailResponse} />
            <QueryInputBox queryParams={queryParams} changeHandler={changeHandler} submitHandler={submitHandler} queryFailResponse={queryFailResponse} />
          </div>
          <div className='modal-footer'></div>
        </div>
      </div>
    </div> 
  )
}