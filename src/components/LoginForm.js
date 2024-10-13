import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

function LoginForm({ setLoggedInUser }) {
  const [isOldUser, setIsOldUser] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    userid: '',
    email: '',
    phone: '',
    password: '',
    showPassword: false,
  });
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordConditions, setPasswordConditions] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const [errors, setErrors] = useState({});
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: '',
    username: '',
    phone: '',
  });

  // Open Forgot Password Modal
  const handleForgotPassword = () => {
    setShowForgotPasswordModal(true);
  };

  // Close Forgot Password Modal
  const handleCloseForgotPassword = () => {
    setShowForgotPasswordModal(false);
  };

  // Handle input field changes for the main form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'password') {
      validatePassword(e.target.value);
    }
  };


  // Toggle show/hide password
  const handleShowPassword = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation and strength calculation
  const validatePassword = (password) => {
    const conditions = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    };
    setPasswordConditions(conditions);
    const fulfilledConditions = Object.values(conditions).filter(Boolean).length;
    if (password === '') {
      setPasswordStrength('');
    } else if (fulfilledConditions <= 1) {
      setPasswordStrength('Low');
    } else if (fulfilledConditions === 2 || fulfilledConditions === 3) {
      setPasswordStrength('Fair');
    } else if (fulfilledConditions === 4) {
      setPasswordStrength('Good');
    }
  };

  // Handle form submission (Login/Register)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isOldUser && (!formData.name || !formData.userid || !formData.phone || !formData.email || !formData.password)) {
      setErrors({ form: 'Please fill in all fields.' });
      return;
    }

    const emailValid = validateEmail(formData.email);
    if (!emailValid) {
      setErrors({ email: 'Please enter a valid email address.' });
      return;
    }

    const url = isOldUser ? 'http://localhost:5000/login' : 'http://localhost:5000/register';

    axios.post(url, formData)
      .then(response => {
        console.log('User unique ID:', response.data.user_unique_id);
        setLoggedInUser(response.data); // Pass the entire response to App.js
        alert(isOldUser ? 'Logged in successfully!' : 'Registered successfully!');
      })
      .catch(error => {
        console.error('Error during login/register:', error.response?.data);
        setErrors({ server: error.response?.data?.error || 'An error occurred' });
      });
  };

  // Handle input field changes in the Forgot Password form
  const handleForgotPasswordChange = (e) => {
    setForgotPasswordData({
      ...forgotPasswordData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Forgot Password form submission
  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();

    // API call to send a password reset link
    axios.post('http://localhost:5000/forgot-password', forgotPasswordData)
      .then(response => {
        console.log('Reset password email sent:', response.data);
        alert('Password reset link has been sent to your email.');
        setShowForgotPasswordModal(false); // Close the modal after success
      })
      .catch(error => {
        console.error('Error sending password reset email:', error.response?.data);
        alert('Error sending password reset link.');
      });
  };

  return (
    <div className="container my-5">
      <div className="row align-items-center">
        {/* Left Image Section */}
        <div className="col-md-6">
          <img src="images/undraw_remotely_2j6y.svg" alt="Login Visual" className="img-fluid" />
        </div>

        {/* Right Form Section */}
        <div className="col-md-6">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow-lg p-4">
                <h3 className="mb-4 text-center">{isOldUser ? 'Login' : 'Sign Up'}</h3>
                <p className="text-center mb-4">
                  Welcome! {isOldUser ? 'Please log in to your account' : 'Create a new account.'}
                </p>

                <form onSubmit={handleSubmit}>
                  {/* Error display */}
                  {errors.server && <div className="alert alert-danger">{errors.server}</div>}

                  {/* New User Fields */}
                  {!isOldUser && (
                    <>
                      <div className="form-group mb-3">
                        <label>Enter Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-control"
                          required={!isOldUser}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label>Enter User ID</label>
                        <input
                          type="text"
                          name="userid"
                          value={formData.userid}
                          onChange={handleChange}
                          className="form-control"
                          required={!isOldUser}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label>Enter Phone Number</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-control"
                          required={!isOldUser}
                        />
                      </div>
                    </>
                  )}

                  {/* Common Fields */}
                  <div className="form-group mb-3">
                    <label>Enter Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="form-group mb-3">
                    <label>Enter Password</label>
                    <input
                      type={formData.showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <div className="form-check mt-2">
                      <input
                        type="checkbox"
                        checked={formData.showPassword}
                        onChange={handleShowPassword}
                        className="form-check-input"
                      />
                      <label className="form-check-label ms-2">Show Password</label>
                    </div>

                    {/* Password Strength & Conditions */}
                    <ul className="mt-3" style={{ listStyleType: 'none', padding: 0 }}>
                      <li style={{ color: passwordConditions.length ? 'green' : 'red' }}>At least 8 characters</li>
                      <li style={{ color: passwordConditions.uppercase ? 'green' : 'red' }}>At least 1 uppercase letter</li>
                      <li style={{ color: passwordConditions.number ? 'green' : 'red' }}>At least 1 number</li>
                      <li style={{ color: passwordConditions.specialChar ? 'green' : 'red' }}>
                        At least 1 special character (!@#$%^&*)
                      </li>
                    </ul>

                    {/* Password Strength Bar */}
                    {formData.password && (
                      <div className="progress mt-3">
                        <div
                          className={`progress-bar ${passwordStrength === 'Low' ? 'bg-danger' : passwordStrength === 'Fair' ? 'bg-warning' : 'bg-success'
                            }`}
                          role="progressbar"
                          style={{ width: `${passwordStrength === 'Low' ? 33 : passwordStrength === 'Fair' ? 66 : 100}%` }}
                          aria-valuenow={passwordStrength === 'Low' ? 33 : passwordStrength === 'Fair' ? 66 : 100}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    )}
                    {formData.password && <small>Password Strength: {passwordStrength}</small>}
                  </div>

                  <button type="submit" className="btn btn-block btn-primary">
                    {isOldUser ? 'Login' : 'Register'}
                  </button>
                </form>

                <div className="d-flex justify-content-between mt-4">
                  <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" /> Remember me
                  </label>
                  <button className="btn btn-link p-0 forgot-pass" onClick={handleForgotPassword}>
                    Forgot Password?
                  </button>
                </div>

                <p className="text-center mt-4">
                  {isOldUser ? 'New user?' : 'Already registered?'}{' '}
                  <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setIsOldUser(!isOldUser)}>
                    {isOldUser ? 'Sign Up' : 'Login'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal show={showForgotPasswordModal} onHide={handleCloseForgotPassword}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleForgotPasswordSubmit}>
            <div className="form-group mb-3">
              <label>Enter Username or Email or Phone</label>
              <input
                type="text"
                name="username"
                value={forgotPasswordData.username}
                onChange={handleForgotPasswordChange}
                className="form-control"
                required
              />
            </div>
            <Button variant="primary" type="submit" className="w-100">
              Send Reset Link
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LoginForm;
