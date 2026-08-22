import React, { useState } from 'react';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import {Link, useNavigate} from 'react-router';
import {PlusIcon, Sparkle} from 'lucide-react';

const Animecard = ({anime}) => {
    const [display,setDisplay] = useState(false);
    const [rating,setRating] = useState();

    const navigate = useNavigate();

    const handleAdd = async ()=>{
        try {
            await api.post("/Anime-list",{
                title: anime.attributes.titles?.en || anime.attributes.canonicalTitle,
                synopsis: anime.attributes.synopsis,
                img: anime.attributes.posterImage.medium,
                rating: rating
            })
            toast.success("Added");
            navigate("/");
        } catch (error) {
            toast.error("Error adding anime");
            console.log(error);
        }
    }

    const handleWatchlist = async ()=>{
        try {
            await api.post("/Anime-list/watchlist",{
                title: anime.attributes.titles?.en || anime.attributes.canonicalTitle,
                synopsis: anime.attributes.synopsis,
                img: anime.attributes.posterImage.medium,
                rating: rating
            })
            toast.success("Added");
            navigate("/");
        } catch (error) {
            toast.error("Error adding anime");
            console.log(error);
        }
    }

  return (
    <div className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#26c568]'>
        <figure>
        <img src={anime.attributes.posterImage.medium} alt = {anime.attributes.titles?.en ||
anime.attributes.canonicalTitle} className='w-full h-60 object-cover'/>
        </figure>
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{anime.attributes.titles?.en ||
anime.attributes.canonicalTitle}</h3>
            <span className='text-base-content/70 line-clamp-3'>{anime.attributes.synopsis}</span>
        </div>
        <button className='btn btn-ghost' onClick={()=>{setDisplay(true)}}>
            <PlusIcon/>
            Add to the list
        </button>
        {display && (<div className='flex justify-center flex-row bg-base-100 mt-6'>
            <input type = "Number" className='input input-bordered' min={0} max={10} value={rating} onChange={(e)=> setRating(e.target.value)}/>
            <button className='btn btn-ghost mx-6 text-2xl' onClick={handleAdd}>Rate</button>
            </div>
            )}
        <button className='btn btn-ghost mx-6'  onClick={handleWatchlist}>
            <Sparkle/>
            Add to watchlist
        </button>
    </div>
  )
}

export default Animecard
