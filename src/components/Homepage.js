import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import '../styles/Homepage.css'; // Import the styles

const Homepage = () => {
    return (
        <div className="homepage">
            {/* Navigation Bar */}
            <nav className="navbar">
                <h1 className="logo">Hobby Explorer</h1>
                <div className="nav-buttons">
                    <Link to="/login" className="btn">Login</Link>
                    <Link to="/signup" className="btn">Create Account</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <motion.div
               className="hero"
               initial={{ opacity: 0, y: -50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1 }}
            >
                <h2>Discover Your Passion with AI</h2>
                <p>Take a personality test and get personalized hobby recommendations.</p>
                <Link to="/test" className="btn primary">Take the Test</Link>
            </motion.div>

            {/* Information Section */}
            <section className="info">
            <h2>How It Works</h2>
            <p>We use AI to analyze your personality and suggest hobbies suited to you.</p>
            <h3>FAQ</h3>
            <details>
                <summary>How does the AI work?</summary>
                <p>Our AI analyzes your test answers and matches you with hobbies that suit your interests.</p>
            </details>
            <details>
                <summary>Is this service free?</summary>
                <p>Yes! You can explore hobbies for free, but donations help us improve.</p>
            </details>
            </section>
        

        {/* Donation Section */}
        
        <section className="donations">
           <h2>Support Our Mission</h2>
           <p>Your donations help us expand our hobby database and improve AI recommendations.</p>
           <button className="btn donate">Donate Now</button> 
        </section>

        {/* Footer */}
        <footer>
            <p>&copy; 2025 Hobby Explorer. All rights reserved.</p>
        </footer>
        </div>
    );
};

export default Homepage;
