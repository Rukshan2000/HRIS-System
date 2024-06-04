import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PayrollTemplate from './PayrollTemplate';

const UserPayroll = () => {
    const [employeePayroll, setEmployeePayroll] = useState([]);
    const [uniqueDates, setUniqueDates] = useState([]);
    const [employeeDetails, setEmployeeDetails] = useState({});
    const [departmentDetails, setDepartmentDetails] = useState({});
    const [designationDetails, setDesignationDetails] = useState({});
    const [selectedDate, setSelectedDate] = useState('');
    const [empId, setempId] = useState('');
    const [dates, setdates] = useState('');

    const eid = 5; // Define eid as a constant variable

    const fetchData =  () => {
        try {
            axios.get('http://localhost:8081/api/payroll')
            .then(res =>{
                console.log('paydata',res.data);
                setEmployeePayroll(res.data.data);
                setdates(res.data.data.map(pay => pay.Date));
            });

            axios.get('http://localhost:8081/api/employee')
            .then(res=>{
                setEmployeeDetails(res.data.data.reduce((acc, emp) => {
                    acc[emp.Emp_ID] = emp;
                    return acc;
                }, {}));

            });
            

            axios.get('http://localhost:8081/api/department')
            .then(res=>{
                setDepartmentDetails(res.data.data.reduce((acc, dept) => {
                    acc[dept.Dept_ID] = dept;
                    return acc;
                }, {}));

            });
          
            
            axios.get('http://localhost:8081/api/designation')
            .then(res=>{
                setDesignationDetails(res.data.data.reduce((acc, desig) => {
                    acc[desig.Desig_ID] = desig;
                    return acc;
                }, {}));

            });
    

            
            const uniqueDates = [...new Set(dates)];
            setUniqueDates(uniqueDates);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get('http://localhost:8081/getuser', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    // console.log('data', res.data.empId);
                    setempId(res.data.empId)
                    fetchData();
                })
                .catch(err => console.log(err));
        };

    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const getEmployeeName = (empId) => {
        return employeeDetails[empId]?.Name || 'Unknown';
    };

    const getDepartmentName = (deptId) => {
        return departmentDetails[deptId]?.Name || 'Unknown';
    };

    const getDesignationName = (desigId) => {
        return designationDetails[desigId]?.Name || 'Unknown';
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    const filteredPayroll = selectedDate ?
    employeePayroll.filter(pay => pay.Date === selectedDate && pay.Emp_ID === empId) :
    employeePayroll.filter(pay => pay.Emp_ID === empId);


    return (
        <div className="container px-4 py-8 mx-auto sm:px-8 md:px-16 md:py-12 lg:py-16">
            <h1 className="mb-8 text-3xl font-bold text-center md:text-4xl">Employee Payroll</h1>
            <div className="mb-4 text-center">
                <select
                    className="px-4 py-2 border rounded-md"
                    onChange={handleDateChange}
                    value={selectedDate}
                >
                    <option value="">All Dates</option>
                    {uniqueDates.map(date => (
                        <option key={date} value={date}>{formatDate(date)}</option>
                    ))}
                </select>
            </div>
            {filteredPayroll.map((pay) => (
                <PayrollTemplate
                    key={pay.Payroll_ID}
                    payrollData={pay}
                    getEmployeeName={getEmployeeName}
                    getDepartmentName={getDepartmentName}
                    getDesignationName={getDesignationName}
                    formatDate={formatDate}
                />
            ))}
        </div>
    );
};

export default UserPayroll;
