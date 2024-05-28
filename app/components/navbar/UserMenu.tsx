"use client"
import { User } from '@prisma/client'
import { useCallback, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { AiFillCaretDown } from 'react-icons/ai';
import Link from 'next/link';
import MenuItem from './MenuItem';
import { SafeUser } from '@/types';
import Avatar from '../general/Avatar';


interface UserProps{
  currentUser: SafeUser | null
}
const UserMenu:React.FC<UserProps> = ({currentUser}) => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpenMenu((prev) => !prev)
  }, [])

  /*const menuFunc = async (type: any) => {
    setOpenMenu(false)
    if(type == "logout"){
      await signOut({ redirect: false})
      router.push('/login')
    }else if(type == "register"){
      router.push('/register')
    }else{
      router.push('/login')
    }
    
  }*/

  return (
    <>
      <div className='relative z-30'>
        <div onClick={toggleOpen} className='flex items-center gap-1 cursor-pointer p-2 border-[1px] border-slate-600 flex-row rounded-full hover:shadow-md transition bg-zinc-500'>
          <Avatar src={currentUser?.image} />
          <AiFillCaretDown size="15" />
        </div>
        {
          openMenu && (
            <div className='absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm text-slate-900 flex flex-col cursor-pointer'>
              {currentUser ? 
                (<div>
                {/* <Link href="/orders">
                  <MenuItem onClick={toggleOpen}>Siparişler</MenuItem>
                </Link> */}
                <Link href="/admin">
                  <MenuItem onClick={toggleOpen}>Admin</MenuItem>
                </Link>
                <hr />
                <MenuItem onClick={() => {
                  toggleOpen()
                  signOut({ redirect: false})
                  router.push('/login')
                }}>Logout</MenuItem>
              </div>) : (<div>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </div>)}
              
              
            
            </div>
          )
        }
      </div>
    </>
    
  )
}

export default UserMenu