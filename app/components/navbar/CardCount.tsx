"use client"
import UseCart from "@/hooks/useCart";
import { CiShoppingBasket } from "react-icons/ci";

const CardCount = () => {
  const {cartPrdcts} = UseCart()
  return (
    <div className="hidden md:flex relative">
        <CiShoppingBasket size="25" />
        <div className="absolute -top-1 -right-2 text-xs bg-gray-700 w-5 h-5 flex items-center justify-center rounded-full">{cartPrdcts?.length}</div>
    </div>
  )
}

export default CardCount