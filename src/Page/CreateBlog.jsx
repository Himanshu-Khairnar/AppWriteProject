import React, { useEffect } from 'react'
import BlogForm from '../components/BlogForm'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

export default function CreateBlog() {
  const navigate = useNavigate()
  const userData = useSelector((state) => state.authSlice.userData) ;
  
  useEffect(()=>{
      if (userData === null) navigate("/login");
  },[userData])

  return (
    <div>
      <BlogForm data={null} type={"create"}/>
    </div>
  )
}
