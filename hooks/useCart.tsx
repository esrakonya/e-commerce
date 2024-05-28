"use client"
import { CardProductProps } from "@/app/components/detail/DetailClient";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


interface CartContextProps {
    productCartQty: number
    cartTotalAmount: number
    cartPrdcts: CardProductProps[] | null
    addToBasket: (product: CardProductProps) => void
    addToBasketIncrease: (product: CardProductProps) => void
    addToBasketDecrease: (product: CardProductProps) => void
    removeFromCart: (product: CardProductProps) => void
    removeCart: () => void
    paymentIntent: string | null
    handleSetPaymentIntent: (val: string | null) => void
}

const CartContext = createContext<CartContextProps | null>(null)


interface Props {
    [propName: string]: any
}

export const CartContextProvider = (props: Props) => {
    const [productCartQty, setProductCartQty] = useState(0)
    const [cartTotalAmount, setCartTotalAmount] = useState(0)
    const [cartPrdcts, setCartPrdcts] = useState<CardProductProps[] | null>(null)
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)

    useEffect(() => {
        let getItem: any = localStorage.getItem('MercaturaCartItems')
        let getItemParse: CardProductProps[] | null = JSON.parse(getItem)
        const mercaturaPaymentIntent: any = localStorage.getItem('mercaturaPaymentIntent')
        const paymentIntent: string | null = JSON.parse(mercaturaPaymentIntent)
        setCartPrdcts(getItemParse)
        setPaymentIntent(paymentIntent)
    }, [])

    useEffect(() => {
        const getTotals = () => {
            if(cartPrdcts){
                const { total, qty } = cartPrdcts?.reduce(
                    (acc, item) => {
                        const itemTotal = item.price * item.quantity
        
                        acc.total += itemTotal
                        acc.qty += item.quantity
        
                        return acc
                    },
                    {
                        total: 0,
                        qty: 0,
                    }
                )
                setProductCartQty(qty)
                setCartTotalAmount(total)
            }
        }
        getTotals()
    }, [cartPrdcts])

    const addToBasketIncrease = useCallback((product: CardProductProps) => {
        let updatedCart;
        if(product.quantity == 10){
            return toast.error('Daha fazla ürün ekleyemezsin')
        }
        if(cartPrdcts){
            updatedCart = [...cartPrdcts]
            const existingItem = cartPrdcts.findIndex(item => item.id === product.id)

            if(existingItem > -1){
                updatedCart[existingItem].quantity = ++updatedCart[existingItem].quantity //önceki değerinden bir fazla 
            }
            setCartPrdcts(updatedCart)
            localStorage.setItem('MercaturaCartItems', JSON.stringify(updatedCart))
        }
    }, [cartPrdcts])

    const addToBasketDecrease = useCallback((product: CardProductProps) => {
        let updatedCart;
        if(product.quantity == 1){
            return toast.error('Daha az ekleyemezsin')
        }
        if(cartPrdcts){
            updatedCart = [...cartPrdcts]
            const existingItem = cartPrdcts.findIndex(item => item.id === product.id)

            if(existingItem > -1){
                updatedCart[existingItem].quantity = --updatedCart[existingItem].quantity
            }
            setCartPrdcts(updatedCart)
            localStorage.setItem('MercaturaCartItems', JSON.stringify(updatedCart))
        }
    }, [cartPrdcts])

    const removeCart = useCallback(() => {
        setCartPrdcts(null)
        toast.success('Sepet Temizlendi')
        localStorage.setItem('MercaturaCartItems', JSON.stringify(null))
    }, [])

    const addToBasket = useCallback((product: CardProductProps) => {
        setCartPrdcts(prev => {
            let updatedCart;
            if(prev){
                updatedCart = [...prev, product]
            }else{
                updatedCart = [product]
            }
            toast.success('Ürün Sepete Eklendi')
            localStorage.setItem('MercaturaCartItems', JSON.stringify(updatedCart))
            return updatedCart
        })
    }, [cartPrdcts])

    const removeFromCart = useCallback((product: CardProductProps) => {
        if(cartPrdcts){
            const filteredProducts = cartPrdcts.filter(cart => cart.id !== product.id)

            setCartPrdcts(filteredProducts)
            toast.success('Ürün Sepetten Silindi')
            localStorage.setItem('MercaturaCartItems', JSON.stringify(filteredProducts))
        }
    }, [cartPrdcts])

    const handleSetPaymentIntent = useCallback((val: string | null) => {
        setPaymentIntent(val)
        localStorage.setItem('mercaturaPaymentIntent', JSON.stringify(val))
    }, [paymentIntent])

    let value = {
        productCartQty,
        cartTotalAmount,
        addToBasket,
        cartPrdcts,
        removeFromCart,
        removeCart,
        addToBasketIncrease,
        addToBasketDecrease,
        paymentIntent,
        handleSetPaymentIntent,
    }
    return (
        <CartContext.Provider value={value} {...props} />
    )
}


const UseCart = () => {
    const context = useContext(CartContext)
    if(context == null){
        throw new Error('Bir hata durumu var.')
    }
    return context
}


export default UseCart