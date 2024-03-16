import React from 'react'

interface HeadingProps {
    center?: boolean
    text: string
}

const Heading:React.FC<HeadingProps> = ({center, text}) => {
  return (
    <div className={`text-slate-900 my-3 md:my-5 px-3 md:px-8 md:text-xl ${center ? "text-center" : "text-start"}`}>{text}</div>
  )
}

export default Heading