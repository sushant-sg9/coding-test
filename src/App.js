import React, { useState } from 'react';
import './App.css';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Success from './components/Success';

function App() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fact, setFact] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'image/png') {
      setFile(selectedFile);
      setFileError('');
    } else {
      setFile(null);
      setFileError('Please upload a PNG file.');
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      fetchCatFact();
    }, 2000);
  };

  const fetchCatFact = async () => {
    const response = await fetch('https://catfact.ninja/fact');
    const data = await response.json();
    setFact(data.fact);
  };

  const handleNext = () => {
    if (step === 1 && file) {
      setStep(2);
    } else if (step === 2 && firstName && lastName && email) {
      handleSubmit();
    }
  };

  const handleChange = (field, value) => {
    const setters = {
      firstName: setFirstName,
      lastName: setLastName,
      email: setEmail,
    };

    const setter = setters[field];
    if (setter) {
      setter(value);
    }
  };
  const totalSteps = 3;
  const progress = ((step - 1) / (totalSteps - 1)) * 100;
  return (
    <div className="container">
      <div className="tabs">
        <div className={`tab ${step === 1 ? 'active' : ''}`}>Step 1</div>
        <div className={`tab ${step === 2 ? 'active' : ''}`}>Step 2</div>
        <div className={`tab ${step === 3 ? 'active' : ''}`}>Success</div>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      {step === 1 && (
        <Step1 onNext={handleNext} onFileChange={handleFileChange} fileError={fileError} />
      )}
      {step === 2 && (
        <Step2
          onSubmit={handleSubmit}
          onChange={handleChange}
          firstName={firstName}
          lastName={lastName}
          email={email}
          loading={loading}
        />
      )}
      {step === 3 && <Success firstName={firstName} lastName={lastName} email={email} fact={fact} />}
    </div>
  );
}

export default App;