import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="h-screen bg-cover"
      style={{ backgroundImage: `url('../src/assets/images/heart-day.jpg')` }}
    >
      <div className="flex justify-center items-center h-full bg-white bg-opacity-90">
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">
            Innovation and Complexity
          </p>
          <h1 className="text-5xl font-bold mb-8">
            Deaths from Cardiovascular Diseases and Types
          </h1>

          <p className="text-justify m-4">
            The estimated number of deaths from cardiovascular disease by type,
            Germany (2009-2019). 
            Key User Group The Robert Koch-Institute
            (German central institution responsible for disease prevention and
            control), hospitals, health centers and citizens. 
            Key Problem
            According to WHO, heart diseases and other cardiovascular diseases
            (CVD) are the most common causes of death worldwide responsible for
            one third of all deaths globally. 
            </p> 
            <p className="text-justify m-4"> On a national scale, it is
            important to compare the number of CVD death by type in a period of
            10 years (2009-2019) to enable the easy identification of high-risk
            diseases. Solution The app can be used by health institutions and
            providers to monitor decrease or increase in CVDs in the last ten
            years or more in Germany. The disease comparison will help in
            prioritizing disease diagnosis and treatment, preventive solutions,
            and awareness campaigns. Asides health care providers and
            institutions, citizens can use the information to pay more attention
            to their health and report all related symptoms to their GP.
          </p>
          <Link
            to="/login"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
