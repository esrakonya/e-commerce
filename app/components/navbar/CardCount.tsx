"use client"
import UseCart from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { CiShoppingBasket } from "react-icons/ci";

const CardCount = () => {
  const {productCartQty} = UseCart()
  const router = useRouter()
  return (
    <div onClick={() => router.push('/cart')} className="hidden md:flex relative">
        <div>
          <CiShoppingBasket size="25" />
          <div className="absolute -top-1 -right-2 text-xs bg-zinc-500 w-4 h-4 flex items-center justify-center rounded-full">{productCartQty}</div>
        </div>
    </div>
  )
}

export default CardCount