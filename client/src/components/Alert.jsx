import React, {useState, useEffect} from 'react';

export function Alert(props) {
  const [alertStatus, setAlertStatus] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    setAlertStatus(props.alertStatus);
    setAlertMessage(props.alertMessage);
  }, [props.alertStatus, props.alertMessage])

  const clickHandler = (event) => {
    setAlertStatus(0);
    setAlertStatus('');
    
    if(alertStatus === 400) {
      props.updateValidationResult({})
    }
  }

  if(alertStatus >= 200 && alertStatus < 300) {
    return(
      <>
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>{alertMessage}!</strong>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={clickHandler}></button>
        </div>
      </>
    )
  } else if (alertStatus >= 400 && alertStatus < 500) {
    return(
      <>
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>{alertMessage}!</strong>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={clickHandler}></button>
        </div>
      </>
    )
  } else if(alertStatus >= 500) {
    return(
      <>
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>{alertMessage}!</strong>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={clickHandler}></button>
        </div>
      </>
    )
  }
}