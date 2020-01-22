import React, { Component } from 'react'
import Auth from './Auth'
import './Auth.css'

export default class Login extends Component {

    state = {
        isClicked: false,
        signUp: false,
        login: false
    }

    showSignUp = (event) => {
        this.setState({
            signUp: !this.state.signUp,
            login: false
        })
    }

    showLogin = (event) => {
        this.setState({
            login: !this.state.login,
            signUp: false
        })
    }
    
    render(){
        const {toggleLogin} = this.props
        const {signUp, login} = this.state
        return (
            <div className='auth-button-container'>
                <div>
                    <h1 className='login-page-h1'>Alumni Social</h1>
                </div>

                <div className='login-logout'>
                    <div className='auth-buttons'>
                        <button className='auth-button' onClick={this.showLogin}>Login</button>
                        <button className='auth-button' onClick={this.showSignUp}>Sign up</button>
                    </div>

                    <div className='auth-forms' >
                        {login ? <Auth toggleLogin={toggleLogin} showLogin={this.state.login}/> : null}
                    </div>

                    <div className='signup-form'>
                        {signUp ? <Auth toggleLogin={toggleLogin} showSignUp={this.state.signUp}/> : null}
                    </div>
                </div>
            </div>
        )
    }
}