import React from 'react'
import Logo from './Logo'
import CardCount from './CardCount'
import HamburgerMenu from './HamburgerMenu'
import Search from './Search'
import { getCurrentUser } from '@/app/actions/getCurrentUser'
import User from './UserMenu'
import UserMenu from './UserMenu'
import Categories from '../home/Categories'

const Navbar = async () => {
  const currentUser = await getCurrentUser()
  return (
    <div className='flex items-center justify-between gap-3 md:gap-10 px-3 md:px:10 h-16 bg-zinc-900 text-stone-300'>
        <Logo/>
        <Search/>
        <CardCount/>
        <UserMenu currentUser={currentUser} />
        <HamburgerMenu/>
    </div>
  )
}

export default Navbar