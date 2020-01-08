import React, { Component } from 'react'

class Header extends Component{

    state = {
        isClicked: false
    }


    render(){
        return(
            <div className='header'>

                <div>
                    <input type='text' />
                </div>

                <div>
                    <button>New Post</button>
                </div>

                <div>
                    <button>Login</button>
                    <button>Sign Up</button>
                </div>
            </div>
        )
    }
}

export default Header;