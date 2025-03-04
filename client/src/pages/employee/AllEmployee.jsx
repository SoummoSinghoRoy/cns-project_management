import React, {useState, useEffect} from 'react';
import { Table } from '../../components/DataTable';
import {useAuth} from '../../context/AuthContext';
import { allEmployeeGetFetcher } from '../../fetcher/employee.fetcher';

export function AllEmployee() {
  const {authToken} = useAuth();
  const [allEmployee, setAllEmployee] = useState([]);
  useEffect(() => {
    (async () => {
      const allEmployeeresponse = await allEmployeeGetFetcher(authToken);
      setAllEmployee(allEmployeeresponse.data.data)
    })()
  }, [authToken])

  return(
    <div className="row px-lg-3 px-md-3">
      <div className="col-12">
        <div className="card my-3">
          <h4 className="py-3 text-center">All employee list</h4>
          <Table isEmployeeTable={true} employees={allEmployee}/>
        </div>
      </div>
    </div>
  )
}