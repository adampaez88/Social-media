import React, { Component } from 'react'

export default class Comments extends Component{

    state = {
        content: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.addComment(this.state)
        this.setState({
            content: ''
        })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    
    render(){
        const {comments, show, handleClick} = this.props
        const eachComment = comments.map(comment => {
            return( 
               <li className='a-comment'>{comment.content}</li>
            )
        })
        return (
            <div className='comments-div'>
    
                <button onClick={handleClick}>Add Comment</button>
                <form style={{visibility: show ? "visible" : "hidden"}} 
                    onSubmit={this.handleSubmit}
                >
                    <input
                        type='text' value={this.state.content}
                        name='content' placeholder='Comment'
                        onChange={this.handleChange} required
                    />
                    <input type='submit' className='comment-submit'/>
                </form>
                <ul>
                    {eachComment}
                </ul>
            </div>
        )
    }
   
}
