import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return { auth: state.auth }
}

const ProtectedRoute = ({ component: Component, auth: { token }, ...rest }) => {
    console.log("token: ", token);
    return <Route { ...rest } render={ props => token ? <Component { ...props }/> : <Redirect to="/login"/> } />
};

export default connect(mapStateToProps)(ProtectedRoute);