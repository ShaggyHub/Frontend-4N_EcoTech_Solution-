import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from '../services/api';

function ScheduleMeeting() {
  const [meetingData, setMeetingData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to create a new meeting
      await axios.post('/schedule', meetingData);
      alert('Meeting scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling meeting:', error);
    }
  };

  return (
    <div>
      <h3>Schedule a New Meeting</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formTitle" className="mt-3">
              <Form.Label>Meeting Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter meeting title"
                value={meetingData.title}
                onChange={(e) => setMeetingData({ ...meetingData, title: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={meetingData.description}
                onChange={(e) => setMeetingData({ ...meetingData, description: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formDate" className="mt-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={meetingData.date}
                onChange={(e) => setMeetingData({ ...meetingData, date: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formTime" className="mt-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={meetingData.time}
                onChange={(e) => setMeetingData({ ...meetingData, time: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          Schedule Meeting
        </Button>
      </Form>
    </div>
  );
}

export default ScheduleMeeting;
