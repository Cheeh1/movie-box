import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MovieList from '../components/MovieList'
import MovieDetails from '../components/MovieDetails'
import PopularMovie from '../components/PopularMovie'
import RatedMovie from '../components/RatedMovie'
import UpcomingMovie from '../components/UpcomingMovie'
import Errorpage from '../components/Errorpage'

const RouterLink = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<MovieList />} />
                    <Route path='/movies/:id' element={<MovieDetails />} />
                    <Route path='/popular' element={<PopularMovie />} />
                    <Route path='/rated' element={<RatedMovie />} />
                    <Route path='/upcoming' element={<UpcomingMovie />} />
                    <Route path='*' element={<Errorpage />} />
                </Routes>
            </Router>
        </>
    )
}
export default RouterLink