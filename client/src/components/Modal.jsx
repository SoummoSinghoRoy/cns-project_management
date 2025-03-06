// modal title comes from props.
// modal will contain input box for update employee_type & project status.
// input box name & value will comes from props.
import React from 'react';
import { EditInputBox } from './InputBox';

export function EditModal(props) {
  return(
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{props.title}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {props.modalInputFor === 'employee' && <EditInputBox inputFor={props.modalInputFor} propertyName="employee_type" propertyValue="manager"/>}
            {props.modalInputFor === 'project' && <EditInputBox inputFor={props.modalInputFor} propertyName="status" propertyValue="3"/>}
          </div>
        </div>
      </div>
    </div>
  )
}