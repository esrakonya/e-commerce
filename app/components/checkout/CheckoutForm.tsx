"use client"

import UseCart from "@/hooks/useCart"
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Heading from "../general/Heading"
import Button from "../general/Button"
import formatPrice from "@/utils/formatPrice"

interface CheckoutFormProps{
    clientSecret: string
    handleSetPaymentSuccess: (value: boolean) => void
}

const CheckoutForm:React.FC<CheckoutFormProps> = ({clientSecret, handleSetPaymentSuccess}) => {
    const {cartTotalAmount, productCartQty, removeCart, handleSetPaymentIntent} = UseCart()
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const formattedPrice = formatPrice(cartTotalAmount)
    

    useEffect(() => {
        if(!stripe){
            return
        }
        if(!clientSecret){
            return
        }
        handleSetPaymentSuccess(false)
    }, [stripe])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(!stripe || !elements){
            return
        }
        setLoading(true)

        stripe.confirmPayment({
            elements, redirect: 'if_required'
        }).then(result => {
            if(!result.error){
                toast.success('Checkout success')

                removeCart()
                handleSetPaymentSuccess(true)
                handleSetPaymentIntent(null)
            }
            setLoading(false)
        })
    }

    //let cartPrdctsTotal = cartPrdcts?.reduce((acc: any, item: CardProductProps) => acc + item.quantity * item.price, 0)
  return (
    <div>
        <form onSubmit={handleSubmit} id="payment-form">
            <div className="mb-6">
                <Heading text="Enter your detail to complete checkout" />
            </div>
            <h2 className="font-semibold mb-2">Address Information</h2>
            <AddressElement options={{mode: "shipping", allowedCountries: ["TR", "US"]}} />
            <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
            <PaymentElement id="payment-element" options={{layout: 'tabs'}} />
            <div className="py-4 text-center text-slate-700 text-xl font-bold">
                Total: {formattedPrice}
            </div>
            <Button text={loading ? 'Processing' : 'Pay now'} disabled={loading || !stripe || !elements} onClick={() => {}}/>
        </form>
    </div>
  )
}

export default CheckoutForm