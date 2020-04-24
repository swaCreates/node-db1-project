import React from 'react'

// import {useParams} from 'react-router-dom';

// import axios from 'axios';

export default function UserAccount(props) {

    console.log('Props: ', props);

    // const del= (id) =>{
    //     axios.delete(`/api/accounts/${id}`)
    //     .then(res => {
    //         console.log(res);
    //     })
    //     .catch(err => console.log('Error del:', err));
    // }

    return (
        <div>
            <div className='acc-card'>
                <h2>Account Name: {props.accountInfo.name}</h2>
                <p>Budget Amount: {`$${props.accountInfo.budget}`}</p>
                {/* <button onClick={del}>Delete</button> */}
            </div>  
        </div>
    )
}
