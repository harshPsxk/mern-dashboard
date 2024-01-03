import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DeviceDropdown } from './Dashboard';

function AlertCreation({ token }) {
  const { state: locationState } = useLocation();
  const [condition, setCondition] = useState('');
  const [threshold, setThreshold] = useState('');
  const [device, setDevice] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'condition') {
      setCondition(value);
    } else if (name === 'threshold') {
      setThreshold(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending data:', { condition, threshold, deviceId: device });
    // Convert threshold to a number for validation or sending
    const numericThreshold = Number(threshold);
    if (isNaN(numericThreshold)) {
      setMessage('Threshold must be a number');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ condition, threshold: numericThreshold, deviceId: device }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Alert created successfully');
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Create Alert Rule</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Condition:
          <input
            type="text"
            name="condition"
            value={condition}
            onChange={handleChange}
            placeholder="Condition (e.g., temperature)"
          />
        </label>
        <label>
          Threshold:
          <input
            type="text"
            name="threshold"
            value={threshold}
            onChange={handleChange}
            placeholder="Threshold Value"
          />
        </label>
        <DeviceDropdown devices={locationState.devices} onSelectDevice={(device) => {
          console.log(device);
          setDevice(device)
        }} />
        <button type="submit">Create Alert</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AlertCreation;
