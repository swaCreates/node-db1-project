import React from 'react';
import '../sass/Welcome.scss';

import {Link} from 'react-router-dom';

export default function Welcome() {
    return (
        <div>
            <section>
                <div className='intro-content'>
                <p>
                    This app is a mock up app in development for a company. As the testing developer, please run through this program and test if everything is in working order.
                </p>
                <p className='para-two'>
                    Thank you.
                </p>
                </div>
                <div className='btn-div'>
                    <Link to='/accounts'>
                        <button>Account Database</button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
