import React from "react";

export function QueryInputBox(props) {
  return(
    <form onSubmit={props.submitHandler}>
      <div className="row px-2 px-lg-0 px-md-0">
        <div className="col-4 col-lg-5 col-md-4">
          <label htmlFor="from" className="mb-1 fw-semibold">From</label>
          <input 
            type="date"
            className="form-control"
            id="from"
            name="from"
            value={props.queryParams.from}
            onChange={props.changeHandler}
          />
          {props.queryFailResponse?.statusCode === 400 && (
            <div className="invalid-feedback d-block">
              {props.queryFailResponse.error.message?.from}
            </div>
          )}
        </div>
        <div className="col-4 col-lg-5 col-md-4">
          <label htmlFor="to" className="mb-1 fw-semibold">To</label>
          <input 
            type="date"
            className="form-control"
            id="to"
            name="to"
            value={props.queryParams.to}
            onChange={props.changeHandler}
          />
          {props.queryFailResponse?.statusCode === 400 && (
            <div className="invalid-feedback d-block">
              {props.queryFailResponse.error.message?.to}
            </div>
          )}
        </div>
        <div className="col-4 col-lg-2 col-md-4 mt-1">
          <button className="btn btn-outline-secondary mx-auto d-block mt-4" type="submit">Generate</button>
        </div>
      </div>
    </form>
  )
}