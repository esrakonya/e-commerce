import React from 'react'

const formatPrice = (amount: number) => {
  const formattedAmount = new Intl.NumberFormat('tr', {
    style: 'currency',
    currency: 'TRY'
  }).format(amount);


  return formattedAmount.replace('₺', '') + ' ₺';
}

export default formatPrice