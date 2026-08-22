import React, { useEffect, useState } from 'react';
import { LoaderIcon } from 'lucide-react';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import Animenotfound from '../components/Animenotfound';
import Navbar from '../components/Navbar.jsx';
import WatchResult from '../components/WatchResult.jsx';

const Watchlist = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);

      const res = await api.get('/Anime-list/watchlist');

      setResult(res.data);
    } catch (error) {
      toast.error("Error in fetching anime");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    );
  }

  return (
    <div className='bg-base-200 min-h-screen'>
      <Navbar />

      {result.length === 0 && <Animenotfound />}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {result.map((anime) => (
          <WatchResult anime={anime}/>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;