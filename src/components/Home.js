import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to Hobby Explorer!</h1>
            <p>Find fun hobbies and activities tailored to you.</p>
            <Link to="/personality-test">
                <button>Start Personality Test</button>
            </Link>
        </div>
    );
}

export default Home;