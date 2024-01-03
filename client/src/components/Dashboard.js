import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';


function groupDataByDevice(data) {
  return data.reduce((acc, current) => {
    const deviceId = current.deviceId;
    if (!acc[deviceId]) {
      acc[deviceId] = [];
    }
    acc[deviceId].push(current);
    return acc;
  }, {});
}

export function DeviceDropdown({ devices, onSelectDevice }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <select
        name='device'
        onChange={(e) => onSelectDevice(e.target.value)}
        defaultValue=""
        style={{ padding: '10px', margin: '10px 0', borderRadius: '5px' }}
      >
        <option value="" disabled>Select a Device</option>
        {devices.map((deviceId) => (
          <option key={deviceId} value={deviceId}>{deviceId}</option>
        ))}
      </select>
    </div>
  );
}

function formatDate(date) {
  return format(parseISO(date), 'd MMM');
}

function Dashboard({ token }) {
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [selectedDevice, setSelectedDevice] = useState('');
  const [alertRules, setAlertRules] = useState([]); // State to store alert rules
  const [alerts, setAlerts] = useState([]);

  const navigate = useNavigate();

  // Fetch device data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  // Fetch alert rules
  useEffect(() => {
    const fetchAlertRules = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/alerts', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const rules = await response.json();
          setAlertRules(rules);
        } else {
          console.error('Failed to fetch alert rules');
        }
      } catch (error) {
        console.error('Error fetching alert rules:', error);
      }
    };

    fetchAlertRules();
  }, [token]);

  useEffect(() => {
    const grouped = groupDataByDevice(data);
    setGroupedData(grouped);
  }, [data]);

  useEffect(() => {
    // Setup WebSocket connection
    const socket = io('http://localhost:5000');

    // Listening for 'alert' event from server
    socket.on('alert', (alertData) => {
      console.log('New alert received:', alertData);
      setAlerts(currentAlerts => [...currentAlerts, alertData]);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, [token]);

  const handleDeviceSelect = (deviceId) => {
    setSelectedDevice(deviceId);
  };

  const navigateToCreateAlert = (devices) => {
    navigate('/create-alert', { 'state': {devices} });
  };

  const devices = Object.keys(groupedData);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Dashboard</h2>
      <button onClick={() => navigateToCreateAlert(devices)}>Create Alert</button>
      <div>
        <h3>Real-Time Alerts</h3>
        {alerts
          .filter(alert => alert.data.deviceId === selectedDevice)
          .map((alert, index) => (
          <div key={index}>
            {alert.message} - Data: {JSON.stringify({ data: alert.data, alert: alert.alert })}
          </div>
        ))}
      </div>
      <DeviceDropdown devices={devices} onSelectDevice={handleDeviceSelect} />
      {selectedDevice && (
        <LineChart
          width={600}
          height={400}
          data={groupedData[selectedDevice]}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" tickFormatter={formatDate} />
          <YAxis />
          <Tooltip labelFormatter={formatDate} />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="temperature" stroke="#ff7300" yAxisId={0} />
        </LineChart>
      )}
      <div>
        <h3>Alert Rules</h3>
        <ul>
          {alertRules.map(rule => (
            <li key={rule._id}>
              Condition: {rule.condition}, Threshold: {rule.threshold}, DeviceId: {rule.deviceId}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
