"use client"

import UseCart from "@/hooks/useCart"
import PageContainer from "../containers/PageContainer"
import Image from "next/image"
import Button from "../general/Button"
import { CardProductProps } from "../detail/DetailClient"
import Counter from "../general/Counter"
import Link from "next/link"
import { MdArrowBack } from "react-icons/md"
import formatPrice from "@/utils/formatPrice"
import { SafeUser } from "@/types"
import { useRouter } from "next/navigation"

interface CartClientProps{
    currentUser: SafeUser | null | undefined
}

const CartClient:React.FC<CartClientProps> = ({currentUser}) => {
    const {cartPrdcts, removeFromCart, removeCart, addToBasketIncrease, addToBasketDecrease} = UseCart()
    const router = useRouter()

    console.log(cartPrdcts, "cartPrdcts")

    if(!cartPrdcts || cartPrdcts.length == 0){
        return <div className="flex flex-col items-center">
            <div className="text-2xl">Sepetiniz boş</div>
            <div>
                <Link href={'/'} className="text-slate-500 items-center gap-1 mt-2">
                    <MdArrowBack />
                    <span className="underline">Alışverişe Başla</span>
                </Link>
            </div>
        </div>
    }

    let cartPrdctsTotal = cartPrdcts.reduce((acc: any, item: CardProductProps) => acc + item.quantity * item.price, 0)
    return (
        <div className="my-3 md:my-10">
            <PageContainer>
                <div className="flex items-center gap-4 text-center border-zinc-400 border-b py-3">
                    <div className="w-1/4 justify-self-start">Ürün Resmi</div>
                    <div className="w-1/4 justify-self-center">Ürün Adı</div>
                    <div className="w-1/4 justify-self-center">Ürün Miktarı</div>
                    <div className="w-1/4 justify-self-end">Ürün Fiyatı</div>
                </div>
                <div>
                    { cartPrdcts &&
                        cartPrdcts.map(cart => (
                            <div className="flex items-center justify-between text-center my-5" key={cart.id} /*item={cart}*/>
                                <div className="w-1/5 flex items-center justify-center">
                                    <Image src={cart.image} width={50} height={50} alt="" />
                                </div>
                                <div className="w-1/5">{cart.name}</div>
                                <div className="w-1/5 flex justify-center">
                                    <Counter cardProduct={cart} increaseFunc={() => addToBasketIncrease(cart)} decreaseFunc={() => addToBasketDecrease(cart)} />
                                </div>
                                <div className="w-1/5">{cart.price} TL</div>
                                <div className="w-1/5">
                                    <Button text="Ürünü Sil" onClick={() => removeFromCart(cart)} />
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="flex items-center justify-between my-5 py-5 border-t border-zinc-400 gap-4">
                    <div className="w-[90px]">
                        {/*<button onClick={() => removeCart()} className="w-1/5 underline text-sm">Sepeti Sil</button>*/}
                        <Button onClick={() => removeCart()} text="Sepeti Temizle" small outline />
                    </div>
                    <div className="text-sm flex flex-col gap-1 items-start">
                        <div className="text-lg md:text-2lg font-bold">{formatPrice(cartPrdctsTotal)}</div>
                        {/* <p className="text-slate-500">Taxes and shipping calculate at checkout</p>  */}
                        <Button text={currentUser ? 'Ödeme Yap' : 'Ödeme Yapmak İçin Giriş Yap'} 
                            onClick={() => {currentUser ? router.push('/checkout') : router.push('/login')}}
                            outline={currentUser ? false : true} />
                        <Link href={'/'} className="flex flex-col text-zinc-500 items-center gap-1 mt-2">
                            <MdArrowBack />
                            <span className="underline">Alışverişe Devam Et</span>
                        </Link>
                    </div>
                </div>
            </PageContainer>
        </div>
    )
}

export default CartClient