import React, {useMemo} from 'react';

export const Table = React.memo((props) => {
  const employeeData = useMemo(() => Array.isArray(props.employees) ? props.employees : [], [props.employees]);

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
                  <td>{employee.username}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.department}</td>
                  <td>{employee.role}</td>
                  <td>{employee.employee_type}</td>
                  {/* here also will be applied update employee type tooltips with modal */}
                  <td>{employee.work_status}</td>
                </tr>
              )) :
              <tr>
                <td colSpan="7"><h5 className='text-center py-3'>Employees not found</h5></td>    
              </tr>
            }
          </tbody>
        </table>
      </div>
    )
  } else {
    // here apply table for projects
  }
})