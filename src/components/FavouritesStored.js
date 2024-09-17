import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Favorites = ({ recipe }) => {
    return (
        <div className='flex flex-col justify-start items-center w-full'>
            <div className='w-full max-w-lg'>
                <h3 className='text-xl font-sans mb-3 mt-3'>{recipe.label}</h3>
                <ul className='text-lg font-urbanist rounded-lg border-2 border-gray-300 p-3'>
                    {recipe.ingredientLines.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const FavouritesStored = () => {
    const userId = localStorage.getItem('userId')
    const [favorites, setFavorites] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5005/api/favorites/get/${userId}`)
                console.log(response.data)
                setFavorites(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [userId])

    return (
        <div className='flex flex-col justify-start items-center'>
            <h1 className='mt-16 text-3xl font-sans mb-10'>Your favorites</h1>
            {favorites.map((favorite, index) => (
                <Favorites key={index} recipe={favorite} />
            ))}
        </div>
    )
}

export default FavouritesStored;
