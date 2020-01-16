import React from 'react'

export default function Auth({showLogin, showSignUp}) {

    const signUp = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const email = formData.get('email')
        const username = formData.get('username')
        const password = formData.get('password')

        fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(stashToken => {
            localStorage.setItem('token', stashToken.token)
        })
        event.target.reset()
    }

    const userLogin = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const username = formData.get('username')
        const password = formData.get('password')

        fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(stashToken => {
            localStorage.setItem('token', stashToken.token)
        })
        event.target.reset()
    }

    return (
        <div>
            {showSignUp
                   ? <form onSubmit={signUp}>
                    <label>Email: </label>
                    <input type='text' name='email' placeholder='Email' required />
                    <label>Username: </label>
                    <input type='text' name='username' placeholder='Username' required />
                    <label>Password: </label>
                    <input type='password' name='password' placeholder='Password' required/>
                    <input type='submit' value='submit' />
                </form>
                : null
            }
            {showLogin
                ? <form onSubmit={userLogin}>
                    <label>Username: </label>
                    <input type='text' name='username' placeholder='Username' required />
                    <label>Password: </label>
                    <input type='password' name='password' placeholder='Password' required/>
                    <input type='submit' value='submit'  />
                </form>
                : null
            }

        </div>
    )
}
