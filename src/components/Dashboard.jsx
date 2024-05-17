import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { logout } from "../auth";
import BarChart from './Barchart';
import * as d3 from 'd3'; // Import d3 library

const Dashboard = () => {
  const history = useHistory(); // Import useHistory hook

  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [selectedDiseases, setSelectedDiseases] = useState([]); // Added selectedDiseases state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await d3.json('data.json'); // Fetch data using d3.json
        // Filter data where Entity is "Germany"
        const germanyData = jsonData.filter(item => item.Entity === "Germany" && item.Year >= 2009 && item.Year <= 2019);

        setData(germanyData);
        setDefaultData(germanyData);

        const keys = Object.keys(germanyData[0] || {}).filter(key => key !== "Entity" && key !== "Code" && key !== "Year");

        setKeys(keys);

        console.log({ "fetched_keys": keys });

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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;
      const csvData = d3.csvParse(text, (d) => {
        // Remove double quotes and convert numeric values from strings to integers
        d["Rheumatic heart disease"] = parseInt(d["Rheumatic heart disease"].replace(/"/g, ""));
        d["Cardiomyopathy, myocarditis, endocarditis"] = parseInt(d["Cardiomyopathy, myocarditis, endocarditis"].replace(/"/g, ""));
        d["Other circulatory diseases"] = parseInt(d["Other circulatory diseases"].replace(/"/g, ""));
        d["Hypertensive heart disease"] = parseInt(d["Hypertensive heart disease"].replace(/"/g, ""));
        d["Ischaemic stroke"] = parseInt(d["Ischaemic stroke"].replace(/"/g, ""));
        d["Haemorrhagic stroke"] = parseInt(d["Haemorrhagic stroke"].replace(/"/g, ""));
        d["Ischaemic heart disease"] = parseInt(d["Ischaemic heart disease"].replace(/"/g, ""));
        d["Year"] = parseInt(d["Year"].replace(/"/g, ""));
        return d;
      });
      setData(csvData);
    };

    reader.readAsText(file);
  };

  const resetData = () => {
    // Reset data to default data
    setData(defaultData);
  };

  console.log("file data upload", { data });

  return (
    <div>
      <div className="h-screen bg-cover">
        <div className="bg-gray-100 bg-opacity-75 min-h-screen">
          <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold text-red mb-8">Dashboard</h1>
            <button onClick={handleLogout} className='p-3 bg-red-500 text-white rounded-lg flex-row justify-end'>Logout</button>
            <div>
              <h1 className='text-center text-3xl my-6'>Deaths from Cardiovascular Diseases and Types</h1>

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
                <hr/><br/>
                <div className='bg-black py-4 m-4 mt-6 px-4 text-white rounded-lg flex-wrap' style={{ maxWidth: 'fit-content', margin: 'auto' }}>
                  <h3 className='text-center text-3xl m-3 mt-0'>Upload Custom Data</h3>
                  <div className='flex flex-row justify-center'>
                    {/* <label htmlFor="file-upload">Upload CSV file:</label> */}
                    <input type="file" id="file-upload" accept=".csv" onChange={handleFileUpload} />
                    <button className='ring-2 ring-red-500 hover:text-white hover:bg-red-500 text-red-500 rounded-lg p-2' onClick={resetData}>Reset Data</button> {/* Reset button */}
                  </div>
                </div>
                <br/>


              </form>

              <BarChart data={filteredData} width={600} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
