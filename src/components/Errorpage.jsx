import React from 'react'
import home from '../assets/icons/Home.png'     
import { Link } from 'react-router-dom'
import error from '../assets/images/404-error.jpg'

const Errorpage = () => {
    return (
        <>
            <main>
                <Link to="/" className="flex absolute top-5 left-5 items-center gap-2 text-[#666] text-xl hover:text-[#BE123C] cursor-pointer font-bold">
                    <img className='w-10' src={home} alt="home-logo" />
                    <p>Home</p>
                </Link>
                <img src={error} alt="error-img" />
            </main>
        </>
    )
}
export default Errorpage