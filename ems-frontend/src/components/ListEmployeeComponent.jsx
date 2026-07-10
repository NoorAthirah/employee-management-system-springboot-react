import React from 'react'
import { useState, useEffect } from 'react'
import { listEmployees, deleteEmployee} from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()

    // useEffect(() => {
    //    listEmployees().then((response) => {
    //         setEmployees(response.data);
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    //     }, []);
    useEffect(() => {
    getAllEmployees();
    }, []);

    function addNewEmployee() {
        // window.location.href = "/add-employee";
        navigate("/add-employee");
    }
    function getEmployeeById(employeeId) {
        navigate(`/update-employee/${employeeId}`);
    }

    function updateEmployee(employeeId) {
        navigate(`/update-employee/${employeeId}`);
    }
    
    function getAllEmployees() {
    listEmployees()
        .then((response) => {
            setEmployees(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function removeEmployee(employeeId) {

    if (window.confirm("Are you sure you want to delete this employee?")) {

        deleteEmployee(employeeId)
            .then(() => {
                getAllEmployees();
            })
            .catch(error => {
                console.log(error);
            });

    }

}


  return (
    <div className="container">
      <h2 className="text-center">List Employee Component</h2>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={addNewEmployee} style={{marginBottom: "10px"}} >Add Employee</button>
      </div>
      
      <table className="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                employees.map(
                    employee => (
                        <tr key={employee.id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className="btn btn-danger" onClick={() => removeEmployee(employee.id)} style={{marginLeft: "10px"}}>Delete</button>
                            </td>
                        </tr>
                    )
                )
            }
        </tbody>
      </table>
    </div>
  )
}

export default ListEmployeeComponent
