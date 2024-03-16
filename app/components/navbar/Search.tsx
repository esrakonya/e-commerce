import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  return (
    <div className='hidden md:flex flex-1'>
      <input className='py-1 px-4 rounded-sm outline-none flex flex-1' type='text' placeholder='Ara' />
      <button className='p-2 bg-zinc-500 border border-transparent'>{<IoSearchOutline />}</button>
    </div>
  )
}

export default Search