import React from "react";
import twitter from '../assets/icons/fa-brands_twitter.svg'
import instagram from '../assets/icons/fa-brands_instagram.png'
import youtube from '../assets/icons/fa-brands_youtube.svg'
import facebook from '../assets/icons/fa-brands_facebook-square.svg'

const Footer = () => {
    return (
        <>
            <footer className="mt-32 mb-10 flex flex-col justify-center items-center gap-5">
                <div className="flex justify-center items-center gap-5 xl:gap-10">
                    <img src={facebook} alt="facebook-logo" />
                    <img src={instagram} alt="instagram-logo" />
                    <img src={twitter} alt="twitter-logo" />
                    <img src={youtube} alt="youtube-logo" />
                </div>
                <div className="flex justify-center gap-5 xl:gap-10 text-gray-900 text-sm font-semibold">
                    <p>Conditions of Use</p>
                    <p>Privacy & Policy</p>
                    <p>Press Room</p>
                </div>
                <div className="text-gray-500 text-sm font-semibold">
                    <p>© 2021 MovieBox by Adriana Eka Prayudha  </p>
                </div>
            </footer>
        </>
    )
}
export default Footer