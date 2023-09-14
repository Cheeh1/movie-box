import React from "react";
import twitter from '../assets/icons/fa-brands_twitter.svg'
import instagram from '../assets/icons/fa-brands_instagram.png'
import youtube from '../assets/icons/fa-brands_youtube.svg'
import facebook from '../assets/icons/fa-brands_facebook-square.svg'

const Footer = () => {
    return (
        <>
            <footer className="mt-20 mb-16 flex flex-col justify-center items-center gap-5 font-DmSans">
                <div className="flex justify-center items-center gap-5 lg:gap-10">
                    <img className="cursor-pointer" src={facebook} alt="facebook-logo" />
                    <img className="cursor-pointer" src={instagram} alt="instagram-logo" />
                    <img className="cursor-pointer" src={twitter} alt="twitter-logo" />
                    <img className="cursor-pointer" src={youtube} alt="youtube-logo" />
                </div>
                <div className="flex justify-center gap-5 lg:gap-10 text-gray-900 text-sm font-semibold">
                    <p className="cursor-pointer">Conditions of Use</p>
                    <p className="cursor-pointer">Privacy & Policy</p>
                    <p className="cursor-pointer">Press Room</p>
                </div>
                <div className="text-gray-500 text-sm font-semibold">
                    <p>© 2021 MovieBox by Adriana Eka Prayudha  </p>
                </div>
            </footer>
        </>
    )
}
export default Footer