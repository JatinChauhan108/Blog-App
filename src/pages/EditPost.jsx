import React, { useEffect, useState } from 'react'
import {PostForm, Container} from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import services from '../appwrite/otherServices';

function EditPost() {

  const {slug} = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    if(slug){
      services.getDocument(slug)
      .then((post) => {
        if(post) setPost(post);
      })
    }

    else{
      navigate('/')
    }
  }, [slug, navigate])

  return (
    post ? 
    (<div className='py-8'>
      <Container>
        <PostForm post = {post}/>
      </Container>
    </div>) : null
  )
}

export default EditPost