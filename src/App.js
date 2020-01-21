import React, { Component } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import AllPosts from './components/AllPosts'
import Login from './components/Login'
import 'font-awesome/css/font-awesome.min.css'
import './App.css';

class App extends Component{

  state = {
    posts: [],
    isLoggedIn: false
  }

  componentDidMount(){
    fetch('http://localhost:8000/posts')
      .then(response => response.json())
      .then(postsData => this.setState({
        posts: postsData
      }))
  }

  toggleLogin = () => {
    const {isLoggedIn} = this.state
    this.setState({isLoggedIn: !isLoggedIn})
  }

  addPost = (post) => {
    const {posts} = this.state 
    this.setState({
      posts: [...posts, post]
    })
    
    fetch('http://localhost:8000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'image_url': post.image_url,
        'content': post.content,
        'user_id': 1
      })
    })
  }

  likePost = (id) => {
    const likedPost = this.state.posts.find(post => {
        return post.id === id
    })
    this.setState({
        likedPost
    })
    let count = likedPost.like += 1
    fetch(`http://localhost:8000/posts/${likedPost.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'like': count})
    })
  }
  
  render(){
    const {isLoggedIn} = this.state
    return (
      <div className="App">

        {isLoggedIn ?
          <>
            <header>
              <Header addPost={this.addPost} />
            </header>

            <div>
              <AllPosts user_id={this.state.user_id} likePost={this.likePost} posts={this.state.posts}/>
            </div> 
      
            <footer>
              <Footer />
            </footer>
          </>
        : <Login toggleLogin={this.toggleLogin} /> }
      </div>
    );
  }
}
export default App;