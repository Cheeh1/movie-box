import React from "react";
import tv from '../assets/icons/tv.png'
import menu from '../assets/icons/menu.png'
import play from '../assets/icons/play.png'
import imdb from '../assets/icons/imdb.png'
import berry from '../assets/icons/berry.png'

const Header = () => {
    return (
        <>
        <main className="font-DmSans bg-[url('assets/images/poster.png')] bg-cover bg-center">  
            <nav className="flex justify-between px-5 xl:px-10 items-center py-5">
                <div className="flex items-center gap-5">
                    <img className="w-[40px]" src={tv} alt="tv-logo" />
                    <p className="text-gray-100 text-xl font-bold">MovieBox</p>
                </div>

                <div>
                    <input className="hidden xl:block bg-transparent w-96 py-1 px-3 border rounded-md placeholder:text-gray-100 placeholder:text-[12px]" type="text" name="search" id="search" placeholder="What do you want to watch?" />
                </div>

                <div className="flex items-center gap-5">
                    <p className="text-gray-100 text-md font-medium">Sign in</p>
                    <img className="w-[30px]" src={menu} alt="menu-logo"/>
                </div>
            </nav>

            <section className="py-28 px-10 flex flex-col justify-center gap-3">
                <p className="text-gray-100 w-60 text-3xl font-bold tracking-wider font-DmSans">John Wick 3 : Parabellum</p>

                <div className="flex items-center gap-5">
                    <div className="flex gap-2 text-gray-100 text-[12px]">
                        <img src={imdb} alt="imdb-logo"/>
                        <p>86.0/100</p>
                    </div>
                    <div className="flex gap-2 text-gray-100 text-[12px]">
                        <img src={berry} alt="berry-logo"/>
                        <p>97%</p>
                    </div>
                </div>

                <p className="text-gray-100 w-72 text-sm">John Wick is on the run after killing a member of the international assassins' guild,
                 and with a $14 million price tag on his head, he is the target of hit men and women everywhere.</p>

                <div className="flex items-center justify-center rounded-md gap-2 py-1 w-[150px] bg-red-700">
                    <img src={play} alt="play-logo"/>
                    <button className="text-gray-100 text-sm ">WATCH TRAILER</button>
                </div>
            </section>
            </main>
        </>
    )
}
export default Header