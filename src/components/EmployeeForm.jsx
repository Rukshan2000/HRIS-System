import React from 'react';



const EmployeeForm = ({ formData, departments, designations, handleChange, handleSubmit, toggleForm }) => {


    const formattedDateOfBirth = formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : '';
    const formattedemploymentStartDate = formData.employmentStartDate ? new Date(formData.employmentStartDate).toISOString().split('T')[0] : '';


    return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-lg font-semibold">Add/Edit Employee</h2>
                <div style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 mb-4">
                            <label htmlFor="fullName" className="block mb-1 text-sm font-semibold">
                                Full Name:
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="permanentAddress" className="block mb-1 text-sm font-semibold">
                                Permanent Address:
                            </label>
                            <textarea
                                id="permanentAddress"
                                name="permanentAddress"
                                value={formData.permanentAddress}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dateOfBirth" className="block mb-1 text-sm font-semibold">
                                Date of Birth:
                            </label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formattedDateOfBirth}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="employmentStartDate" className="block mb-1 text-sm font-semibold">
                                Employment Start Date:
                            </label>
                            <input
                                type="date"
                                id="employmentStartDate"
                                name="employmentStartDate"
                                value={formattedemploymentStartDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="emergencyContactName" className="block mb-1 text-sm font-semibold">
                                Emergency Contact Name:
                            </label>
                            <input
                                type="text"
                                id="emergencyContactName"
                                name="emergencyContactName"
                                value={formData.emergencyContactName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="emergencyContactNumber" className="block mb-1 text-sm font-semibold">
                                Emergency Contact Number:
                            </label>
                            <input
                                type="text"
                                id="emergencyContactNumber"
                                name="emergencyContactNumber"
                                value={formData.emergencyContactNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="bloodCategory" className="block mb-1 text-sm font-semibold">
                                Blood Category:
                            </label>
                            <select
                                id="bloodCategory"
                                name="bloodCategory"
                                value={formData.bloodCategory}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Select Blood Category</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="gendername" className="block mb-1 text-sm font-semibold">
                                Gender:
                            </label>
                            <select
                                id="gendername"
                                name="gendername"
                                value={formData.gendername}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nicNumber" className="block mb-1 text-sm font-semibold">
                                NIC Number:
                            </label>
                            <input
                                type="text"
                                id="nicNumber"
                                name="nicNumber"
                                value={formData.nicNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="primaryContactNumber" className="block mb-1 text-sm font-semibold">
                                Primary Contact Number:
                            </label>
                            <input
                                type="text"
                                id="primaryContactNumber"
                                name="primaryContactNumber"
                                value={formData.primaryContactNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="secondaryContactNumber" className="block mb-1 text-sm font-semibold">
                                Secondary Contact Number (Optional):
                            </label>
                            <input
                                type="text"
                                id="secondaryContactNumber"
                                name="secondaryContactNumber"
                                value={formData.secondaryContactNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="emailAddress" className="block mb-1 text-sm font-semibold">
                                Email Address:
                            </label>
                            <input
                                type="email"
                                id="emailAddress"
                                name="emailAddress"
                                value={formData.emailAddress}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="shift" className="block mb-1 text-sm font-semibold">
                                Shift:
                            </label>
                            <select
                                id="shift"
                                name="shift"
                                value={formData.shift}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Select Shift</option>
                                <option value="Day">Day</option>
                                <option value="Night">Night</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="departmentOrTeam" className="block mb-1 text-sm font-semibold">
                                Department
                            </label>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.map(dep => (
                                    <option key={dep.id} value={dep.id}>
                                        {dep.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="designation" className="block mb-1 text-sm font-semibold">
                                Designation
                            </label>
                            <select
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Select Designation</option>
                                {designations.map(desig => (
                                    <option key={desig.id} value={desig.id}>
                                        {desig.name}
                                    </option>
                                ))}
                            </select>



                        </div>
                        <div className="col-span-2">
                            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={toggleForm}
                                className="px-4 py-2 ml-2 text-white bg-gray-500 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmployeeForm;
