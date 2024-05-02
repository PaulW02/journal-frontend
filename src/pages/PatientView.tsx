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
    console.log(patientData);
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
                            <li key={condition.id}>{condition.name}</li>
                        ))}
                    </ul>
                    <h3>Observations</h3>
                    <ul>
                        {observations.map((observation) => (
                            <li key={observation.id}>{observation.name} ({observation.dosage})</li>
                        ))}
                    </ul>
                </div>
                {/* Add creative elements here (optional) */}
                {/* Example: Timeline visualization for conditions and medications */}
                {/* You can use libraries like 'react-timeseries-charts' */}
            </div>
        </DefaultLayout>
    );
};

export default PatientView;
