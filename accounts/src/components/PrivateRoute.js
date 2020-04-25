import React from 'react';

import {Route, Redirect} from 'react-router-dom';

import fakeAuth from '../auth.js';


const PrivateRoute= ({component: Component, ...rest}) => {


    return (
        <Route
         {...rest}
         render={props => {
             if(fakeAuth.isAuthenticated === true){
                 return <Component {...props} />
             } else{
                 return <Redirect to='/' component={alert('You must be logged in')} />
             }
         }} 
        />
    )
}

export default PrivateRoute;