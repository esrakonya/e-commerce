import { RxAvatar } from "react-icons/rx";
import React from 'react'

interface AvatarProps {
    image?: string
}

const Avatar:React.FC<AvatarProps> = ({image}) => {
  if(image) return <img src={image} alt=""/>
  return <div><RxAvatar size="20"/></div>
}

export default Avatar