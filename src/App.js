import SignUp from "./components/SignUp";
import LogIn from './components/LogIn'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "./components/MainPage";
import FavouritesStored from "./components/FavouritesStored";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/main' element={<MainPage />} />
                <Route path='/favorites/:id' element={<FavouritesStored />} />
            </Routes>
        </Router>
    )
}

export default App;