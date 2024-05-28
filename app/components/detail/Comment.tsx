"use client"

import { RxAvatar } from "react-icons/rx"
import Avatar from "../general/Avatar"
import { Rating } from "@mui/material"
import Heading from "../general/Heading"
import moment from 'moment'


interface CommentProps{
  product: any
}

const Comment:React.FC<CommentProps> = ({product}) => {
  if(product.reviews.length === 0) return null
  return (
    <div className="border border-gray-600 w-full md:w-1/3 p-2 rounded-lg my-3">
        {/* <Avatar image={prd?.user?.image}/> */}
        <Heading text="Değerlendirmeler" />
        <div className="flex items-center gap-1">
          {/*  <RxAvatar size="30"/>
            <div>
              <div>{prd?.user?.name}</div>
              <Rating name="read-only" value={prd?.user?.rating} readOnly />
            </div> */}
            {product.reviews && 
              product.reviews.map((review: any) => {
                return (
                  <div key={review.id} className="max-w-[300px]">
                    <div className="flex gap-2 items-center">
                      <Avatar src={review?.user.image} />
                      <div className="font-bold">{review?.user.name}</div>
                      <div className="font-light">{moment(review.createdDate).fromNow()}</div>
                    </div>
                    <div>
                      <Rating value={review.rating} readOnly />
                      <div className="ml-2">{review.comment}</div>
                      <hr className="mt-4 mb-4" />
                    </div>
                  </div>
                )
              })
            }
        </div>
    </div>
  )
}

export default Comment