"use client"
import UseCart from '@/hooks/useCart'
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import AuthContainer from '../containers/AuthContainer'
import CheckoutForm from './CheckoutForm'
import Button from '../general/Button'


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

const CheckoutClient = () => {
    const router = useRouter()
    const {cartPrdcts, paymentIntent, handleSetPaymentIntent} = UseCart()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    console.log(clientSecret)

    useEffect(() => {
        //create a paymentintent as soon as the page loads
        if(cartPrdcts){
            setLoading(true)
            setError(false)

            fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    items: cartPrdcts,
                    payment_intent_id: paymentIntent
                })
            }).then((res) => {
                setLoading(false)
                if(res.status === 401){
                    return router.push('/login')
                }

                return res.json()
            }).then((data) => {
                setClientSecret(data.paymentIntent.clientSecret)
                handleSetPaymentIntent(data.paymentIntent.id)
            }).catch((error) => {
                setError(true)
                //console.log(error, "error")
                toast.error('Bir şeyler yanlış gitti')
            })
        }
    }, [cartPrdcts, paymentIntent])

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            labels: 'floating',
        },
    }

    const handleSetPaymentSuccess = useCallback((value: boolean) => {
        setPaymentSuccess(value)
    }, [])
  return (
    <AuthContainer>
        <div className='w-full'>
            {clientSecret && cartPrdcts && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} handleSetPaymentSuccess={handleSetPaymentSuccess} />
                </Elements>
            )}
            {loading && <div className='text-center'>Loading Checkout...</div>}
            {error && <div className='text-center text-red-500'>Bir şeyler yanlış gitti..</div>}
            {paymentSuccess && (
                <div className='flex items-center flex-col gap-4'>
                    <div className='text-green-700 text-center'>Payment Success</div>
                    <div className='max-w-[220px] w-full'>
                        <Button text="Siparişlerini Gör" onClick={() => router.push('/orders')}  />
                    </div>
                </div>
            )}
        </div>
    </AuthContainer>
  )
}

export default CheckoutClient