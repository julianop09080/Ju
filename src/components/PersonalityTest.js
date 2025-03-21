import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: "How do you prefer to spend your free time?",
    options: [
      "Alone, with a small group of close friends",
      "With a large group of people or at social gatherings",
      "Exploring new places and experiences",
      "Creating or working on something (e.g., crafting, writing)"
    ],
    name: "interest"
  },
  {
    question: "Which activity sounds the most fun to you?",
    options: [
      "Solving puzzles or brain teasers",
      "Learning about different cultures or new topics",
      "Playing sports or engaging in physical activity",
      "Creating art, music, or writing"
    ],
    name: "activity"
  },
  {
    question: "When faced with a challenge, how do you typically react?",
    options: [
      "I prefer to tackle it head-on with a step-by-step plan",
      "I like to think about it for a while before diving in",
      "I jump right in, figuring things out as I go",
      "I look for creative or unconventional solutions"
    ],
    name: "challengeReaction"
  },
  {
    question: "Which of the following best describes you?",
    options: [
      "Practical and organized",
      "Curious and open-minded",
      "Energetic and outgoing",
      "Reflective and thoughtful"
    ],
    name: "personality"
  },
  {
    question: "What type of environment makes you feel most comfortable?",
    options: [
      "Quiet and peaceful",
      "Energetic and bustling",
      "Outdoors with nature",
      "A creative space (studio, workshop, etc.)"
    ],
    name: "environment"
  }
];

function PersonalityTest() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer); // Store the selected answer
    };

    const handleNextQuestion = () => {
        if (selectedAnswer) {
            const currentQuestion = questions[currentQuestionIndex];
            setAnswers({ ...answers, [currentQuestion.name]: selectedAnswer });
            setSelectedAnswer(null); // Reset answer for the next question
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                handleSubmit();
            }
        } else {
            alert("Please select an answer before proceeding.");
        }
    };

    const handleSubmit = async () => {
        const prompt = `Based on the user's interests in ${answers.interest}, their activity level being ${answers.activity}, their reaction to challenges as ${answers.challengeReaction}, their personality as ${answers.personality}, and their preferred environment being ${answers.environment}, suggest 3 hobbies for them.`;

        try {
            setLoading(true);
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "You are a helpful assistant." },
                        { role: "user", content: prompt }
                    ],
                    max_tokens: 150,
                    temperature: 0.7,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const hobbySuggestions = response.data.choices?.[0]?.message?.content?.trim() || "No hobbies found.";
            localStorage.setItem('hobbySuggestions', hobbySuggestions);

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

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            <h1>Personality Test</h1>
            <div>
                <h2>{currentQuestion.question}</h2>
                <div>
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerClick(option)}
                            style={{
                                margin: '10px', 
                                padding: '10px 20px', 
                                backgroundColor: selectedAnswer === option ? '#0056b3' : '#007bff', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '5px'
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {selectedAnswer && currentQuestionIndex < questions.length - 1 && (
                <button onClick={handleNextQuestion}>
                    Next Question
                </button>
            )}

            {currentQuestionIndex === questions.length - 1 && selectedAnswer && (
                <button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Getting Recommendations...' : 'Submit Answers'}
                </button>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default PersonalityTest;

