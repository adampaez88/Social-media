import React, { Component } from 'react'
import PostForm from './PostForm'

class Header extends Component{

    state = {
        isClicked: false,
        show: false
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

                <form className='header-items'>
                    <input type='text' placeholder='search'/>
                    <i type='submit' className='fa fa-search'></i>
                </form>

                <div className='header-items'>
                    <button className='header-buttons' onClick={this.handleClick}>
                        {show ? 'Close' : 'Add Post'}
                    </button>
                </div>

                <div style={{visibility: show ? "visible" : "hidden"}} className='form-div' >
                    <PostForm handleClick={this.handleClick} addPost={this.props.addPost}/>
                </div>

                <div className='header-items'>
                    <button className='header-buttons'>Login</button>
                    <button className='header-buttons'>Sign Up</button>
                </div>
            </div>
        )
    }
}

export default Header;