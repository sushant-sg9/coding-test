// Step2.js
import React, { useState } from 'react';
import './Step2.css';

const Step2 = ({ onSubmit, onChange, firstName, lastName, email, loading }) => {
  const [emailError, setEmailError] = useState('');
  const containsNumbers = (input) => {
    return /\d/.test(input);
  };

  const handleFirstNameChange = (event) => {
    const inputValue = event.target.value;
    if (!containsNumbers(inputValue)) {
      onChange('firstName', inputValue);
    }
  };

  const handleLastNameChange = (event) => {
    const inputValue = event.target.value;
    if (!containsNumbers(inputValue)) {
      onChange('lastName', inputValue);
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    onChange('email', emailValue);
    if (emailValue.trim() === '') {
      setEmailError('Email is required');
    } else if (!validateEmail(emailValue)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="step2">
      <div className='fName_lName'>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={handleFirstNameChange} 
          />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
      </div>
      <div className="inputContainer">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={handleEmailChange} 
        />
        {emailError && <div className="emailError">{emailError}</div>}
      </div>
      <div className="buttonContainer">
        <button onClick={onSubmit} disabled={!firstName || !lastName || !email || emailError || loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default Step2;
