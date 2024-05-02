import DefaultLayout from "../layout/DefaultLayout.tsx";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { patientService } from "../api/PatientService"; // Assuming this fetches patient details

const CreatePatient = () => {
    const [patientData, setPatientData] = useState({
        firstName: "",
        lastName: "",
        age: 0,
        // Add other fields like phone number, date of birth etc.
    });
    const [isLoading, setIsLoading] = useState(true);

    const handleCreatePatient = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const { name, value } = e.target;
        setPatientData({ ...patientData, [name]: value });
    };

    const handleSubmit = async () => {
        setIsLoading(true); // Show loading indicator
        try {
            await patientService.createPatient(patientData);
            // Handle successful creation (e.g., navigate to a confirmation page)
        } catch (error) {
            console.error("Error creating patient:", error);
            // Handle errors (e.g., display an error message to the user)
        } finally {
            setIsLoading(false); // Hide loading indicator
        }
    };

    return (
        <DefaultLayout>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            First Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter your first name"
                                value={patientData.firstName}
                                name="firstName"
                                id="firstName"
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                onChange={handleCreatePatient} // Update data on change
                            />
                            {/* Add similar input fields for other data */}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Last Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter your last name"
                                value={patientData.lastName}
                                name="lastName"
                                id="lastName"
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                onChange={handleCreatePatient} // Update data on change
                            />
                            {/* Add similar input fields for other data */}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Age
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                placeholder="Enter your age"
                                value={patientData.age}
                                name="age"
                                id="age"
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                onChange={handleCreatePatient} // Update data on change
                            />
                            {/* Add similar input fields for other data */}
                        </div>
                    </div>

                    <div className="mb-5">
                        <input
                            type="submit"
                            value="Create Patient"
                            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                        />
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default CreatePatient;
