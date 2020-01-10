import React, { Component } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import AllPosts from './components/AllPosts'
import 'font-awesome/css/font-awesome.min.css'
import './App.css';

class App extends Component{

  state = {
    posts: []
  }

  componentDidMount(){
    fetch('http://localhost:8000/posts')
      .then(response => response.json())
      .then(postsData => this.setState({
        posts: postsData
      }))
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
  
  render(){
    return (
      <div className="App">
        <header>
          <Header addPost={this.addPost} />
        </header>
  
        <div>
          <AllPosts posts={this.state.posts}/>
        </div> 
  
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
export default App;