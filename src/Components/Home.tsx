import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header'; 


const Home: React.FC = () => {
  return (
    <>
      <Header /> {/* this will render the header at the top */}
    <div className="home-wrapper">
      <div className="home-card">
        <h1>Welcome to FlashLearn</h1>
        <p>Boost your learning with smart flashcards and active recall</p>
        <div className="btn-container">
          <Link to="/signup" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </div>
    </div>
  </>
  );
};

export default Home;
