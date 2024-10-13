import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the update logic here, e.g., making API call to update settings
    console.log('Settings updated:', settings);
    alert('Settings updated successfully!');
  };

  return (
    <div>
      <h3>Settings</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmailNotifications" className="mt-3">
          <Form.Check
            type="checkbox"
            label="Enable Email Notifications"
            checked={settings.emailNotifications}
            onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Update Settings
        </Button>
      </Form>
    </div>
  );
}

export default Settings;
