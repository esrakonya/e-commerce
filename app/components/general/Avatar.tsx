import { RxAvatar } from "react-icons/rx";
import React from 'react'

interface AvatarProps {
    src?: string | null | undefined 
}

const Avatar:React.FC<AvatarProps> = ({src}) => {
  if(src){
    <img src={src} alt="Avatar" className="rounded-full" height={25} width={25} />
  }
  return <div><RxAvatar size="20"/></div>
}

export default Avatar