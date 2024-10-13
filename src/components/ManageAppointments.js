import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from '../services/api';

function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from the backend API
    async function fetchAppointments() {
      try {
        const response = await axios.get('/appointments');
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    }
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/appointments/${id}`);
      setAppointments(appointments.filter(appt => appt.id !== id));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <div>
      <h3>Your Appointments</h3>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{new Date(appt.date).toLocaleDateString()}</td>
                <td>{new Date(appt.date).toLocaleTimeString()}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(appt.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No appointments found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default ManageAppointments;
