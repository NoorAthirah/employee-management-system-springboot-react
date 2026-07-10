import React, { useState } from "react";
import { createEmployee } from "../services/EmployeeService";
import { useNavigate,useParams } from "react-router-dom";
import { useEffect } from "react";
import { getEmployee } from "../services/EmployeeService";
import { updateEmployee } from "../services/EmployeeService";


const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');



    const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
    });

    const {id} = useParams();
    const navigator = useNavigate();

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }
    const handleLastName = (e) => {
        setLastName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    useEffect(() => {
    if (id) {
        getEmployee(id).then((response) => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
        });
    }
    }, [id]);
  

      function saveEmployee(e) {
    e.preventDefault();

    if (validateForm()) {

        const employee = { firstName, lastName, email };

        if (id) {
            updateEmployee(id, employee)
                .then((response) => {
                    console.log(response.data);
                    navigator("/employees");
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            createEmployee(employee)
                .then((response) => {
                    console.log(response.data);
                    navigator("/employees");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}

      function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>    
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = {
            firstName: '',
            lastName: '',
            email: ''
        }; 

        if (firstName.trim() === '') {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }
        if (lastName.trim() === '') {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }
        if (email.trim() === '') {
            errorsCopy.email = 'Email is required';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    }
  return (
    <div className='container'>
       
            
    <div className="col-md-6 offset-md-3">
        
            <div className='card'>
                {/* <h2 className='text-center'>Add Employee</h2> */}
                {pageTitle()}
                <div className='card-body'>
                    <form onSubmit={saveEmployee}>

                        <div className='form-group mb-2'>
                            <label className='form-label'>
                                First Name:
                            </label>

                            <input
                                type='text'
                                placeholder='Enter Employee First Name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                onChange={handleFirstName}
                            >
                            </input>
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                     
                            </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>
                                Last Name:
                            </label>

                            <input
                             type='text'
                                placeholder='Enter Employee Last Name'
                                name='lastName'
                                value={lastName}
                                 className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                onChange={handleLastName}>
                            
                            </input>
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>
                                Email:
                            </label>

                            <input
                             type='text'
                                placeholder='Enter Employee Email'
                                name='email'
                                value={email}
                                 className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                onChange={handleEmail}>
                            
                            </input>
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <button type="submit" className='btn btn-success'  >Submit</button>
                    </form>
                    
                </div>

            </div>
        </div>
    </div>
)
}
export default EmployeeComponent
