import React, { Component } from 'react'
import PostForm from '../PostForm'
import Filter from './Filter'
import Auth from '../Auth/Auth'
import './Header.css'
import logo from './omg.png'

class Header extends Component{

    state = {
        isClicked: false,
        show: false,
        signUp: false,
        login: false
    }

    logout = (event) => {
        this.props.toggleLogout()
        localStorage.clear()
    }

    handleClick = () => {
        this.setState({
            show: !this.state.show
        })
    }

    render(){
        const {show} = this.state
        return(
            <div className='header-div'>
                <div>
                    <img src={logo} className='logo' />
                </div>

                <div className='header-items'>
                    <button className='header-buttons' onClick={this.handleClick}>
                        {show ? 'Close' : 'Add Post'}
                    </button>
                </div>

                <div style={{visibility: show ? "visible" : "hidden"}} className='form-div' >
                    <PostForm handleClick={this.handleClick} addPost={this.props.addPost}/>
                </div>

                <div>
                    <Filter updateSearch={this.props.updateSearch} />
                   
                </div>

                <div className='header-items'>
                    <button className='logout-button' onClick={this.logout}>Logout</button>
                </div>
            </div>
        )
    }
}

export default Header;