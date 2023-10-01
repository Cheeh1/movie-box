import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import MovieDetails from '../pages/MovieDetails'
import PopularMovie from '../pages/PopularMovie'
import Errorpage from '../pages/Errorpage'

const RouterLink = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/movies/:id' element={<MovieDetails />} />
                    <Route path='/popular' element={<PopularMovie />} />
                    <Route path='*' element={<Errorpage />} />
                </Routes>
            </Router>
        </>
    )
}
export default RouterLink