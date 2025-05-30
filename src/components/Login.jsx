import React from 'react'
import {Logo, Button, Input} from './index'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'


function Login() {

    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const login = async(data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if(session){
                const userData = await authService.getCurrentUser();
                dispatch(authLogin(userData));
                navigate('/');
            }
            
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-indigo-100 shadow-lg`}>
            <div className="mb-2 flex justify-center">
                <span>
                    <Logo/>
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">Don't have any account?&nbsp;
                <Link to = '/signup'>
                    Sign Up
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input 
                    label = "Email :"
                    placeholder = "Email Address"
                    type = "email"

                    {...register("email", {
                        required : true,
                        validate : {
                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 
                            "Email address must be a valid address",
                        }
                    })}
                    />

                    <Input
                    label = "Password :"
                    placeholder = "Password"
                    type = "password"
                    
                    {...register("password", {
                        required : true,
                    })}
                    />

                    <Button
                    type = "Submit"
                    className="w-full"
                    >
                        Sign in
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login