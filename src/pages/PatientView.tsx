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
    console.log("Patient ID:", patientId);
    const navigate = useNavigate(); // To handle potential navigation

    const [patientData, setPatientData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPolling, setIsPolling] = useState(true); // Start polling initially
// ... other state and logic
    useEffect(() => {
        const fetchPatientData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await patientService.getPatientDetails(patientId);
                console.log(response.firstName + " TEEAES");
                setPatientData(response);
            } catch (error) {
                console.error('Error fetching patient data:', error);
                setError(error.message || 'Failed to fetch patient details');
            } finally {
                setIsLoading(false);
            }
        };

        // Only fetch data if polling is active and data is not yet available
        if (isPolling && !patientData) {
            fetchPatientData();
        }

        // Cleanup function to stop polling on unmount
    }, [patientData, isPolling]); // Re-run when relevant values change
    // Handle potential errors or navigation
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
    return (
        <DefaultLayout>
        <div>
            {/* Display patient details using patientData */}
            <p>Patient Name: {patientData.firstName}</p>
            {/* ... other patient details ... */}
        </div>
        </DefaultLayout>
    );
};

export default PatientView;