import React, { Component } from 'react'
import Comments from './Comments'
import 'font-awesome/css/font-awesome.min.css'

export default class Post extends Component{

    state = {
        comments: [],
        show: false
    }

    componentDidMount(){
        fetch('http://localhost:8000/comments')
            .then(response => response.json())
            .then(commentsData => this.setState({
                comments: commentsData
            }))
    }

    addComment = (comment) => {
        const {comments} = this.state 
        this.setState({
          comments: [...comments, comment]
        })
        fetch('http://localhost:8000/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'content': comment.content,
            'post_id': this.props.post.id,
            'user_id': 1
          })
        })
    }

    handleClick = () => {
        this.setState({
            show: !this.state.show
        })
    }

    filterComments = () => {
        return this.state.comments.filter(comment => {
            return comment.post_id === this.props.post.id
        })
    }

    render(){
        const {post} = this.props
        return (
            <div className='a-post' >
                <img src={post.image_url}/>
                <div className='post-buttons'>
                    <button>likes:{post.like}</button> 
                    <button>dislikes: {post.dislike}</button>
                </div>
                <h1>{post.content}</h1>
                <div>
                <Comments 
                    show={this.state.show} handleClick={this.handleClick} 
                    comments={this.filterComments()} addComment={this.addComment}
                />
                </div>
            </div>
        )
    }
    
}