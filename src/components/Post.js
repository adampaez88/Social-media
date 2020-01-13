import React, { Component } from 'react'
import Comments from './Comments'
import 'font-awesome/css/font-awesome.min.css'

export default class Post extends Component{

    state = {
        show: false
    }

    handleClick = () => {
        this.setState({
            show: !this.state.show
        })
    }

    render(){
        const {post} = this.props
        return (
            <div className='a-post' >
                <img src={post.image_url}/>
                <div className='post-buttons'>
                    <button>likes:{post.like}</button> 
                </div>
                <h1>{post.content}</h1>
                <div>
                <Comments 
                    show={this.state.show} handleClick={this.handleClick} post={post}
                />
                </div>
            </div>
        )
    }
    
}