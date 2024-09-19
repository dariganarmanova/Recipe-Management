import axios from 'axios';
import React from 'react'

const DeleteButton = () => {
    const handleDelete = async (recipe) => {
        const token = localStorage.getItem('token')
        try {
            const result = axios.delete('http://localhost:5000/api/favorites/delete', { recipe }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (result) {
                alert('Successfuly deleted!')
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
