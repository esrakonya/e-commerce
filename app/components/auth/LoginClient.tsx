"use client"

import { AiFillGoogleCircle } from "react-icons/ai"
import AuthContainer from "../containers/AuthContainer"
import Button from "../general/Button"
import Heading from "../general/Heading"
import Input from "../general/Input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Link from "next/link"

const LoginClient = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors},
    } = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
    }
    return (
        <AuthContainer>
            <div>
                <Heading text="Hesabınıza Giriş Yapın" center />
                <Input placeholder="Email" type="email" id="email" register={register} errors={errors} required />
                <Input placeholder="Password" type="password" id="password" register={register} errors={errors} required />
                <Button text="Sign In" onClick={handleSubmit(onSubmit)}/>
                <div className="text-center my-3 text-lg">OR</div>
                <Button text="Sign In With Google" icon={AiFillGoogleCircle} outline onClick={() => {}} />
                <div className="text-center my-3 text-sm">Hesap mı açmak istiyorsunuz? <Link className="underline" href="/register">Kaydolun</Link></div>
            </div>
        </AuthContainer>
    )
}

export default LoginClient