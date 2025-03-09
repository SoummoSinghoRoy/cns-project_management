import React, {useMemo, useState} from 'react';
import '../asset/styles/main.css';
import { textCapitalize } from '../utility/custom_fn';
import { EditModal } from './Modal';

export const Table = React.memo((props) => {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const employeeData = useMemo(() => Array.isArray(props.employees) ? props.employees : [], [props.employees]);

  const handleMouseEnter = (id) => {
    setHoveredItemId(id);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  const handleSvgClick = (id) => {
    if(hoveredItemId === id) {
      setEditEmployeeId(id);
    }
  };


  if(props.isEmployeeTable) {
    return(
      <div className="table-responsive-sm">
        <table className="table">
          <thead className="table-light">
            <tr className="text-center">
              <th>S/l No.</th>
              <th>Username</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Role</th>
              <th>Employee_Type</th>
              <th>Work_Status</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {
              employeeData.length > 0 ?
              employeeData.map((employee, id) => (
                <tr key={employee.id} className="text-center">
                  <td>{id+1}</td>
                  <td>{textCapitalize(employee.username)}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.department}</td>
                  <td>{textCapitalize(employee.role)}</td>
                  <td
                    className="employee_type_col" 
                    onMouseEnter={() => handleMouseEnter(employee.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span>
                      {textCapitalize(employee.employee_type)}
                    </span>
                    {
                      hoveredItemId === employee.id && 
                      <button
                        type="button" 
                        className="btn btn-light"
                        onClick={() => handleSvgClick(employee.id)}
                        style={{ cursor: 'pointer'}}
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                      </button>
                    }
                  </td>
                  {/* here also will be applied update employee type tooltips with modal */}
                  <td>{textCapitalize(employee.work_status)}</td>
                </tr>
              )) :
              <tr>
                <td colSpan="7"><h5 className='text-center py-3'>Employees not found</h5></td>    
              </tr>
            }
          </tbody>
        </table>
        <EditModal 
          modalInputFor= 'employee' 
          title='Update employee type' 
          employeeId={editEmployeeId}
          modalOpen={props.modalOpen}
          modalCloseHanlder={props.modalCloseHanlder}
        />
      </div>
    )
  } else {
    // here apply table for projects
  }
})