import React, { Component } from 'react'

export default class PostForm extends Component {

    state = {
        image_url: '',
        content: ''
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        // event.preventDefault()
        this.props.addPost(this.state)
        this.setState({
            image_url: '',
            content: ''
        })
        this.props.handleClick()
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>Picture: </label>
                    <input 
                          placeholder='Picture'
                          type='text'
                          name='image_url'
                          onChange={this.handleChange}
                          value={this.state.image_url}
                          required
                    />
                    <label> Content: </label>
                    <input 
                          placeholder='Content'
                          type='text'
                          name='content'
                          onChange={this.handleChange}
                          value={this.state.content}
                          required
                    />
                    <input type='submit' ></input>
                </form>
            </>
        )
    }
}

