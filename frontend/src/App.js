import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/users')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div>
            <h1>Employees</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birth Day</th>
                        <th>Sex</th>
                        <th>Salary</th>
                        <th>Supervisor ID</th>
                        <th>Branch ID</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.emp_id}>
                            <td>{employee.emp_id}</td>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.birth_day}</td>
                            <td>{employee.sex}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.super_id}</td>
                            <td>{employee.branch_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
