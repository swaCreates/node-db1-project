import React, {useState} from 'react'

import axios from 'axios';

import fakeAuth from '../auth.js';

import '../sass/AddAccount.scss';

export default function AddAccount(props) {

  const [newAccount, setNewAccount]= useState({
    name: '',
    budget: null
  });

  const handleChanges= evt => {
    console.log(newAccount);
    setNewAccount({
        ...newAccount,
        [evt.target.name]: evt.target.value
    })
  }

  const handleSubmit= evt => {
    evt.preventDefault();

    setNewAccount({
      name: '',
      budget: null,
    })

    axios
    .post('/api/accounts', newAccount)
    .then(res => {
      console.log('success', res);
      props.history.push('/users-account');
    })
    .catch(err => console.log('Error: ', err));
  }

  const home= () => {
    if(fakeAuth.isAuthenticated === true){
      fakeAuth.login(() => {
        props.history.push('/users-account');
      });
    };
  };

  return (
      <div>
        <div className='home'>
          <button onClick={home}>Accounts</button>
        </div>
        <form onSubmit={handleSubmit}>
          <input 
            onChange={handleChanges}
            placeholder='enter name'
            name='name'
            type='text'
            value={newAccount.name}
          />
          <input 
            onChange={handleChanges}
            placeholder='enter budget'
            name='budget'
            type='number'
            value={newAccount.budget}
          />
          <button type='submit'>Add Account</button>
        </form>
      </div>
  )
}
