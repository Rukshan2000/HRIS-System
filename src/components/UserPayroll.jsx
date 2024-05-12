import React, { useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const UserPayroll = () => {
    // Dummy data for employee's paysheet
    const [employeePayroll, setEmployeePayroll] = useState([
        {
            id: 1,
            employeeName: "John Doe",
            employeeID: "EMP001",
            month: "May",
            year: "2024",
            basicSalary: 5000,
            bonus: 1000,
            deductions: 500,
            overtime: 200,
            welfareAllowance: 300,
            netSalary: 5500
        },
        {
            id: 2,
            employeeName: "Jane Smith",
            employeeID: "EMP002",
            month: "June",
            year: "2024",
            basicSalary: 5000,
            bonus: 1200,
            deductions: 600,
            overtime: 250,
            welfareAllowance: 350,
            netSalary: 5600
        },
        // Add more employee's paysheet here
    ]);

    // Default values for month and year
    const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('en-US', { month: 'long' }));
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

    // Function to filter employee payroll based on selected month and year
    const filteredPayroll = employeePayroll.filter(pay => pay.month === selectedMonth && pay.year === selectedYear);

    // Ref for printing
    const componentRef = React.useRef();

    // Function to trigger print
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="container px-4 py-8 mx-auto sm:px-8 md:px-16 md:py-12 lg:py-16">
            <h1 className="mb-8 text-3xl font-bold text-center md:text-4xl">Employee Payroll</h1>
            <div className="flex flex-col items-center justify-center mb-8 md:flex-row">
                <select
                    className="px-6 py-3 mb-4 mr-0 text-sm text-gray-700 border border-gray-300 rounded-md md:mb-0 md:mr-6"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>
                <input
                    type="text"
                    placeholder="Year"
                    className="w-full px-6 py-3 text-sm text-gray-700 border border-gray-300 rounded-md md:w-auto"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                />
            </div>
            <div className="mb-4 text-center">
                <button onClick={handlePrint} className="px-6 py-3 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600">
                    Download PDF
                </button>
            </div>
            {filteredPayroll.map((pay) => (
                <div key={pay.id} className="p-4 mb-8 bg-white rounded-lg shadow-md md:p-8 md:mb-12" ref={componentRef}>
                    <div className="flex flex-col justify-between mb-4 md:flex-row md:mb-8">
                        <div>
                            <h2 className="text-lg font-bold md:text-xl">{pay.employeeName}</h2>
                            <p className="text-sm">Employee ID: {pay.employeeID}</p>
                        </div>
                        <div>
                            <p className="text-sm">{pay.month} {pay.year}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
                        <div>
                            <p><strong>Basic Salary:</strong> ${pay.basicSalary}</p>
                            <p><strong>Bonus:</strong> ${pay.bonus}</p>
                            <p><strong>Deductions:</strong> ${pay.deductions}</p>
                        </div>
                        <div>
                            <p><strong>Overtime:</strong> ${pay.overtime}</p>
                            <p><strong>Welfare Allowance:</strong> ${pay.welfareAllowance}</p>
                            <p><strong>Net Salary:</strong> ${pay.netSalary}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserPayroll;
