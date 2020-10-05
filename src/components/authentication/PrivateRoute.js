import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../main/Header';

const PrivateRoute = ({component: Component, ...rest}) => {
    return(
        <Route 
            {...rest}
            render={props => 
                localStorage.getItem('token') ? (
                    <>
                        <Header />
                        <Component {...props} />
                    </>
                ) : ( 
                    <Redirect to='/login' />
                )}
        />
    )
}

export default PrivateRoute;