"use client"
import { SafeUser } from "@/types";
import { Order, Product, Review } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../general/Heading";
import { Rating } from "@mui/material";
import Input from "../general/Input";
import Button from "../general/Button";
import toast from "react-hot-toast";
import axios from "axios";


interface AddRatingProps{
    product: Product & {
        reviews: Review[]
    };
    user: (SafeUser & {
        orders: Order[];
    }) | null
}

const AddRating:React.FC<AddRatingProps> = ({product, user}) => {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            comment: '',
            rating: 0
        }
    })

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onSubmit:SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        if(data.rating === 0) {
            setIsLoading(false)
            return toast.error('Değerlendirme seçili değil')
        }
        const ratingData = {...data, userId: user?.id, product: product}
        
        axios.post('/api/rating', ratingData).then(() => {
            toast.success('Değerlendirme kaydedildi')
            router.refresh()
            reset()
        }).catch((error) => {
            console.log(error)
            toast.error('Bir şeyler yanlış gitti :(')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    if(!user || !product) return null

    const deliveredOrder = user?.orders.some(order => order.products.find(item => item.id === product.id) &&
    order.deliveryStatus === 'delivered')

    const userReview = product?.reviews.find(((review: Review) => {
        return review.userId === user.id
    }))

    //if(userReview || !deliveredOrder) return null

    return (
        <div className="flex flex-col gap-2 max-w-[500px]">
            <div className="">
                <h2 className="text-xl text-zinc-700 font-semibold">Bu ürünü değerlendir</h2>
            </div>
            <Rating className="mx-4" onChange={(event, newValue) => {
                setCustomValue('rating', newValue)
            }} />
            <Input placeholder="Yorum" id="comment" type="text" disabled={isLoading} register={register} errors={errors} required />
            <Button text={isLoading ? "Loading" : "Ürünü Değerlendir"} onClick={handleSubmit(onSubmit)} />
        </div>
    )
}


export default AddRating