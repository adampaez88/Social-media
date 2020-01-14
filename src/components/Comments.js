import React, { Component } from 'react'

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
            'content': comment.content,
            'post_id': this.props.post.id,
            'user_id': 1,
            'like': comment.like
          })
        })
        .then(response => response.json())
        .then(comment => {
            this.setState({comments: [...this.state.comments, comment]})
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.addComment(this.state)
        this.setState({
            content: ''
        })
    }

    // likeClick = () => {
    //     this.state.comments.map(comment => {
    //         let count = comment.like += 1
    //         fetch(`http://localhost:8000/comments/${comment.id}`, {
    //             method: 'POST',
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stringify({'like': count})
    //         })
    //     })
    // }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    deleteClick = (id) => {
        const urComment = this.state.comments.find(comment => {
            return comment.id === id
        })
        if (this.props.post.user_id === urComment.user_id){
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

    eachComment = () => {
        return this.filterComments().map(comment => {
            return( 
                <div className='comment-list'>
                 <li className='a-comment'>{comment.content}</li>
                 <div>
                    <button>Likes: {comment.like}</button>
                    <button onClick={() => this.deleteClick(comment.id)}>Delete</button>
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
                    onSubmit={this.handleSubmit}
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