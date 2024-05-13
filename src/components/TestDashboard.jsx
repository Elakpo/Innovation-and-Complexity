import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { logout } from "../auth";
import BarChart from './Barchart';
import * as d3 from 'd3'; // Import d3 library

const Dashboard = () => {
  const history = useHistory(); // Import useHistory hook

  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [selectedDiseases, setSelectedDiseases] = useState([]); // Added selectedDiseases state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await d3.json('data.json'); // Fetch data using d3.json
        // Filter data where Entity is "Germany"
        const germanyData = jsonData.filter(item => item.Entity === "Germany");
        
        setData(germanyData);

        const keys = Object.keys(germanyData[0] || {}).filter(key => key !== "Entity" && key !== "Code" && key !== "Year");
        
        setKeys(keys);

        console.log({"fetched_keys" : keys});
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    // Call logout function from auth.js
    logout();
    // Redirect to login page after logout
    history.push("/login");
  };

  const filterSearchData = (title) => {
    if (selectedDiseases.includes(title)) {
      setSelectedDiseases(selectedDiseases.filter(item => item !== title));
    } else {
      setSelectedDiseases([...selectedDiseases, title]);
    }
  };

  const filteredData = data.map(item => {
    const filteredItem = { ...item };
    Object.keys(filteredItem).forEach(key => {
      if (keys.includes(key) && selectedDiseases.length > 0 && !selectedDiseases.includes(key)) {
        filteredItem[key] = null;
      }
    });
    return filteredItem;
  }).map(item => {
    const filteredKeys = Object.keys(item).filter(key => item[key] !== null);
    const newFilteredItem = {};
    filteredKeys.forEach(key => {
      // Round down the data value if it's a number
      newFilteredItem[key] = typeof item[key] === 'number' ? Math.floor(item[key]) : item[key];
    });
    return newFilteredItem;
  });

  return (
    <div>
      <div className="h-screen bg-cover">
        <div className="bg-gray-100 bg-opacity-75 min-h-screen">
          <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold text-red mb-8">Dashboard</h1>
            <button onClick={handleLogout} className='p-3 bg-red-500 text-white rounded-lg flex-row justify-end'>Logout</button>
            <div>
              <h1 className='text-center text-3xl'>Deaths from Cardiovascular Diseases and Types</h1>
              <BarChart data={filteredData} />
              <h1 className='text-center mt-0'>Select a Disease to view</h1>
              <form>
                <div className='flex flex-row flex-wrap p-4 justify-center mx-auto'>
                  {keys.map(title => (
                    <div key={title} className="flex items-center mr-4">
                      <input type="checkbox" onChange={() => filterSearchData(title)} className='h-5 w-5 mr-2' />
                      <span>{title}</span>
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
