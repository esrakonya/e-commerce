"use client"

import { RxAvatar } from "react-icons/rx"
import Avatar from "../general/Avatar"
import { Rating } from "@mui/material"


const Comment = ({prd}: {prd: any}) => {

  return (
    <div className="border border-gray-600 w-full md:w-1/3 p-2 rounded-lg my-3">
        {/* <Avatar image={prd?.user?.image}/> */}
        <div className="flex items-center gap-1">
            <RxAvatar size="30"/>
            <div>
              <div>{prd?.user?.name}</div>
              <Rating name="read-only" value={prd?.user?.rating} readOnly />
            </div>
        </div>
        <div className="text-slate-700">{prd.comment} asdfghj sdfghjkölç sdfghjkl</div>
    </div>
  )
}

export default Comment