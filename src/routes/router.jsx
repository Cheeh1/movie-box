import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import MovieDetails from '../pages/MovieDetails'
import Errorpage from '../pages/Errorpage'
import Favorites from '../pages/Favorites'


const RouterLink = () => {
    return (
        <>
            <Router>
                    <Routes>
                        <Route exact path='/' element={<Homepage />} />
                        <Route path='/movies/:id' element={<MovieDetails />} />
                        <Route path='/favorites' element={<Favorites />} />
                        <Route path='*' element={<Errorpage />} />                      
                    </Routes>
            </Router>
        </>
    )
}
export default RouterLink