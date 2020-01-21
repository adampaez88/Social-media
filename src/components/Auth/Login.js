import React, { Component } from 'react'
import Auth from './Auth'
import './Auth.css'

export default class Login extends Component {

    state = {
        isClicked: false,
        show: false,
        signUp: false,
        login: false
    }

    showSignUp = (event) => {
        this.setState({
            signUp: !this.state.signUp
        })
    }

    showLogin = (event) => {
        this.setState({
            login: !this.state.login
        })
    }

    handleClick = () => {
        this.setState({
            show: !this.state.show
        })
    }
    
render(){
    const {toggleLogin} = this.props
    const {show, signUp, login} = this.state
    return (
        <div>
            <h1>Social Alumni</h1>
            <div className='header-items'>
                <button className='auth-buttons' onClick={this.showLogin}>Login</button>
                <button className='auth-buttons' onClick={this.showSignUp}>Sign up</button>
                {login ? <Auth toggleLogin={toggleLogin} showLogin={this.state.login}/> : null}
                {signUp ? <Auth toggleLogin={toggleLogin} showSignUp={this.state.signUp}/> : null}
            </div>
            
        </div>
    )
}
   
}
