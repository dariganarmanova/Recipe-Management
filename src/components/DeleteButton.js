import axios from 'axios';
import React from 'react'

const DeleteButton = ({ recipe, onDelete }) => {
    const handleDelete = async () => {
        const token = localStorage.getItem('token')
        try {
            const result = await axios.delete('http://localhost:5005/api/favorites/delete', {
                data: { id: recipe._id, userId: recipe.userId },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (result) {
                alert('Successfuly deleted!')
                if (onDelete) onDelete(recipe)
            } else {
                alert("Error happened")
                console.log(result)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default DeleteButton
