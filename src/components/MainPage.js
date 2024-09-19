import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
    const [query, setQuery] = useState('')
    const [recipes, setRecipes] = useState([])
    const [favorites, setFavorites] = useState([])
    const navigate = useNavigate()

    const fetchData = async (e) => {
        e.preventDefault();
        const apid = 'c20ccf6a'
        const apikey = '970e9c80c7836f5ab10914bd148c34b7'
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${apid}&app_key=${apikey}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setRecipes(response.data.hits)
            setQuery('')
        } catch (error) {
            console.log(error)
        }
    }

    const handleReaction = async (recipe) => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post('http://localhost:5005/api/favorites', { recipe }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setFavorites((prevFavorites) => [...prevFavorites, recipe])
            navigate('/favorites')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col mt-20  items-center'>
            <form onSubmit={fetchData} className='relative w-full max-w-md'>
                <input
                    className='p-3 rounded-md pr-12 border-neutral-300 border-2 w-96 focus:outline-none hover:border-neutral-400'
                    placeholder='Search for a recipe'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type='submit' className='absolute right-0 top-0 h-full px-4 bg-blue-500 text-white rounded-r-md'>Submit</button>
            </form>

            <div className='mt-10 w-full max-w-md '>
                {recipes.map((recipe, index) => (
                    <div key={index}>
                        <h2 className='font-sans text-xl mb-3 mt-3'>{recipe.recipe.label}</h2>
                        <ul className='font-urbanist text-lg rounded-lg p-3 border-2 border-gray-300'>
                            {recipe.recipe.ingredientLines.map((ingredient, idx) => (
                                <li key={idx}>{ingredient}</li>
                            ))}
                        </ul>
                        <button onClick={() => handleReaction(recipe)} className='p-1 rounded-lg mt-3 mb-3 bg-slate-300 border-2'>Add to Favourites</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MainPage
