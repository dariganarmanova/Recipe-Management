import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'

const LogIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5005/api/login', { email, password })
            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
                navigate('/main')
            } else {
                alert("You are not signed in")
            }

        } catch (error) {
            console.err(error)
        }
    }
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <p className='font-semibold mb-10 text-2xl'>Login</p>
                <input
                    className='p-2 mb-3 bg-slate-100 font-sans rounded-lg border-2 border-slate-400 focus:outline-none'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                />
                <input
                    className='p-2 mb-3 bg-slate-100 font-sans rounded-lg border-2 border-slate-400 focus:outline-none'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                />
                <button className="flex justify-center p-1 rounded-md border-2 bg-zinc-100 mt-3">Log In</button>
            </form >
        </div >
    )
}

export default LogIn
