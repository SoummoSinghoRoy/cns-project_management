import React, {useState, useEffect} from 'react';
import { Table } from '../../components/DataTable';
import {useAuth} from '../../context/AuthContext';
import { allEmployeeGetFetcher } from '../../fetcher/employee.fetcher';

export function AllEmployee() {
  const {authToken} = useAuth();
  const [allEmployee, setAllEmployee] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  const closeModalClickhanlder = (event) => {
    setIsOpen(false);
    setEditEmployeeId(null);
  }

  useEffect(() => {
    (async () => {
      const allEmployeeresponse = await allEmployeeGetFetcher(authToken);
      setAllEmployee(allEmployeeresponse.data.data)
    })()
  }, [authToken, editEmployeeId])

  return(
    <div className="row px-lg-3 px-md-3">
      <div className="col-12">
        <div className="card my-3">
          <h4 className="py-3 text-center">All employee list</h4>
          <Table isEmployeeTable={true} employees={allEmployee} updateEmployeeId={setEditEmployeeId} employeeId={editEmployeeId} modalOpen={isOpen} modalCloseHanlder={closeModalClickhanlder}/>
        </div>
      </div>
    </div>
  )
}