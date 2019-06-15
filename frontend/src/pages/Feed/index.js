import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import io from 'socket.io-client'

import './Feed.css';


import more from "../../assets/more.svg";
import like from "../../assets/like.svg";
import comment from "../../assets/comment.svg";
import send from "../../assets/send.svg";

function Feed() {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    async function fectchPosts() {
      const res = await api.get('/posts');
      const posts = res.data
      setPosts(posts)
    }
    fectchPosts();
  }, [])

  let socket = null;

  useEffect(function registerToSocket() {
    if(socket) socket.disconnect();
    console.log('socket')
    const newSocket = io('http://localhost:3000');

    newSocket.on('post', newPost => {
      setPosts([newPost, ...posts])
    });
    
    newSocket.on('like', likedPost => {
      setPosts(posts.map(post => 
        post._id === likedPost._id ? likedPost : post 
        ));
    });

    socket = newSocket;
  }, [ posts ])

  function handleLike(id) {
    api.post(`/posts/${id}/like`);
  }
  
  return (
    <section id="post-list">
      {posts.map(post =>(
        <article key={post._id}>
        <header>
          <div className="user-info">
            <span>{post.author}</span>
            <span className="place">{post.place}</span>
          </div>
          <img src={more} alt="Mais"/>
        </header>

        <img src={`http://localhost:3000/files/${post.image}`} alt=""/>

        <footer>
          <div className="actions">
            <button type="button" onClick={() => handleLike(post._id)}>
              <img src={like} alt=""/>
            </button>
            <img src={comment} alt=""/>
            <img src={send} alt=""/>
          </div>

          <strong>{post.likes} {`curtida${post.likes !== 1 ? "s":""}`}</strong>

          <p>
            {post.description}
            <span>{post.hashtags}</span>
          </p>

        </footer>
      </article>
      ))}
    </section>
  )
}

export default Feed;