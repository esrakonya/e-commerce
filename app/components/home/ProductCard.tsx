"use client"
import Image from "next/image"
import { Rating } from "@mui/material"
import textClip from "@/utils/TextClip"
import { useRouter } from "next/navigation"
import { truncateText } from "@/utils/truncateText"
import formatPrice from "@/utils/formatPrice"
import { Product } from "@prisma/client"

interface ProductCardProps{
  product: any
}

const ProductCard:React.FC<ProductCardProps> = ({product}) => {
    const router = useRouter()

    let productRating = product?.reviews?.reduce((acc: number, item: any ) => acc + item.rating, 0) / product?.reviews?.length
  return (
    <div onClick={() => router.push(`product/${product.id}`)} className="w-[240px] text-sm cursor-pointer flex flex-col flex-1 shadow-lg p-2 rounded-md transition hover:scale-105">
        <div className="relative h-[150px]">
            <Image src={'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTHrGgYGcy574s04Gsd2kPMUJIvVeeolwMJC23vagoqRQPBOGyk0fqx95StpLoFs7aTgHAsmhxe1YnOGcz1LZzdfqt1jQ63thK-OrV3LO6TB8BOV8lHgWAd&usqp=CAE'} 
            fill alt="" priority className="w-full h-full object-contain"/>
        </div>
        <div className="text-center mt-2 space-y-1">
            <div>{truncateText(product.name)}</div>
            <Rating name="read-only" value={productRating} readOnly />
            <div>{product.reviews.length} reviews</div>
            <div className="text-black font-bold text-lg md:text-xl">{formatPrice(product.price)}</div>
        </div>
    </div>
  )
}

export default ProductCard