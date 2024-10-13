import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../services/api';

function ScheduleAppointment() {
  const [startDate, setStartDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();  // Ensure the event is prevented

    const token = localStorage.getItem('token');  // Get JWT token from local storage
    if (!token) {
      console.error('No token found. Please log in first.');
      alert('Please log in first.');
      return;
    }

    const appointmentData = {
      date: startDate.toISOString().slice(0, 19).replace('T', ' '),  // Format the date correctly
    };

    try {
      const response = await axios.post('/schedule', appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Attach the token in the request header
        },
      });
      console.log('Appointment scheduled successfully!', response.data.message);
      alert('Appointment scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling appointment:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3>Schedule an Appointment</h3>
        <form onSubmit={handleSubmit}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
          <button type="submit" className="btn btn-primary mt-3">Schedule</button>
        </form>
      </div>
    </div>
  );
}

export default ScheduleAppointment;
