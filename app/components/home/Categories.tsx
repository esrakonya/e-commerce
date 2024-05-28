"use client"

import { categoryList } from "@/utils/Categories"
import Container from "../Container"
import PageContainer from "../containers/PageContainer"
import Category from "./Category"
import { useSearchParams, usePathname } from "next/navigation"


const Categories = () => {
   const params = useSearchParams()
   const category = params?.get('category')

   const pathname = usePathname()

   const isMainPage = pathname === '/'

   if(!isMainPage) return null
  return (
    <div className="">
        <PageContainer>
            <div className="min-w-[120px] flex items-center justify-center  md:px:10 gap-3 md:gap-10 py-5 md:py-8 overflow-x-auto">
                {
                    categoryList.map((item, index) => (
                        //<div className="border text-slate-900 rounded-full min-w-[120px] flex items-center justify-center cursor-pointer flex-1 px-3 py-2 text-center" key={index}>{category.name}</div>
                        <Category key={item.name} text={item.name} icon={item.icon} selected={category === item.name || (category === null && item.name === "All") } />
                    ))
                }
            </div>
        </PageContainer>
    </div>
  )
}

export default Categories