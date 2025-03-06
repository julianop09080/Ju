import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PersonalityTest() {
    const [answers, setAnswers] = useState({ interest: '', activityLevel: ''});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const prompt = `Based on the user's interests in ${answers.interest} and activity level of ${answers.activityLevel}, suggest 3 hobbies for them.`;
        
        try {

            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions', // OpenAI API URL
                {
                    model: "gpt-3.5-turbo", // Use the model (you can change it)
                    messages: [
                        { role: "system", content: "You are a helpful assistant." },  // System message
                        { role: "user", content: prompt }  // User input (pass the prompt here)
                    ],
                    max_tokens: 150,           // Limit the response length
                    temperature: 0.7,          // Controls randomness of the response  
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Use the API key from the .env file
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('AI response:', response.data);

            // Save or process the hobby suggestions
            const hobbySuggestions = response.data.choices[0].message.content.trim();


            // Store the hobby suggestions in localStorage for use on the next page
            localStorage.setItem('hobbySuggestions', hobbySuggestions);

            // Navigate to the recommendations page
            navigate('/hobby-recommendations', {
                state: { hobbySuggestions: hobbySuggestions },

        });
        } catch (error) {
            console.error('Error fetching from OpenAI:', error);
            setError('Failed to get recommendations. Try again later.');
        } finally {
            setLoading(false);
        }
        
    };

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value });
    };

    return (
        <div>
           <h1>Personality Test</h1>
           <form onSubmit={handleSubmit}>
            <label>
                What type of activities do you enjoy?
                <input
                type="text"
                name="interest"
                value={answers.interest}
                onChange={handleChange}
                placeholder="e.g., Sports, Arts, Gaming"
                />
            </label>
            <br />
            <label>
                How active are you in your hobbies?
                <select
                name="activityLevel" value={answers.activityLevel} onChange={handleChange}>
                    <option value="">Select an option</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </label>
            <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default PersonalityTest;