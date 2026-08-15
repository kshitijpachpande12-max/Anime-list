import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar.jsx';
import Animenotfound from '../components/Animenotfound.jsx';
import Animecard from '../components/Animecard.jsx';

const HomePage = () => {
  const [loading,setLoading] = useState(true);
  const [animes,setAnimes] = useState([]);

  useEffect(()=>{
    const fetch = async () => {
      try {
        const res = await api.get("/Anime-list");
        setAnimes(res.data);
      } catch (error) {
        console.log("error finding Animes");
        toast.error("Error in finding animes");
      } finally{
        setLoading(false);
      }
    };
    fetch();
  },[])

  return (
    <div className='min-h-screen'>
      <Navbar/>

      <div className='mx-auto p-4 mt-6 max-w-7xl'>
        {loading && <div className='text-center text-primary py-10 text-3xl font-bold'>Loading...</div>}
        {animes.length === 0 && !loading && <Animenotfound/>}
        {animes.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {animes.map((anime) => (
              <Animecard key={anime._id} anime={anime} setAnimes={setAnimes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
