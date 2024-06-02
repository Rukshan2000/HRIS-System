import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const Report = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchEmployeeData();
    fetchAttendanceData();
  }, []); // Empty dependency array to run the effect only once after initial render

  // Function to fetch employee data from the API
  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/employee');
      const employee = response.data.data;
      console.log('Fetched Employee:', employee);
      setEmployeeData(employee);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  // Function to fetch attendance data from the API
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/attendance');
      const attendance = response.data.data;
      console.log('Fetched Attendance:', attendance);
      setAttendanceData(attendance);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  // Function to convert employee data to Excel file format and trigger download
  const handleDownloadEmployeeExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(employeeData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
    XLSX.writeFile(workbook, 'employee_report.xlsx');
  };

  // Function to convert attendance data to Excel file format and trigger download
  const handleDownloadAttendanceExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(attendanceData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
    XLSX.writeFile(workbook, 'attendance_report.xlsx');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 m-4 text-white bg-blue-500 rounded-lg shadow-md w-80 h-60">
          <div className="flex flex-col justify-between h-full">
            <h2 className="mb-4 text-2xl font-semibold">Attendance Report</h2>
            {attendanceData.length > 0 && (
              <button onClick={handleDownloadAttendanceExcel} className="px-4 py-2 text-white bg-blue-800 rounded-lg">Download</button>
            )}
          </div>
        </div>
        <div className="p-4 m-4 text-white bg-green-500 rounded-lg shadow-md w-80 h-60">
          <div className="flex flex-col justify-between h-full">
            <h2 className="mb-4 text-2xl font-semibold">Employee Report</h2>
            {employeeData.length > 0 && (
              <button onClick={handleDownloadEmployeeExcel} className="px-4 py-2 text-white bg-green-800 rounded-lg">Download</button>
            )}
          </div>
        </div>
        <div className="p-4 m-4 text-white bg-yellow-500 rounded-lg shadow-md w-80 h-60">
          <h2 className="mb-4 text-2xl font-semibold">Payroll Report</h2>
        </div>
      </div>
    </div>
  );
};

export default Report;
