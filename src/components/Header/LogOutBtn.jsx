import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import AuthService from '../../appwrite/auth'
export default function LogOutBtn() {
     const dispatch = useDispatch();
     const handleLogout = async () => {
       await AuthService.logout();
       dispatch(logout());
     };
  return (
   
   <button className='inline-block px-6 py-6 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
  )
}
