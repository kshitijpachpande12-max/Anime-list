import React, { useEffect, useState } from 'react';
import {LoaderIcon, Search} from 'lucide-react';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import Animenotfound from '../components/Animenotfound';
import Navbar from '../components/Navbar.jsx';
import SearchResult from '../components/SearchResult.jsx';

const SearchAnime = () => {
  const [name,setName]  = useState("");
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState([]);

  const fetch = async ()=>{
    if (!name.trim()) {
      setResult([]);
      return;
      }
    try {
      setLoading(true);
      const resposne = await api.get(`Anime-list/search/${encodeURIComponent(name)}`);
      setResult(resposne.data);
    } catch (error) {
      toast.error("Error in fetching anime");
      console.log(error);
    }finally{
      setLoading(false);
    }
  }


  if(loading){
      return(
        <div className='min-h-screen bg-base-200 flex items-center justify-center'>
          <LoaderIcon className='animate-spin size-10'/>
        </div>
      )
    }

  return (
    <div className='bg-base-200 min-h-screen'>
      <Navbar/>
      <div className='form-control flex flex-row justify-center mt-10 mb-10 px-10'>
        <input className='input input-bordered text-center text-3xl max-w-70' placeholder='Search' value = {name} onChange={(e)=>{setName(e.target.value)}}/>
        <label>
        <button type='submit' className='btn btn-ghost ' onClick={()=>{fetch()}}><Search/></button>
        </label>
      </div>
      {result.length === 0 && <Animenotfound/>}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {result.map((anime)=>{
          return <SearchResult anime={anime}/>
        })}
      </div>
    </div>
  )
}

export default SearchAnime
