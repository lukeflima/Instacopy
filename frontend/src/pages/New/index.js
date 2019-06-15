import React, { useState } from 'react';

import api from '../../services/api'

import './New.css';

function New(props) {
  const [image, setImage] = useState(null)
  const [author, setAuthor] = useState('')
  const [place, setPlace] = useState('')
  const [description, setDescription] = useState('')
  const [hashtags, setHashtags] = useState('')

  async function sendPost(e) {
    e.preventDefault();

    const post = new FormData();
    
    post.append('author', author);
    post.append('place', place);
    post.append('description', description);
    post.append('hashtags', hashtags);
    post.append('image', image);

    await api.post('/posts', post);

    props.history.push('/');
  }

  function handleImage(event) {
    setImage(event.target.files[0]);
  }

  return (
    <form onSubmit={sendPost} id="new-post">
      <input 
        type="file"
        onChange={handleImage}
      />

      <input 
        type="text"
        name="author"
        placeholder="Autor do post"
        value={author}
        onChange={e => handleChange(e, setAuthor)}/>

      <input 
        type="text"
        name="place"
        placeholder="Local do post"
        value={place}
        onChange={e => handleChange(e, setPlace)}/>
      
      <input 
        type="text"
        name="description"
        placeholder="Descrição do post"
        value={description}
        onChange={e => handleChange(e, setDescription)}/>

      <input 
        type="text"
        name="hashtags"
        placeholder="Hashtags do post"
        value={hashtags}
        onChange={e => handleChange(e, setHashtags)}/>

        <button type="submit">Enviar</button>
    </form>
  );
}

function handleChange(event, setValue) {
  setValue(event.target.value);
}



export default New;