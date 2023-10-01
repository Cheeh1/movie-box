import { Link } from 'react-router-dom'
import error from '../assets/images/404-error.jpg'

const Errorpage = () => {
    return (
        <>
            <main>
                <Link to="/" className="flex absolute top-5 left-5 items-center gap-2 text-gray-800 text-xl cursor-pointer font-bold">
                    <i className="fa-solid fa-house"></i>
                    <p>Home</p>
                </Link>
                <img className='my-40' src={error} alt="error-img" />
            </main>
        </>
    )
}
export default Errorpage