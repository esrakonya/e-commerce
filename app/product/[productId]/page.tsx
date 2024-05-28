import { getCurrentUser } from '@/app/actions/getCurrentUser'
import getProductsId from '@/app/actions/getProductsId'
import Container from '@/app/components/Container'
import WarningText from '@/app/components/WarningText'
import AddRating from '@/app/components/detail/AddRating'
import Comment from '@/app/components/detail/Comment'
import DetailClient from '@/app/components/detail/DetailClient'
import { products } from '@/utils/Products'
import React from 'react'

type DetailProps = {
    productId? : string
}

const Detail = async ({params}: {params: DetailProps}) => {

  const product = await getProductsId(params)
  const user = await getCurrentUser()

  if(!product) return <WarningText text='Product with the given id does not exist' />


  return (
    <div className='p-8'>
      <Container>
        <DetailClient product={product}/>
        <div className='flex flex-col mt-20 gap-4'>
          <AddRating product={product} user={user} />
          <Comment product={product} />
        </div>
      </Container>
    </div>
  )
}

export default Detail