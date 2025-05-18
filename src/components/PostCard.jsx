import React from 'react'
import { Link } from 'react-router-dom'
import services from '../appwrite/otherServices'

function PostCard({
    $id, title, featuredImage
}) {
  return (
    <Link to = {`/post/${$id}`}>
        <div className='w-full bg-white rounded-xl p-4 border border-indigo-100 shadow-md hover:shadow-lg transition-shadow duration-200'>
            <div className='w-full justify-center mb-4'>
                <img src={services.filePreview(featuredImage)} alt={title}
                className='rounded-xl' />
            </div>
            <h2
            className='text-xl font-bold'>
            {title}</h2>
        </div>
    </Link>
  )
}

export default PostCard