import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen bg-cover" style={{backgroundImage: `url('../src/assets/images/heart-day.jpg')`}}>
      <div className="flex justify-center items-center h-full bg-white bg-opacity-90">
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">Innovation and Complexity</p>
          <h1 className="text-5xl font-bold mb-8">Deaths from Cardiovascular Diseases and Types</h1>
          <Link to="/login" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
