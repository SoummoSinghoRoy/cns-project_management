import React from "react";

export function QueryInputBox(props) {
  return(
    <form onSubmit={props.submitHandler}>
      <div className="row">
        <div className="col-5">
          <label htmlFor="from" className="mb-1 fw-semibold">From</label>
          <input 
            type="date"
            className="form-control"
            id="from"
            name="from"
            value={props.queryParams.from}
            onChange={props.changeHandler}
          />
        </div>
        <div className="col-5">
          <label htmlFor="to" className="mb-1 fw-semibold">To</label>
          <input 
            type="date"
            className="form-control"
            id="to"
            name="to"
            value={props.queryParams.to}
            onChange={props.changeHandler}
          />
        </div>
        <div className="col-2">
          <button className="btn btn-outline-secondary mt-4" type="submit">Submit</button>
        </div>
      </div>
    </form>
  )
}