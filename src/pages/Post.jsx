import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import services from '../appwrite/otherServices'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import { Container, Button } from '../components'

function Post() {

  const {slug} = useParams()
  const [post, setPost] = useState(null)  
  const navigate = useNavigate()

  const userData = useSelector((state) => state.userData)
  console.log("This is ",userData);
  
  const isAuthor = (post && userData) ? userData.$id === post.userId : false

  useEffect(() => {
    if(slug){
      services.getDocument(slug)
      .then((post) => {
        setPost(post)
      })  
    }

    else{
      navigate('/')
    }
  }, [slug, navigate])

  const deletePost = () => {
    services.deletePost(post.$id)
    .then((status) => {
      if(status){
        services.deleteFile(post.featuredImage)
        navigate('/')
      }
    })
  }

  return (
    post ?
    (<div className='py-8'>
        <Container>
          <div className='w-full relative border-white border py-2 rounded-xl flex justify-center mb-2'>
            <img src={services.filePreview(post.featuredImage)} alt= {post.title} className='rounded-xl'/>
            {isAuthor ? 
            <div className='absolute top-3 right-6'>
              <Link to = {`/edit-post/${post.$id}`}>
                <Button bgColor='bg-green-500' className='m-2'>Edit</Button>
              </Link>
              <Button bgColor='bg-red-500' onClick = {deletePost}>Delete</Button>
            </div> : null
            }
          </div>
          <div className='mb-6 font-bold text-2xl'>
            <h1>{post.title}</h1>
          </div>
          <div className='browser-css'>
           {parse(post.content)}
          </div>
        </Container>
    </div>) : null
  ) 
}

export default Post 