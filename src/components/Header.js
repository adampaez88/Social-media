import React, { Component } from 'react'
import PostForm from './PostForm'
import Auth from './Auth/Auth'

class Header extends Component{

    state = {
        isClicked: false,
        show: false,
        signUp: false,
        login: false
    }

    // showSignUp = (event) => {
    //     this.setState({
    //         signUp: !this.state.signUp
    //     })
    // }

    // showLogin = (event) => {
    //     this.setState({
    //         login: !this.state.login
    //     })
    // }

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
        const {show, signUp, login} = this.state
        return(
            <div className='header-div'>
                <div className='header-items'>
                    <button className='header-buttons' onClick={this.handleClick}>
                        {show ? 'Close' : 'Add Post'}
                    </button>
                </div>

                <div style={{visibility: show ? "visible" : "hidden"}} className='form-div' >
                    <PostForm handleClick={this.handleClick} addPost={this.props.addPost}/>
                </div>

                <form className='header-items'>
                    <input type='text' placeholder='search'/>
                    <i type='submit' className='fa fa-search'></i>
                </form>

                <div className='header-items'>
                    {/* <button onClick={this.showLogin}>Login</button> */}
                    {/* <button onClick={this.showSignUp}>Sign up</button> */}
                    <button onClick={this.logout}>Logout</button>
                    {/* {login ? <Auth  showLogin={this.state.login}/> : null} */}
                    {/* {signUp ? <Auth showSignUp={this.state.signUp}/> : null} */}
                </div>
            </div>
        )
    }
}

export default Header;