import React from 'react'
import ChatRoom from './ChatRoom'
import Post from './Post'

function AllPosts({posts}){

    const eachPost = posts.map(post => {
        return  <Post post={post} />
    })

    return(
        <div>
            <h1 className='news-feed'>News Feed</h1>
            <div className='post-div'>
                <div className='news-feed-container'>
                    {eachPost}
                </div>
                    <aside>
                        <ChatRoom />
                    </aside>
            </div>
        </div>
       
    )
}
export default AllPosts;