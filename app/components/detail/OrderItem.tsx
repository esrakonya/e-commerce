"use client"

import formatPrice from "@/utils/formatPrice"
import { truncateText } from "@/utils/truncateText"
import { CartProductProps  } from "@prisma/client"
import Image from "next/image"

interface OrderItemProps{
    item: CartProductProps
}

const OrderItem:React.FC<OrderItemProps> = ({item}) => {

    return (
        <div className="grid grid-cols-5 text-sm md:text-md gap-4 border-t-[1.5px] border-slate-200 items-center">
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                <div className="relative w-[70px] aspect-square">
                    
                </div>
                <div className="flex flex-col gap-1">
                    <div>{truncateText(item.name)}</div>
                </div>
            </div>
            <div className="justify-self-center">{formatPrice(item.price)}</div>
            <div className="justify-self-center">{formatPrice(item.quantity)}</div>
            <div className="justify-self-end font-semibold">{(item.price * item.quantity).toFixed(2)} TL</div>
        </div>
    )
}

export default OrderItem