import React from "react";

export function QueryInputBox(props) {
  return(
    <form onSubmit={props.submitHandler}>
      <div className="input-group mt-md-3">
        <span className="input-group-text query-input-text">From and To date</span>
        <input 
          type="date" 
          aria-label="From date" 
          className="form-control"
          name="from"
          value={props.queryParams.from}
          onChange={props.changeHandler}
        />
        {props.queryFailResponse?.statusCode === 400 && (
          <div className="invalid-feedback d-block">
            {props.queryFailResponse.error.message?.from}
          </div>
        )}

        <input 
          type="date" 
          aria-label="To date" 
          className="form-control"
          name="to"
          value={props.queryParams.to}
          onChange={props.changeHandler}
        />
        {props.queryFailResponse?.statusCode === 400 && (
          <div className="invalid-feedback d-block">
            {props.queryFailResponse.error.message?.to}
          </div>
        )}

        <button className="btn text-dark query-input-button" type="submit">View</button>
      </div>
    </form>
  )
}