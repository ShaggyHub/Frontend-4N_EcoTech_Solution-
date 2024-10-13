import React from 'react';
import { Link } from 'react-router-dom';

function Calendar() {
  return (
    <div>
      <h2>Welcome to your Calendar</h2>
      <p>Manage your appointments here.</p>
      <Link to="/schedule">Schedule an Appointment</Link>
    </div>
  );
}

export default Calendar;
