import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import services from '../../appwrite/otherServices'
import {Input, RTE, Select, Button} from '../index'


function PostForm({post}) {

    const {register, handleSubmit, control, getValues, setValue, watch} = useForm({
      defaultValues : {
        title : post?.title || '',
        slug : post?.$id || '',
        content : post?.content || '',
        status : post?.status || 'active',
      }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.userData)

    const submit = async (data) => {
      if(post){
        const file = data.image[0] ? await services.uploadFile(data.image[0]) : null;

        if(file){
          const deleteFile = await services.deleteFile(post.featuredImage)
        }

        const dbPost = await services.updatePost(post.$id, {
          ...data, featuredImage : file ? file.$id : post.featuredImage
        })

        if(dbPost){
          navigate(`/post/${dbPost.$id}`)
        }
      } else{
        const file = await services.uploadFile(data.image[0]);

        if(file){
          data.featuredImage = file.$id

          const dbPost = await services.createPost({...data, userId : userData.$id})

          if(dbPost) navigate(`/post/${dbPost.$id}`);
        }
      }
    }

    const slugTransform = useCallback((value) => {
      if(value && typeof value == "string") {
        return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d]/g, '-')
      }

      return "";
    }, [])

    useEffect(() => {
      const subscription = watch((value, {name}) => {
        if(name === 'title'){
          setValue("slug", slugTransform(value.title), {shouldValidate : true})
        }
      })

      return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue])

    console.log(watch('content'));
    


  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input 
          label = 'Title :'
          placeholder = "Title"
          className="mb-4"
          {...register('title',{required : true})}
        />
        <Input 
          label = "Slug :"
          placeholder = "Slug"
          className="mb-4"
          {...register('slug',{required : true})} 
        />
        <RTE 
          name = 'content'
          label = "Content :"
          control = {control}
          defaultValue = {getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input 
          label = "Featured Image :"
          type = "file"
          className="mb-4"
          accept = "image/png, image/jpg, image/jpeg, image/gif"
          {...register('image',{required : !post})}
        />
        {post && (
          <div className="w-full mb-4">
            <img 
              src = {services.filePreview(post.featuredImage)} 
              alt = {post.title}
              className="rounded-lg"
            />
          </div>
          )
        }
        <Select 
          label = "Status :"
          options = {["active", "inactive"]}
          className="mb-4"
          {...register('status',{required : true})}
        />
        <Button type = "submit" bgColor= {post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm