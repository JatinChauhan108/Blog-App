import React, { useEffect, useState } from 'react'
import services from '../appwrite/otherServices';
import { PostCard, Container } from '../components';

function AllPosts() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    services.getDocuments()
    .then((posts) => {
      if(posts) setPosts(posts.documents);
    })
  }, [])

  return (
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

    </div>
  )
}

export default AllPosts