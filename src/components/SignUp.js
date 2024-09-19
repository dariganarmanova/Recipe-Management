import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5005/api/signup', { email, password })
            if (response.data.token) {
                alert('Signed up successfully!')
                localStorage.setItem('token', response.data.token)
                navigate('/main')
            } else {
                console.log(response.data.token)
                console.log('trouble signing up')
            }
        } catch (error) {
            alert('Trouble signing up')
            console.log(error)
        }
    }
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <p className='font-semibold mb-10 text-2xl'>Sign In</p>
                <input
                    className='p-2 mb-3 bg-slate-100 font-sans rounded-lg border-2 border-slate-400 focus:outline-none'
                    type='text'
                    required
                    value={email || ''}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className='p-2 mb-3 bg-slate-100 font-sans rounded-lg border-2 border-slate-400 focus:outline-none'
                    type='password'
                    required
                    value={password || ''}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="flex justify-center p-1 rounded-md border-2 bg-zinc-100 mt-3">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
