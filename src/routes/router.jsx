import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MovieList from '../components/MovieList'
import MovieDetails from '../components/MovieDetails'

const RouterLink = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<MovieList />} />
                    <Route path='/movies/:id' element={<MovieDetails />} />
                </Routes>
            </Router>

        </>
    )
}
export default RouterLink