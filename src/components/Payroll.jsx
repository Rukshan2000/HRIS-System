import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payroll = () => {
    const [employees, setEmployees] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeeResponse = await axios.get('http://localhost:8081/api/employee');
                const designationResponse = await axios.get('http://localhost:8081/api/designation');
                const attendanceResponse = await axios.get('http://localhost:8081/api/attendance');

                setEmployees(employeeResponse.data.data);
                setDesignations(designationResponse.data.data);
                setAttendance(attendanceResponse.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const calculateOTHours = (attendanceRecords) => {
        let totalOTHours = 0;
        // Create a map to store OT hours for each employee ID
        const otHoursMap = {};

        attendanceRecords.forEach(record => {
            const inTime = new Date(`1970-01-01T${record.In_Time}Z`);
            const outTime = new Date(`1970-01-01T${record.Out_Time}Z`);
            const hoursWorked = (outTime - inTime) / (1000 * 60 * 60);
            const otHours = hoursWorked > 8 ? hoursWorked - 8 : 0;

            // Aggregate OT hours for each employee ID
            if (otHoursMap[record.Emp_ID]) {
                otHoursMap[record.Emp_ID] += otHours;
            } else {
                otHoursMap[record.Emp_ID] = otHours;
            }
        });

        // Sum up OT hours for all employee IDs
        Object.values(otHoursMap).forEach(otHours => {
            totalOTHours += otHours;
        });

        return totalOTHours;
    };

    const savePayroll = async (generatedData) => {
        const payrollArray = generatedData.map(emp => ({
            employeeId: emp.Emp_ID,
            baseSalary: emp.baseSalary,
            otHours: emp.totalOTHours,
            allowance: emp.Allowance,
            otPayment: emp.totalOT,
            etf: emp.totalETF,
            epf: emp.totalEPF,
            tax: emp.totalTax,
            income: emp.totalIncome,
            date: emp.date
        }));
        console.log('Payroll Array:', payrollArray);
        try {
            const response = await axios.post('http://localhost:8081/api/payroll', payrollArray);
            console.log('Payroll data saved:', response.data);
        } catch (error) {
            console.error('Error saving payroll data:', error);
        }
    };

    const handleGenerateAll = () => {
        setShowConfirmModal(true);
    };

    const handleGeneratePayrollConfirmed = () => {
        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        setCurrentDate(formattedDate);

        const updatedEmployees = employees.map((emp) => {
            const empDesignation = designations.find(d => d.Desig_ID === emp.Designation_ID);
            const empAttendance = attendance.filter(a => a.Emp_ID === emp.Emp_ID);
            const totalOTHours = calculateOTHours(empAttendance);

            const otHourlyRate = empDesignation ? parseFloat(empDesignation.Base_Salary) / 176 : 0;
            const totalOT = totalOTHours * otHourlyRate;
            const totalSalary = empDesignation ? parseFloat(empDesignation.Base_Salary) + totalOT : 0;
            const totalAllowance = parseFloat(emp.Allowance);

            // Tax calculation
            const annualSalary = (totalSalary + totalAllowance) * 12;
            let tax = 0;

            if (annualSalary <= 1200000) {
                tax = 0;
            } else if (annualSalary <= 2000000) {
                tax = 2500;
            } else if (annualSalary <= 2500000) {
                tax = 5000;
            } else if (annualSalary <= 3000000) {
                tax = 7500;
            } else if (annualSalary <= 3500000) {
                tax = 10000;
            } else if (annualSalary <= 4000000) {
                tax = 12500;
            } else {
                tax = 69000 + (annualSalary - 4200000) * 0.36;
            }

            // Convert annual tax to monthly tax
            const monthlyTax = tax / 12;

            // EPF and ETF calculation
            const employeeEPFContribution = totalSalary * 0.08;
            const employerEPFContribution = totalSalary * 0.12;
            const employerETFContribution = totalSalary * 0.03;
            const totalEmployerContribution = employerEPFContribution + employerETFContribution;
            const totalEPFs = employeeEPFContribution + employerEPFContribution;
            const totalETF = employerETFContribution;

            // Deduct EPF, ETF, tax, and allowance contributions from total income
            const totalIncome = (totalSalary + totalAllowance - monthlyTax - totalEPFs - totalETF).toFixed(2);

            return {
                ...emp,
                baseSalary: empDesignation ? empDesignation.Base_Salary : 0,
                totalIncome: totalIncome,
                totalETF: totalETF.toFixed(2),
                totalEPF: totalEPFs.toFixed(2),
                totalTax: monthlyTax.toFixed(2),
                totalOT: totalOT.toFixed(2),
                totalOTHours: totalOTHours.toFixed(2),
                date: formattedDate // Set the date attribute to the formatted date
            };
        });
        setEmployees(updatedEmployees);
        savePayroll(updatedEmployees);
        setShowConfirmModal(false);
    };

    const handleCancelGeneratePayroll = () => {
        setShowConfirmModal(false);
    };

    const handleClearTable = () => {
        window.location.reload();
    };
    
    const handleNavigateToManagePayroll = () => {
        navigate('/managepayroll');
    };
    
    return (
        <div className="container flex flex-col mx-auto">
            <div className="flex justify-center mb-4">
            <button
                    onClick={handleNavigateToManagePayroll}
                    className="px-4 py-2 ml-4 text-white bg-blue-500 rounded-md "
                >
                    Manage Payroll
                </button>

                <button
                    onClick={handleGenerateAll}
                    className="px-4 py-2 ml-10 text-white bg-green-500 rounded-md"
                >
                    Generate All
                </button>

                <button
                    onClick={handleClearTable}
                    className="px-4 py-2 ml-10 mr-4 text-white bg-red-500 rounded-md"
                >
                    Clear Table
                </button>
            </div>
            <div className="overflow-auto">
                <table className="w-full border border-collapse border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-gray-300">Emp ID</th>
                            <th className="px-4 py-2 border border-gray-300">Base Salary</th>
                            <th className="px-4 py-2 border border-gray-300">Total OT Hours</th>
                            <th className="px-4 py-2 border border-gray-300">Allowance</th>
                            <th className="px-4 py-2 border border-gray-300">OT Payment</th>
                            <th className="px-4 py-2 border border-gray-300">Total ETF</th>
                            <th className="px-4 py-2 border border-gray-300">Total EPF</th>
                            <th className="px-4 py-2 border border-gray-300">Total Tax</th>
                            <th className="px-4 py-2 border border-gray-300">Total Income</th>
                            <th className="px-4 py-2 border border-gray-300">Date</th> {/* New column for Date */}
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => {
                            const empDesignation = designations.find(d => d.Desig_ID === emp.Designation_ID);
                            const empAttendance = attendance.filter(a => a.Emp_ID === emp.Emp_ID);
                            const totalOTHours = calculateOTHours(empAttendance);
    
                            return (
                                <React.Fragment key={emp.Emp_ID}>
                                    {empAttendance.map((record, index) => (
                                        <tr key={index}>
                                            {index === 0 && (
                                                <>
                                                    <td className="px-4 py-2 border border-gray-300" rowSpan={empAttendance.length}>{emp.Emp_ID}</td>
                                                    <td className="px-4 py-2 border border-gray-300" rowSpan={empAttendance.length}>{empDesignation ? empDesignation.Base_Salary : ''}</td>
                                                    <td className="px-4 py-2 border border-gray-300" rowSpan={empAttendance.length}>{totalOTHours.toFixed(2)}</td>
                                                    <td className="px-4 py-2 border border-gray-300" rowSpan={empAttendance.length}>{emp.Allowance}</td>
                                                    <td className="px-4 py-2 border border-gray-300" rowSpan={empAttendance.length}>{emp.totalOT}</td>
                                                    <td className="px-4 py-2 border border-gray-300" rowSpan={empAttendance.length}>{emp.totalETF}</td>
                                                    <td className="px-4 py-2 border border-gray-300" rowSpan={empAttendance.length}>{emp.totalEPF}</td>
                                                    <td className="px-4 py-2 border border-gray-300" rowSpan={empAttendance.length}>{emp.totalTax}</td>
                                                    <td className="px-4 py-2 border border-gray-300" rowSpan={empAttendance.length}>{emp.totalIncome}</td>
                                                    <td className="px-4 py-2 border border-gray-300" rowSpan={empAttendance.length}>{emp.date}</td> {/* Display Date */}
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {showConfirmModal && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-75">
                    <div className="p-8 bg-white rounded-lg">
                        <p>Are you sure you want to generate payroll data for this month?</p>
                        <div className="flex justify-center mt-4">
                            <button onClick={handleGeneratePayrollConfirmed} className="px-4 py-2 mr-2 text-white bg-green-500 rounded-md">Yes</button>
                            <button onClick={() => setShowConfirmModal(false)} className="px-4 py-2 text-white bg-red-500 rounded-md">No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payroll;
