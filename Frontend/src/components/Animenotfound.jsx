import React from 'react';
import {Link} from 'react-router';

const Animenotfound = () => {
  return (
    <div className='bg-primary/1 flex flex-col items-center justify-center mx-auto py-16'>
      <span className='text-4xl mx-auto font-bold my-8'>There are no animes in your list</span>
      <Link to={"/search"}>
        <button className='btn btn-primary'>Add your first anime</button>
      </Link>
    </div>
  )
}
export default Animenotfound
