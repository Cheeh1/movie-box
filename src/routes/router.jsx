import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const Homepage = lazy(() => import('../pages/Homepage'))
const MovieDetails = lazy(() => import('../pages/MovieDetails'))
const Errorpage = lazy(() => import('../pages/Errorpage'))

const RouterLink = () => {
    return (
        <>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path='/' element={<Homepage />} />
                        <Route path='/movies/:id' element={<MovieDetails />} />
                        <Route path='*' element={<Errorpage />} />
                    </Routes>
                </Suspense>
            </Router>
        </>
    )
}
export default RouterLink