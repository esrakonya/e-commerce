/*"use client"

import Image from 'next/image'
import PageContainer from "../containers/PageContainer"
import Counter from '../general/Counter'
import Button from '../general/Button'
import Comment from './Comment'
import React, { useCallback, useEffect, useState } from 'react'
import { Rating } from '@mui/material'
import Heading from '../general/Heading'
import UseCart from '@/hooks/useCart'
import getProductsId from '@/app/actions/getProductsId'

interface DetailClientProps{
  product: any
}

export type CardProductProps = {
  id: string
  name: string
  description: string
  category: string
  price: number
  quantity: number
  image: string
  inStock: boolean
}

const DetailClient:React.FC<DetailClientProps> = ({product}: {product: any}) => {

  const {productCartQty, addToBasket, cartPrdcts} = UseCart()
  const [displayButton, setDisplayButton] = useState(false)


  const [cardProduct, setCardProduct] = useState<CardProductProps>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    quantity: 1,
    image: {...product.image[0]},
    inStock: product.inStock
  })



  useEffect(() => {
    setDisplayButton(false)
    let controlDisplay: any = cartPrdcts?.findIndex(cart => cart.id == product.id)
    if(controlDisplay > -1){
      setDisplayButton(true)
    }
  }, [cartPrdcts])

  const increaseFunc = useCallback(() => {
    if(cardProduct.quantity == 10) return //sepete en fazla 10 tane ürün eklenebilir
    setCardProduct(prev => ({...prev, quantity:prev.quantity + 1}))
  }, [cartPrdcts])

  const decreaseFunc = useCallback(() => {
    if(cardProduct.quantity == 1) return //sepette eklemek için zaten en az bir ürün olmalı
    setCardProduct(prev => ({...prev, quantity:prev.quantity - 1}))
  }, [cartPrdcts])

  let productRating = product?.reviews?.reduce((acc: number, item: any ) => acc + item.rating, 0) / product?.reviews?.length

  return (
    <div className="my-10">
        <PageContainer>
            <div className="block md:flex gap-10 justify-center">  
              <div className="relative h-[200px] md:h-[400px] w-[200px] md:w-[400px] mb-3 md:mb-0">
                <Image src={product?.image} fill alt=''/>
              </div>
              <div className='w-full md:w-1/2 space-y-3'>
                <div className='text-xl md:text-2xl'>{product?.name}</div>
                <div className='flex items-center gap-2'>
                  <Rating name='read-only' value={productRating} readOnly/>
                  <div>{product.reviews.length}</div>
                </div>
                <div className='text-slate-500 text-justify'>{product?.description}</div>
                <div className='flex items-center gap-2'>
                  <div>STOK DURUMU:</div>
                    {
                      product.inStock ? <div className='text-blue-600'>Ürün Stokta Mevcut</div> : <div className='text-red-500'>Ürün Stokta Bulunmamakta</div>
                    }
                </div>
                <div className='text-lg md:text-2xl text-stone-800 font-bold'>{product.price} TL</div>
                {
                  displayButton ? <>
                    <Button text='Ürün Sepete Ekli' small outline onClick={() => {}} />
                  </> : <>
                    <Counter increaseFunc={increaseFunc} decreaseFunc={decreaseFunc} cardProduct={cardProduct}/>
                    <Button text="Sepete Ekle" small onClick={() => addToBasket(cardProduct)}/>
                  </>
                }
                
              </div>
            </div>
            <Heading text='Yorumlar'/>
            <div>
              {
                product?.reviews?.map((prd: any) => (
                  <Comment key={prd.id} product={prd}/>
                ))
              }
            </div>
        </PageContainer>
    </div>
  )
}

export default DetailClient*/











"use client"

import Image from 'next/image'
import PageContainer from "../containers/PageContainer"
import Counter from '../general/Counter'
import Button from '../general/Button'
import Comment from './Comment'
import React, { useCallback, useEffect, useState } from 'react'
import { Rating } from '@mui/material'
import Heading from '../general/Heading'
import UseCart from '@/hooks/useCart'

interface DetailClientProps{
  product: any
}

export type CardProductProps = {
  id: string
  name: string
  description: string
  category: string
  price: number
  quantity: number
  image: string
  inStock: boolean
}

const DetailClient:React.FC<DetailClientProps> = ({product}: {product: any}) => {

  const { productCartQty, addToBasket, cartPrdcts } = UseCart()
  const [displayButton, setDisplayButton] = useState(false)

  const initialCardProduct: CardProductProps = {
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    quantity: 1,
    image: product.image,
    inStock: product.inStock
  }

  const [cardProduct, setCardProduct] = useState<CardProductProps>(initialCardProduct)

  useEffect(() => {
    const controlDisplay: any = cartPrdcts?.findIndex(cart => cart.id == product.id)
    setDisplayButton(controlDisplay > -1)
  }, [cartPrdcts, product.id])

  const increaseFunc = useCallback(() => {
    if (cardProduct.quantity === 10) return // sepete en fazla 10 tane ürün eklenebilir
    setCardProduct(prev => ({ ...prev, quantity: prev.quantity + 1 }))
  }, [cardProduct.quantity])

  const decreaseFunc = useCallback(() => {
    if (cardProduct.quantity === 1) return // sepette eklemek için zaten en az bir ürün olmalı
    setCardProduct(prev => ({ ...prev, quantity: prev.quantity - 1 }))
  }, [cardProduct.quantity])

  const productRating = product?.reviews?.reduce((acc: number, item: any) => acc + item.rating, 0) / product?.reviews?.length

  return (
    <div className="my-10">
      <PageContainer>
        <div className="block md:flex gap-10 justify-center">
          <div className="relative h-[200px] md:h-[400px] w-[200px] md:w-[400px] mb-3 md:mb-0">
            <Image src={cardProduct.image} fill alt={product.name} />
          </div>
          <div className='w-full md:w-1/2 space-y-3'>
            <div className='text-xl md:text-2xl'>{product?.name}</div>
            <div className='flex items-center gap-2'>
              <Rating name='read-only' value={productRating} readOnly />
              <div>{product.reviews.length}</div>
            </div>
            <div className='text-slate-500 text-justify'>{product?.description}</div>
            <div className='flex items-center gap-2'>
              <div></div>
              {
                product.inStock ? <div className='text-blue-600'>Ürün Stokta Mevcut</div> : <div className='text-red-500'>Ürün Stokta Bulunmamakta</div>
              }
            </div>
            <div className='text-lg md:text-2xl text-stone-800 font-bold'>{product.price} TL</div>
            {
              displayButton ? (
                <Button text='Ürün Sepete Ekli' small outline onClick={() => { }} />
              ) : (
                <>
                  <Counter increaseFunc={increaseFunc} decreaseFunc={decreaseFunc} cardProduct={cardProduct} />
                  <Button text="Sepete Ekle" small onClick={() => addToBasket(cardProduct)} />
                </>
              )
            }
          </div>
        </div>
      </PageContainer>
    </div>
  )
}

export default DetailClient





