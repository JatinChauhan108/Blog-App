import React from 'react'
import { login } from '../store/authSlice'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import {Logo, Button, Input} from './index'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'


function Signup() {

    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const create = async(data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if(userData){
                const userData = await authService.getCurrentUser();
                dispatch(login(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-indigo-100 shadow-lg`}>
            <div className="mb-2 flex justify-center"> 
                <span className="inline-block w-full max-w-[100px]">
                    <Logo/>
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link to = '/login' 
                className="font-medium text-primary transition-all duration-200 hover:underline">
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p> }
            <form onSubmit = {handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input 
                    label = "Full Name :"
                    placeholder = "Full Name"
                    {...register("name", {required : true})}
                    />

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
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup