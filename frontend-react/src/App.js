import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [timestamps, setTimestamps] = useState({
    timestamp1: '',
    timestamp2: '',
  });
  const [differenceInSeconds, setDifferenceInSeconds] = useState(null);

  const handleTimestampChange = (event, field) => {
    const value = event.target.value;
    setTimestamps((prev) => ({ ...prev, [field]: value }));
  };

  const calculateDifference = async () => {
    try {
      const response = await axios.post('https://cwflbackend.onrender.com/calculate-difference', { timestamps });
      const data = response.data;
      console.log(data);
      setDifferenceInSeconds(data.differenceInSeconds);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Timestamp Difference Calculator</h1>
      <div>
        <label>Enter timestamp for Event 1:</label>
        <input
          type="text"
          placeholder="DD:MM:YYYY HH:MM:SS"
          value={timestamps.timestamp1}
          onChange={(e) => handleTimestampChange(e, 'timestamp1')}
        />
      </div>
      <div>
        <label>Enter timestamp for Event 2:</label>
        <input
          type="text"
          placeholder="DD:MM:YYYY HH:MM:SS"
          value={timestamps.timestamp2}
          onChange={(e) => handleTimestampChange(e, 'timestamp2')}
        />
      </div>
      <button onClick={calculateDifference}>Calculate Difference</button>
      {differenceInSeconds !== null && (
        <div>
          <h2>Difference in seconds:</h2>
          <p>{differenceInSeconds}</p>
        </div>
      )}
    </div>
  );
}

export default App;
