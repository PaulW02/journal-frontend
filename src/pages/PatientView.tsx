import DefaultLayout from "../layout/DefaultLayout.tsx";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { patientService } from "../api/PatientService"; // Assuming this fetches patient details

const PatientView = () => {
    function getPatientIdFromUrl() {
        const url = window.location.href; // Get the current URL
        const urlParts = url.split('/'); // Split the URL into parts based on '/'
        const patientId = urlParts[urlParts.length - 1]; // Assuming patient ID is the last part
        return patientId;
    }

    const patientId = getPatientIdFromUrl();
    const navigate = useNavigate();

    const [patientData, setPatientData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPolling, setIsPolling] = useState(true); // Start polling initially
    const [newCondition, setNewCondition] = useState('');

    useEffect(() => {
        const fetchPatientData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await patientService.getPatientDetails(patientId);
                setPatientData(response);
            } catch (error) {
                console.error('Error fetching patient data:', error);
                setError(error.message || 'Failed to fetch patient details');
            } finally {
                setIsLoading(false);
            }
        };

        if (isPolling && !patientData) {
            fetchPatientData();
        }

        return () => setIsPolling(false); // Cleanup function to stop polling on unmount
    }, [patientData, isPolling, patientId]); // Re-run when relevant values change

    const handleAddCondition = async () => {
        try {
            // Assuming '/api/condition/' endpoint accepts POST request with patientId and condition name
            await patientService.addCondition(newCondition, patientId);
            // Refetch patient data to update conditions list
        } catch (error) {
            console.error('Error adding condition:', error);
            // Handle error appropriately, e.g., show error message to the user
        }
    };

    if (error) {
        return (
            <div>
                Error: {error}
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    if (isLoading) {
        return <div>Loading patient data...</div>;
    }

    const { firstName, lastName, conditions, observations } = patientData;

    return (
        <DefaultLayout>
            <div className="patient-view">
                <h2>Patient Profile</h2>
                <div className="patient-info">
                    <p>
                        <b>Name:</b> {firstName} {lastName}
                    </p>
                </div>
                <div className="patient-health">
                    <h3>Medical Conditions</h3>
                    <ul>
                        {conditions.map((condition) => (
                            <li key={condition.id}>{condition.conditionName}</li>
                        ))}
                    </ul>
                    <h3>Observations</h3>
                    <ul>
                        {observations.map((observation) => (
                            <li key={observation.id}>{observation.name} ({observation.dosage})</li>
                        ))}
                    </ul>
                </div>
                {/* Add input field and button to add condition */}
                <div>
                    <br/>
                    <input
                        type="text"
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value)}
                        className="rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter new condition"
                    />
                    <br/>
                    <br/>
                    <button className="cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90" onClick={handleAddCondition}>Add Condition</button>
                </div>
                {/* Example: Timeline visualization for conditions and medications */}
                {/* You can use libraries like 'react-timeseries-charts' */}
            </div>
        </DefaultLayout>
    );
};

export default PatientView;
