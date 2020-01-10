import React from 'react'
import 'font-awesome/css/font-awesome.min.css'

export default function Post({post}) {
    return (
        <div className='a-post' >
            <img src={post.image_url} alt='some photo'/>
            <div className='post-buttons'>
                <button>likes:{post.like}</button> 
                <button>dislikes: {post.dislike}</button>
            </div>
            <h1>{post.content}</h1>
        </div>
    )
}