import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({
    children,
    authentication = true,
}) {

    const authStatus = useSelector(state => state.status)
    const navigate = useNavigate()
    const [loader, setLoader] = useState()

    useEffect(() => {
        if(authentication && !authStatus){
            navigate('/login')
        } else if(!authentication && authStatus){
            navigate('/')
        }
        setLoader(false)
    }, [authentication, authStatus, navigate])
    
    return loader ? <h1 className='text-2xl font-bold'>Loading...</h1> : <>{children}</>
}