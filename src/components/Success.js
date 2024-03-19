// Success.js
import React from 'react';
import './Success.css';

const Success = ({ firstName, lastName, email, fact }) => {
  return (
    <div className='success'>
      <h2>Congratulations, your info is registered.</h2>
      <div className='details'>
        <p>First Name: <span className='name'>{firstName}</span></p>
        <p>Last Name: <span className='name'>{lastName}</span></p>
        <p>Email: <span className='name'>{email}</span></p>
      </div>
      <div className='fun_fact'>
        <p>Here’s a fact for you:</p>
        <p className='name'>{fact}</p>
      </div>
    </div>
  );
};

export default Success;

