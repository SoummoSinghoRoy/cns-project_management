import React from 'react';

export function Alert(props) {
  if(props.alertStatus >= 200 && props.alertStatus < 300) {
    return(
      <>
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>{props.alertMessage}!</strong>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </>
    )
  } else if (props.alertStatus >= 400 && props.alertStatus < 500) {
    return(
      <>
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>{props.alertMessage}!</strong>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </>
    )
  } else if(props.alertStatus >= 500) {
    return(
      <>
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>{props.alertMessage}!</strong>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </>
    )
  }
  
}