import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import services from '../appwrite/otherServices';
import { useState } from 'react';
import { PostCard, Container } from '../components';

function Home() {

  const isLoggedIn = useSelector(state => (state.status));

  const [posts, setPosts] = useState([])

  useEffect(() => {
    services.getDocuments([]).then((res) => {
      setPosts(res.documents);
      console.log(posts);
    })
    
  }, [])
  
  

  return (
    isLoggedIn ? (
      <div className='w-full py-8'>
        <Container>
          <div className='flex flex-wrap'>
            {posts.map((post) => (
              <div key={post.$id} className='w-1/4 p-2'>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>

      </div>) : 
      (<div className='w-full py-8 text-center mt-4'>
        <Container>
          <h1 className='font-bold hover:text-gray-500 text-2xl'>
            Login to read posts
          </h1>
        </Container>
      </div>)
  )
}

export default Home