import React, { Component } from 'react'
import './Comments.css'

export default class Comments extends Component{

    state = {
        comments: [],
        content: ''
    }

    componentDidMount(){
        fetch('http://localhost:8000/comments')
            .then(response => response.json())
            .then(commentsData => this.setState({
                comments: commentsData
            }))
    }

    filterComments = () => {
        return this.state.comments.filter(comment => {
            return comment.post_id === this.props.post.id
        })
    }

    addComment = (comment) => {
        fetch('http://localhost:8000/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'content': comment,
            'post_id': this.props.post.id,
            'user_id': localStorage.user_id,
            'like': 0
          })
        })
        .then(response => response.json())
        .then(comment => {this.setState({comments: [...this.state.comments, comment]})})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.addComment(this.state.content) 
        this.setState({
            content: ''
        })
    }

    likeClick = (id) => {
        const likedComment = this.state.comments.find(comment => {
            return comment.id === id
        })
        this.setState({
            likedComment
        })
        let count = likedComment.like += 1
        fetch(`http://localhost:8000/comments/${likedComment.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'like': count})
        })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    deleteClick = (id) => {
        const aComment = this.state.comments.find(comment => {
            return comment.id === id
        })
        if (aComment.user_id === +localStorage.user_id){
            const comments = this.state.comments.filter(comment => {
                return comment.id !== id
            })
            this.setState({
                comments
            })  
            fetch(`http://localhost:8000/comments/${id}`, {
                method: 'DELETE'
            })
        }
    }

    displayName = (comment) => {
        if (comment.user){
            return comment.user.username
        } else {
            return localStorage.username
        }
    }

    eachComment = () => {
        return this.filterComments().sort(this.props.sortByName).map(comment => {

            return( 
                <div className='comment-list'>
                    <li className='a-comment'>{this.displayName(comment)}: {comment.content}</li>
                 <div>
                    <button onClick={() => this.likeClick(comment.id)}><i className="fa fa-star"></i> {comment.like}</button>
                    <button onClick={() => this.deleteClick(comment.id)}><i className="fa fa-trash"></i></button>
                 </div>
               </div>
            )
        })
    }
    
    render(){
        const {show, handleClick} = this.props
        return (
            <div className='comments-div'>
    
                <button onClick={handleClick}>Comments</button>
                <form style={{visibility: show ? "visible" : "hidden"}} 
                    onSubmit={this.handleSubmit} className='comments-form'
                >
                    <input
                        type='text' value={this.state.content}
                        name='content' placeholder='Add Comment'
                        onChange={this.handleChange} required
                    />
                    <input type='submit' className='comment-submit'/>
                </form>
                <ul style={{display: show ? 'block' : 'none'}}>
                    {this.eachComment()}
                </ul>
            </div>
        )
    }
}