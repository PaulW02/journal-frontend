import React, { useState, useEffect } from 'react';
import { patientService } from '../../api/PatientService'; // Replace with your API library
import { userService } from '../../api/UserService';
import {useNavigate} from "react-router-dom"; // Replace with your API library

const TableOne = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  // Fetch patients on component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await patientService.getAllPatients(); // Replace with your API endpoint
        if (!response) {
          throw new Error('Failed to trigger read all patients event');
        }
        console.log('Read all patients event triggered successfully');
        setPatients(response)
      } catch (error) {
        console.error('Error triggering read all patients event test:');
      }
    };
    fetchPatients();
  }, []);


  return (
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Patients
        </h4>

        <div className="flex flex-col">
          {/* Header Row */}
          <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                First name
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Last name
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Age
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Actions
              </h5>
            </div>
            {/* Add more headers if needed based on patient data */}
          </div>

          {/* Patient Data Rows */}
          {patients.map((patient: any, key) => (
              <div
                  className={`grid grid-cols-2 sm:grid-cols-4 ${
                      key === patients.length - 1
                          ? ''
                          : 'border-b border-stroke dark:border-strokedark'
                  }`}
                  key={patient.id} // Use unique identifier for key
              >
                <div className="p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{patient.firstName}</p>
                </div>
                <div className="p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{patient.lastName}</p>
                </div>
                <div className="p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{patient.age}</p>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <button onClick={() => navigate(`/patient/${patient.id}`)}>
                    View
                  </button>
                </div>
                {/* Add more data columns if needed based on patient data */}

              </div>
          ))}
        </div>

      </div>
  );
};

export default TableOne;
