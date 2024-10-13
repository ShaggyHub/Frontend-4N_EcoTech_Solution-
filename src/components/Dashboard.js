import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import Profile from './Profile';
import ManageAppointments from './ManageAppointments';
import Settings from './Settings';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('profile');

  // Function to render the active section
  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile />;
      case 'appointments':
        return <ManageAppointments />;
      case 'settings':
        return <Settings />;
      default:
        return <Profile />;
    }
  };

  return (
    <Container fluid className="mt-5">
      <Row>
        {/* Sidebar */}
        <Col md={3} className="bg-light p-3">
          <h4>Dashboard</h4>
          <Nav className="flex-column">
            <Nav.Link onClick={() => setActiveSection('profile')}>Profile</Nav.Link>
            <Nav.Link onClick={() => setActiveSection('appointments')}>Manage Appointments</Nav.Link>
            <Nav.Link onClick={() => setActiveSection('settings')}>Settings</Nav.Link>
          </Nav>
        </Col>

        {/* Main Content Area */}
        <Col md={9}>
          {renderSection()}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
