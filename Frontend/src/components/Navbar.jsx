import React from 'react'
import { Link } from 'react-router'
import {Search, Sparkle} from "lucide-react"

const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
    <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
            <Link to={"/watchlist"} className='btn btn-primary'>
                <Sparkle/>
                <span className='text-2xl'>Watchlist</span>
            </Link>
            <Link to={"/"}>
            <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>Anime List</h1> </Link>
            <div className='flex items-center gap-4'>
                <Link to={"/search"} className='btn btn-primary'>
                    <Search className="size-5" />
                    <span>Search</span>
                </Link>
            </div>
        </div>

    </div>
    </header>
  )
}

export default Navbar
