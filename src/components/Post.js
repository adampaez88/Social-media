import React, { Component } from 'react'
import Comments from './Comments'
import 'font-awesome/css/font-awesome.min.css'

export default class Post extends Component{

    state = {
        show: false,
        users: []
    }

    componentDidMount(){
        fetch('http://localhost:8000/users')
        .then(response => response.json())
        .then(userData => this.setState({
            users: userData
        }))
    }

    handleClick = () => {
        this.setState({
            show: !this.state.show
        })
    }

    render(){
        const users = this.state.users.map(user => {
            if (user.id === this.props.post.user_id){
                return user.username
            }
        }) 

        const {post, sortByName} = this.props
        return (
            <div className='a-post' >
                <h1>User: {users}</h1>
                <img src={post.image_url}/>
                <div className='post-buttons'>
                    <button onClick={ () => this.props.likePost(post.id)}><i class="fa fa-thumbs-up"></i> {post.like}</button> 
                </div>
                <h1>{post.content}</h1>
                <div>
                <Comments 
                    show={this.state.show} handleClick={this.handleClick} 
                    post={post} sortByName={sortByName} user={this.state.users}
                />
                </div>
            </div>
        )
    }
    
}