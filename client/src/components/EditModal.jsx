import React from 'react';
import { EditInputBox } from './InputBox';

export function EditModal(props) {

  return(
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{props.title}</h1>
            <button type="button" className="btn-close" onClick={props.modalCloseHanlder} data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {props.modalInputFor === 'employee' && <EditInputBox inputFor={props.modalInputFor} modalOpen={props.modalOpen} employeeId={props.employeeId}/>}
            {props.modalInputFor === 'project' && <EditInputBox inputFor={props.modalInputFor} modalOpen={props.modalOpen} projectId={props.projectId}/>}
          </div>
        </div>
      </div>
    </div>
  )
}