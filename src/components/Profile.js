import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form, Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // Import Link
import axios from 'axios';

function Profile({ userUniqueId }) {
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    bio: '',
    profile_picture: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  // Fetch profile data from the backend
  useEffect(() => {
    if (!userUniqueId) {
      console.error("User ID is missing");
      return;
    }

    axios.get(`http://localhost:5000/profile/${userUniqueId}`)
      .then(response => {
        setProfileData(response.data);
        setProfilePicture(response.data.profile_picture || "https://bootdey.com/img/Content/avatar/avatar7.png");
      })
      .catch(error => {
        console.error('Error fetching profile:', error.response?.data || error.message);
      });
  }, [userUniqueId]);

  // Handle profile update submission
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(profileData).forEach(key => {
      formData.append(key, profileData[key]);
    });

    if (profilePicture instanceof File) {
      formData.append('profile_picture', profilePicture);
    }

    axios.put(`http://localhost:5000/profile/${userUniqueId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(response => {
        setProfileData(response.data);
        setIsEditing(false);
        alert('Profile updated successfully!');
      })
      .catch(error => {
        console.error('Error updating profile:', error.response?.data || error.message);
        alert('Error updating profile.');
      });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Profile Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Updated Nav.Link to Link */}
              <Nav.Link as={Link} to="/dashboard">Home</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-5">
        <div className="main-body">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="main-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                User Profile
              </li>
            </ol>
          </nav>

          <div className="row gutters-sm">
            {/* Profile Card */}
            <div className="col-md-4 mb-3">
              <Card>
                <Card.Body className="text-center">
                  <img
                    src={profilePicture instanceof File ? URL.createObjectURL(profilePicture) : profilePicture}
                    alt="Profile"
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-3">
                    <h4>{profileData.name}</h4>
                    <p className="text-secondary mb-1">Full Stack Developer</p>
                    <p className="text-muted font-size-sm">{profileData.address}</p>
                    <Button variant="primary">Follow</Button>{' '}
                    <Button variant="outline-primary">Message</Button>
                  </div>
                  {isEditing && (
                    <div className="mt-3">
                      <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>

            {/* Profile Info */}
            <div className="col-md-8">
              <Card className="mb-3">
                <Card.Body>
                  {isEditing ? (
                    <Form onSubmit={handleUpdateProfile}>
                      <Row className="mb-3">
                        <Col sm={3}>
                          <Form.Label>Full Name</Form.Label>
                        </Col>
                        <Col sm={9}>
                          <Form.Control
                            type="text"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={3}>
                          <Form.Label>Email</Form.Label>
                        </Col>
                        <Col sm={9}>
                          <Form.Control
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={3}>
                          <Form.Label>Phone Number</Form.Label>
                        </Col>
                        <Col sm={9}>
                          <Form.Control
                            type="text"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={3}>
                          <Form.Label>Address</Form.Label>
                        </Col>
                        <Col sm={9}>
                          <Form.Control
                            type="text"
                            value={profileData.address}
                            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={3}>
                          <Form.Label>Bio</Form.Label>
                        </Col>
                        <Col sm={9}>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={profileData.bio}
                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          />
                        </Col>
                      </Row>
                      <Button variant="info" type="submit">
                        Save Changes
                      </Button>
                    </Form>
                  ) : (
                    <>
                      <Row className="mb-3">
                        <Col sm={3}>
                          <h6 className="mb-0">Full Name</h6>
                        </Col>
                        <Col sm={9} className="text-secondary">
                          {profileData.name}
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={3}>
                          <h6 className="mb-0">Email</h6>
                        </Col>
                        <Col sm={9} className="text-secondary">
                          {profileData.email}
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={3}>
                          <h6 className="mb-0">Phone Number</h6>
                        </Col>
                        <Col sm={9} className="text-secondary">
                          {profileData.phone}
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={3}>
                          <h6 className="mb-0">Address</h6>
                        </Col>
                        <Col sm={9} className="text-secondary">
                          {profileData.address}
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={3}>
                          <h6 className="mb-0">Bio</h6>
                        </Col>
                        <Col sm={9} className="text-secondary">
                          {profileData.bio}
                        </Col>
                      </Row>
                      <Button
                        variant="info"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3">
        <Container>
          <p>Profile Management &copy; 2024</p>
        </Container>
      </footer>
    </div>
  );
}

export default Profile;
