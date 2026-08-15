import React from 'react';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import {Link} from 'react-router';
import {Star , Trash2Icon} from 'lucide-react';

const Animecard = ({anime,setAnimes}) => {
    const HandleDelete = async (e,id)=>{
        e.preventDefault();
        if(!window.confirm("Are you sure you want to remove this anime from your list")) return;
        try{
            await api.delete(`Anime-list/${id}`);
            setAnimes((prev) => prev.filter((anime) => anime._id !== id));
            toast.success("Anime removed from the list");
        }catch(error){
            toast.error("Failed to remove Anime");
            console.error(error);
        }
        
    }
  return (
    <Link to={`/anime/${anime._id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#26c568]'>
        <figure>
        <img src={anime.img} alt = {anime.title} className='w-full h-60 object-cover'/>
        </figure>
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{anime.title}</h3>
            <span className='text-base-content/70 line-clamp-3'>{anime.synopsis}</span>
            <div className='flex justify-between'><div className='flex gap-3 text-primary text-lg'><Star/> {anime.rating}</div>
                <div>
                    <button className='btn btn-ghost btn-xs text-error ' onClick={(e) => HandleDelete(e,anime._id)}>
                        <Trash2Icon className='size-4'/>
                    </button>
                </div>
            </div>
        </div>
            
    </Link>
  )
}

export default Animecard
