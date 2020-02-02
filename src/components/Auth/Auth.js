import React, { Component } from 'react';
import Login from "./Login"
import RegisterModal from "./RegisterModal"
//import './Login.css'

class Auth extends Component {
    render() {
        return (

            <div className="auth">
                <Login {...this.props}/>
                <RegisterModal className="registerbtn" {...this.props}/>
            </div>

        )
    }
}

export default Auth