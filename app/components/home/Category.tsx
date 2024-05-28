"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import queryString from 'query-string'

interface CategoryProps{
    text: string;
    icon: IconType;
    selected?: boolean
}

const Category:React.FC<CategoryProps> = ({text, icon:Icon, selected}) => {
    const router = useRouter()
    const params = useSearchParams()


    const handleClick = useCallback(() => {
        if(text === "All"){
            router.push('/')
        }else{
            let currentQuery = {}

            if(params){
                currentQuery = queryString.parse(params.toString())
            }

            const updatedQuery:any = {
                ...currentQuery,
                category: text
            }

            const url = queryString.stringifyUrl(
                {
                    url: '/',
                    query: updatedQuery
                },
                {
                    skipNull: true
                }
            )

            router.push(url)
        }
    }, [text, params, router])
  return (
    <div onClick={handleClick} className={`flex items-center justify-center text-center 
     p-2 border-b-2 hover:text-slate-900 transition cursor-pointer
    ${selected ? 'border-b-slate-800 text-slate-900' : 'border-transparent text-slate-600'}`}>
        <div className="flex gap-2 px-3">
            <Icon size={20} />
            <div className="font-medium text-sm">{text}</div>
        </div>
    </div>
  )
}

export default Category