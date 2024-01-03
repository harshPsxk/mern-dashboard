import React, { useState, useEffect } from 'react';

function AlertHistory({ token }) {
  const [alerts, setAlerts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://localhost:5000/alerts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setAlerts(data);
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('Error fetching alerts: ' + error.message);
      }
    };

    fetchAlerts();
  }, [token]);

  return (
    <div>
      <h2>Alert History</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Threshold</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert._id}>
              <td>{alert._id}</td>
              <td>{alert.threshold}</td>
              <td>{alert.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlertHistory;
