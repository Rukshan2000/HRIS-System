import React from 'react';
import { useReactToPrint } from 'react-to-print';

const PayrollTemplate = ({ payrollData, getEmployeeName, getDepartmentName, getDesignationName, formatDate }) => {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Calculate totals
  const totalBasicSalary = payrollData.Basic_Salary || 0;
  const totalEPF = payrollData.EPF || 0;
  const totalETF = payrollData.ETF || 0;
  const totalOTHours = payrollData.OT_Hours || 0;
  const totalOTPayment = payrollData.OT_Payment || 0;
  const totalAllowance = payrollData.Allowance || 0;
  const totalTax = payrollData.Tax || 0;
  const totalNetIncome = payrollData.Income || 0;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md" ref={componentRef}>
      {/* Company letterhead */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Flexy Code (PVT) Ltd</h1>
          <p className="text-sm">16/D,</p>
          <p className="text-sm">Kappatipola Road, </p>
          <p className="text-sm">Colombo 05, </p>
          <p className="text-sm">Sri Lanka.</p>
        </div>
        <div>
          <img src="company-logo.png" alt="Company Logo" className="w-24 h-24" />
        </div>
      </div>

      {/* Employee details and payroll information */}

      <div>
        <h2 className="mb-4 text-lg font-bold">Payroll Slip</h2>
        <div className="flex justify-between mb-2">
          <div>
            <p><strong>Employee ID:</strong> {payrollData.Emp_ID}</p>
            <p><strong>Employee Name:</strong> {getEmployeeName(payrollData.Emp_ID)}</p>
            <p><strong>Department:</strong> {getDepartmentName(payrollData.Department_ID)}</p>
            <p><strong>Designation:</strong> {getDesignationName(payrollData.Designation_ID)}</p>
            <p><strong>Payroll Date:</strong> {formatDate(payrollData.Date)}</p>
          </div>
  
 
        </div>
      </div>

      {/* Totals */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">Totals</h3>
        <div className="flex justify-between mb-2">
          <div>
            <p><strong>Total Basic Salary:</strong> ${totalBasicSalary.toFixed(2)}</p>
            <p><strong>Total EPF:</strong> ${totalEPF.toFixed(2)}</p>
            <p><strong>Total ETF:</strong> ${totalETF.toFixed(2)}</p>
            <p><strong>Total OT Hours:</strong> {totalOTHours.toFixed(2)}</p>
          </div>
          <div>
            <p><strong>Total OT Payment:</strong> ${totalOTPayment.toFixed(2)}</p>
            <p><strong>Total Allowance:</strong> ${totalAllowance.toFixed(2)}</p>
            <p><strong>Total Tax:</strong> ${totalTax.toFixed(2)}</p>
            <p><strong>Total Net Income:</strong> ${totalNetIncome.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Company footer */}
      <div className="mt-4 text-center">
        <p className="text-sm">Thank you for your hard work!</p>
        <p className="text-xs">&copy; {new Date().getFullYear()} flexy code (Pvt) ltd. All rights reserved.</p>
      </div>

      {/* Centered Button for Printing */}
      <div className="flex justify-center mt-4 print:hidden">
        {/* Add 'print:hidden' class to hide the button when printing */}
        <button onClick={handlePrint} className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          Print Payroll
        </button>
      </div>
    </div>
  );
};

export default PayrollTemplate;
