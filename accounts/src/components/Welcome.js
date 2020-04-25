import React from 'react';
import '../sass/Welcome.scss';

import fakeAuth from '../auth.js';


import {Link} from 'react-router-dom';

export default function Welcome(props) {

    const authenticate= () =>{
        fakeAuth.login(() => {
            props.history.push('/users-account');
        })
    }

    return (
        <div>
            <section>
                <div className='intro-content'>
                <p>
                    This app is a mock up app in development for an accounting company. As the testing developer, please run through this program and test if everything is in working order.
                </p>
                <p className='para-two'>
                    Thank you.
                </p>
                </div>
                <div className='btn-div'>
                    <Link to='/users-account'>
                        <button className='acc-db'>Account Database</button>
                        <button className='login' onClick={authenticate}>Log in</button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
