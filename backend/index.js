const express = require('express')
const mongoose = require('mongoose');
const connectDB = require('./mongoose');
require('dotenv').config();
const app = express();
const userRoute = require("./routes/signup")
const cors = require('cors')
const loginRoute = require('./routes/login')
const recipeRoute = require('./routes/favour')
const favoriteRoute = require('./routes/favourGet')
const deleteRoute = require('./routes/deleteFavour')
app.use(cors())
const port = process.env.PORT || 5005

app.use(express.json());
connectDB();
app.use('/api/signup', userRoute)
app.use('/api/login', loginRoute)
app.use('/api/favorites', recipeRoute)
app.use('/api/favorites', favoriteRoute)
app.use('/api/favorites', deleteRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});