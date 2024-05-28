"use client"

import React from 'react'
import { IconType } from 'react-icons'

interface CategoryInputProps{
    selected?: boolean
    label: string
    icon: IconType
    onClick: (value: string) => void
}

const CategoryInput:React.FC<CategoryInputProps> = ({selected, label, icon: IconType, onClick}) => {
  return (
    <div>
      Category
    </div>
  )
}

export default CategoryInput