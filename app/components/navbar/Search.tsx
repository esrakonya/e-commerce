"use client"

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  const router = useRouter()

  const { register, handleSubmit, reset, formState: {errors}} = useForm<FieldValues>({
    defaultValues: {
      search: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    if(!data.search) return router.push('/')

    const url = queryString.stringifyUrl({
      url: '/',
      query: {
        search: data.search
      }
    },{skipNull: true})

    router.push(url)
    reset()
  }

  return (
    <div className='hidden md:flex flex-1'>
      <input {...register('search')} className='py-1 px-4 rounded-l-sm outline-none flex flex-1 text-zinc-600' type='text' placeholder='Ara' autoComplete='off' />
      <button onClick={handleSubmit(onSubmit)} className='p-2 bg-zinc-500 rounded-r-sm border border-transparent'>{<IoSearchOutline />}</button>
    </div>
  )
}

export default Search