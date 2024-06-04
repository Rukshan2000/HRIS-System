import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiFilter } from 'react-icons/bi';

const DailyAttendance = () => {
  const [shift, setShift] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  // Fetch attendance data from the API
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/attendance');
      const data = response.data.data;
      console.log('Fetched Attendance Data:', data);
      setAttendanceData(data);
      setFilteredData(data); // Initially set filtered data to the fetched data
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  // Fetch employee data from the API
  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/employee');
      const data = response.data.data;
      console.log('Fetched Employee Data:', data);
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
    fetchEmployeeData();
  }, []);

  const getEmployeeName = (empId) => {
    const employee = employees.find(emp => emp.Emp_ID === empId);
    return employee ? employee.Name : 'Unknown';
  };

  const getEmployeeShift = (empId) => {
    const employee = employees.find(emp => emp.Emp_ID === empId);
    return employee ? employee.Shift : 'Unknown';
  };

  const filterData = () => {
    let filtered = attendanceData;

    if (shift) {
      filtered = filtered.filter((item) => getEmployeeShift(item.Emp_ID) === shift);
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset current page when filtering
  };

  useEffect(() => {
    filterData();
  }, [shift, attendanceData, employees]);

  // Logic to paginate the data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4">
      {/* Filter dropdowns */}
      <div className="flex items-center mb-4 space-x-4">
        <select value={shift} onChange={(e) => setShift(e.target.value)} className="p-2 bg-gray-100 rounded-md">
          <option value="">Select Shift</option>
          <option value="Day">Day</option>
          <option value="Night">Night</option>
        </select>

        <button onClick={filterData} className="flex items-center p-2 space-x-2 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600">
          <BiFilter /> <span>Filter</span>
        </button>
      </div>

      {/* Scrollable table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-collapse border-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2">Emp ID</th>
              <th className="px-4 py-2">Emp Name</th>
              <th className="px-4 py-2">Shift</th>
              <th className="px-4 py-2">In Time</th>
              <th className="px-4 py-2">Out Time</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((attendance) => (
              <tr key={attendance.Emp_ID} className="transition duration-300 hover:bg-gray-50">
                <td className="px-4 py-2 border">{attendance.Emp_ID}</td>
                <td className="px-4 py-2 border">{getEmployeeName(attendance.Emp_ID)}</td>
                <td className="px-4 py-2 border">{getEmployeeShift(attendance.Emp_ID)}</td>
                <td className="px-4 py-2 border">{attendance.In_Time}</td>
                <td className="px-4 py-2 border">{attendance.Out_Time}</td>
                <td className="px-4 py-2 border">{attendance.Statuss}</td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center border">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination buttons */}
      <div className="flex justify-center mt-4">
  <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md disabled:opacity-50">Prev</button>
  <button onClick={() => paginate(currentPage + 1)} disabled={currentItems.length < itemsPerPage} className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-md disabled:opacity-50">Next</button>
</div>

    </div>
  );
};

export default DailyAttendance;
