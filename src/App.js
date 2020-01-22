import React, { Component } from 'react';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AllPosts from './components/AllPosts'
import Login from './components/Auth/Login'
import 'font-awesome/css/font-awesome.min.css'
import './App.css';

class App extends Component{

  state = {
    posts: [],
    isLoggedIn: false,
    users: [],
    filteredUsers: [],
    search: ''
  }

  componentDidMount(){
    this.toggleLogin()
    fetch('http://localhost:8000/posts')
      .then(response => response.json())
      .then(posts => this.setState({posts}))

    fetch('http://localhost:8000/users')
      .then(response => response.json())
      .then(this.userState)
  }

  toggleLogin = () => {
    if (localStorage.token !== 'undefined' && localStorage.token){
      this.setState({isLoggedIn: true})
    }
  }

  toggleLogout = () => {
    if (localStorage.token){
      this.setState({isLoggedIn: false})
    }
  }

  userState = (users) => {
    this.setState({
      users: users,
      filteredUsers: users
    })
  }

  updateSearch = (searchTerm) => {
    this.setState({
      search: searchTerm
    })
    this.nameFilter(searchTerm)
  }

  nameFilter = (searchTerm) => {
    const filteredUsers = this.state.users.filter(user => {
      return user.username.toLowerCase().includes(searchTerm.toLowerCase())
    })
    this.setState({filteredUsers})
  }

  addPost = (post) => {
    const {posts} = this.state 
    const user = {username: localStorage.getItem('username')}
    post.user = user
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
        'user_id': localStorage.user_id
      })
    })
  }

  deleteClick = (id) => {
    const aPost = this.state.posts.find(post => {
        return post.id === id
    })
    if (aPost.user_id === +localStorage.user_id){
        const posts = this.state.posts.filter(post => {
            return post.id !== id
        })
        this.setState({
            posts
        })  
        fetch(`http://localhost:8000/posts/${id}`, {
            method: 'DELETE'
        })
    }
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
    const {isLoggedIn, search, users, filteredUsers} = this.state
    return (
      <div className="App">

        {isLoggedIn ?
          <>
            <header>
              <Header 
                toggleLogout={this.toggleLogout} addPost={this.addPost}
                nameFilter={this.nameFilter} updateSearch={this.updateSearch}
              />
            </header>

            <div className='main-container'>
              <AllPosts 
                user_id={this.state.user_id} likePost={this.likePost} posts={this.state.posts}
                users={search ? filteredUsers : users} deleteClick={this.deleteClick}
              />
            </div> 
      
            <footer className='footer-container'>
              <Footer />
            </footer>
          </>
        : <Login toggleLogin={this.toggleLogin} /> }
      </div>
    );
  }
}
export default App;