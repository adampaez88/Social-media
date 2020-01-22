import React from 'react'
import ChatRoom from './ChatRoom'
import Post from './Post'

function AllPosts({posts, likePost, deleteClick}){

    const sortByName = (a, b) => { 
        if(a.content > b.content){ 
            return 1;        
        }        
        if(a.content < b.content){            
            return -1;        
        }        
        return 0;    
    };

    const eachPost = posts.sort(sortByName).map(post => {
        return  <Post deleteClick={deleteClick} sortByName={sortByName} likePost={likePost} post={post} />
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