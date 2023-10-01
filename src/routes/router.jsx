import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import MovieDetails from '../pages/MovieDetails'
import Errorpage from '../pages/Errorpage'

const RouterLink = () => {
    return (
        <>
            <Router>
                    <Routes>
                        <Route path='/' element={<Homepage />} />
                        <Route path='/movies/:id' element={<MovieDetails />} />
                        <Route path='*' element={<Errorpage />} />
                    </Routes>
            </Router>
        </>
    )
}
export default RouterLink