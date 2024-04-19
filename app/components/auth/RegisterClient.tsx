"use client"

import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { AiFillGoogleCircle } from "react-icons/ai"

import AuthContainer from "../containers/AuthContainer"
import Button from "../general/Button"
import Heading from "../general/Heading"
import Input from "../general/Input"
import axios from "axios"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import { useEffect } from "react"

interface RegisterClientProps{
    currentUser: User | null | undefined
}

const RegisterClient:React.FC<RegisterClientProps> = ({currentUser}) => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
        axios.post('/api/register', data).then(() => {    //post isteği atma işlemi
            toast.success('Kullanıcı Oluşturuldu')
            console.log(data)
            signIn('credentials', {  //signIn işlemi
                email: data.email,
                password: data.password,
                redirect: false
            }).then((callback) => {
                if(callback?.ok){
                    router.push('/cart')
                    router.refresh()
                    toast.success('Hesabınıza başarıyla giriş yapıldı')
                }

                if(callback?.error) {
                    toast.error(callback.error)
                }
            })
        })
    }

    useEffect(() => {
        if(currentUser){
            router.push('/cart')
            router.refresh()
        }
    }, [])

    return (
        <AuthContainer>
            <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
                <Heading text="Register" center />
                <Input placeholder="Name" type="text" id="name" register={register} errors={errors} required />
                <Input placeholder="Email" type="text" id="email" register={register} errors={errors} required />
                <Input placeholder="Password" type="password" id="password" register={register} errors={errors} required />
                <Button text="Sign Up" onClick={handleSubmit(onSubmit)} />
                <div className="text-center my-3 text-lg">OR</div>
                <Button text="Sign Up With Google" icon={AiFillGoogleCircle} outline onClick={() => signIn('google')} />
            </div>
        </AuthContainer>
    )
}

export default RegisterClient