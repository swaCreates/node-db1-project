import React from 'react'

// import {useParams} from 'react-router-dom';

export default function UserAccount(props) {

    const {name, budget}= props.accountInfo;

    console.log(props);

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
                <h2>Account Name: {name}</h2>
                <p>Budget Amount: {`$${budget}`}</p>
                {/* <button onClick={del}>Delete</button> */}
            </div>  
        </div>
    )
}
