import React, {useState, useEffect} from 'react';

import {Link} from 'react-router-dom';

import '../sass/UsersAccountFeed.scss';

import axios from 'axios';
import UserAccount from './UserAccount';

export default function UsersAccountFeed(props) {

    const [accounts, setAccount]= useState([]);

    useEffect(() => {
        axios
        .get('/api/accounts')
        .then(res => {
            console.log(res);
            setAccount(res.data);
        })
        .catch(err => console.log('Get_Error:', err));
    }, []);


    return (
        <div>
            {accounts.map((account) => {
              return  <Link key={account.id} to={`/users-account/${account.id}`}>
                            <UserAccount accountInfo={account}/>
                      </Link> 
            })}
        </div>
    )
}
