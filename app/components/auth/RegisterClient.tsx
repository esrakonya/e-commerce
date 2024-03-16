"use client"

import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { AiFillGoogleCircle } from "react-icons/ai"

import AuthContainer from "../containers/AuthContainer"
import Button from "../general/Button"
import Heading from "../general/Heading"
import Input from "../general/Input"

const RegisterClient = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
    }
    return (
        <AuthContainer>
            <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
                <Heading text="Register" center />
                <Input placeholder="Name" type="text" id="name" register={register} errors={errors} required />
                <Input placeholder="Email" type="email" id="email" register={register} errors={errors} required />
                <Input placeholder="Password" type="password" id="password" register={register} errors={errors} required />
                <Button text="Sign Up" onClick={handleSubmit(onSubmit)} />
                <div className="text-center my-3 text-lg">OR</div>
                <Button text="Sign Up With Google" icon={AiFillGoogleCircle} outline onClick={() => {}} />
            </div>
        </AuthContainer>
    )
}

export default RegisterClient