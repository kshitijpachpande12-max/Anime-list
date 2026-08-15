import React from 'react';
import {Route, Routes} from 'react-router';
import HomePage from "./pages/HomePage.jsx";
import toast from 'react-hot-toast';
import SearchAnime from './pages/SearchAnime.jsx';
import AnimeDetail from './pages/AnimeDetail.jsx';

const App = () => {
  return (
    <div data-theme = "synthwave" className='bg-base-200'>
      <Routes>
        <Route path = "/" element={<HomePage/>}/>
        <Route path = "/search" element={<SearchAnime/>}/>
        <Route path = "/anime/:id" element={<AnimeDetail/>}/>
      </Routes>
    </div>
  )
}

export default App
