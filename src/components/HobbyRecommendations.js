import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';  // Import useLocation for accessing state passed from PersonalityTest

function HobbyRecommendations() {
    const location = useLocation();
    const hobbySuggestions = location.state?.hobbySuggestions;

    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

            useEffect (() => {
                setLoading(true);
                setError(null);

                if (hobbySuggestions) {
                    setRecommendations(hobbySuggestions.split(',').map((hobby) => hobby.trim()));
                } else {
                    setError('No recommendations found.');
                }

                setLoading(false);

            }, [hobbySuggestions]);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    // If no recommendations were found
    if (!recommendations || recommendations.length === 0) {
        return <p>No recommendations available.</p>;
    }

    return (
        <div>
            <h1>Your Personalized Hobby Recommendations</h1>
            <p>Based on your interests and activity level, we suggest trying the following hobbies:</p>
            <ul>
                {recommendations.map((hobby, index) => (
                    <li key={index}>{hobby}</li>
                ))}
            </ul>
            <p>Start with small steps and gradually invest more as you get involved.</p>
        </div>
    );
}

export default HobbyRecommendations;