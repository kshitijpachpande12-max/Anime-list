import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import {Link} from 'react-router';
import { LoaderIcon, ArrowLeftIcon, Trash2Icon, Star } from "lucide-react";

const AnimeDetail = () => {

  const [anime,setAnime] = useState(null);
  const [saving,setSaving] = useState(false);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    const fetchAnime = async ()=>{
      try {
        const res = await api.get(`Anime-list/${id}`);
        setAnime(res.data);
      } catch (error) {
        toast.error("Error in fetching anime");
      } finally{
        setLoading(false);
      }
    }
    fetchAnime();
  },[id]);

  const handleDelete = async ()=>{
    if(!window.confirm("Are you sure you want to remove this anime from your list?")) return;
    try {
      await api.delete(`/Anime-list/${id}`);
      toast.success("Anime removed successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error in removing the anime");
      console.log(error);
    }
  };

  const handleSave = async ()=>{
    try {
      setSaving(true);
      await api.put(`/Anime-list/${id}`,anime);
      toast.success("Rating updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Cannot update the rating");
      console.log(error);
    }finally{
      setSaving(false);
    }
  };

  if(loading){
    return(
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10'/>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8 max-w-2xl'>
        <div className='flex items-center justify-between mb-6'>
          <Link to={"/"} className='btn btn-ghost'>
            <ArrowLeftIcon className='h-5 w-5'/>
            Back to your list
          </Link>
          <button onClick={handleDelete} className='btn btn-error btn-outline'>
            <Trash2Icon className='h-5 w-5'/>
            Remove anime
          </button>
        </div>
        <div className="card bg-base-100">
          <div className="card-body">
            <div className='form-control mb-4'>
              <figure>
                <img src={anime.img} alt = {anime.title} className='w-full h-60 object-cover align-top'/>
              </figure>
              <label className='label'>
                <span className='label-text font-bold text-4xl mt-3'>{anime.title}</span>
              </label>
            </div>
            <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-slate-400 text-sm">{anime.synopsis}</span>
                </label>
            </div>
            <div className='form-control mb-4'>
              <label className='label'>
                <span className='flex gap-4 font-bold'>Rating <Star/></span>
              </label>
              <input type='Number' className='input input-bordered' value={anime.rating} placeholder='rating' onChange={(e)=> setAnime({...anime, rating: e.target.value})}/>
            </div>
            <div className="card-actions justify-end">
              <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                {saving ? "saving..." : "save changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimeDetail
