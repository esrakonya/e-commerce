"use client"

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Heading from "../general/Heading"
import Input from "../general/Input"
import Checkbox from "../general/Checkbox"
import ChoiceInput from "../general/ChoiceInput";
import Button from "../general/Button";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import firebaseApp from "@/libs/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";
import { categoryList } from "@/utils/Categories";
import SelectImage from "../general/SelectImage";

export type ImageType = {
    image: File | null
}

export type UploadedImageType = {
    image: string
}

const CreateForm = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState<File | null | undefined>()
    const [isProductCreated, setIsProductCreated] = useState(false)
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const router = useRouter()


    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: {errors}
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            description: "",
            brand: "",
            category: "",
            price: "",
            images: "",
            inStock: false
        }
    })

    const onSubmit:SubmitHandler<FieldValues> = async (data) => {
        console.log("Product data", data)

        setIsLoading(true)

        let uploadedImages: UploadedImageType[] = []

        if(!data.category){
            setIsLoading(false)
            return toast.error('Kategori seçilmedi')
        }

        if(!data.images || data.images.length === 0 ){
            setIsLoading(false)
            return toast.error('Resim seçilmedi')
        }

        const handleImageUploads = async () => {
            toast('Ürün oluşturuluyor, lütfen bekleyin..')
            try {
                const fileName = new Date().getTime() + '-' + data.name
                const storage = getStorage(firebaseApp)
                const storageRef = ref(storage, `products/${fileName}`)
                const uploadTask = uploadBytesResumable(storageRef, data.images)

                await new Promise<void>((resolve, reject) => {
                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                            console.log("Upload is " + progress + '% done')
                            switch (snapshot.state) {
                                    case 'paused':
                                        console.log('Upload is paused')
                                        break
                                    case 'running':
                                        console.log('Upload is running')
                                        break    
                            }
                        },
                        (error) => {
                            console.log('Error uploading image', error)
                            reject(error)
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                // uploadedImages.push({
                                //     ...item,
                                //     image: downloadURL
                                // })
                                setUploadedImage(downloadURL)
                                console.log('File available at', downloadURL)
                                resolve()
                            }).catch((error:any) => {
                                console.log('Error getting the download URL', error)
                                reject(error)
                            })
                        }
                    )
                })
            } catch (error) {
                setIsLoading(false)
                console.log('Error handling image uploads', error)
                return toast.error('Error handling image uploads')
            }
        }

        await handleImageUploads()

        const productData = {...data, images: uploadedImage}
        console.log("New dataa", productData)

        axios.post('/api/product', productData).then(() => {
            toast.success('Ürün oluşturuldu')
            setIsProductCreated(true)
            router.refresh()
        }).catch((error) => {
            console.log(error)
            toast.error('Bir şeyler yanlış gitti')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const category = watch('category')

    useEffect(() => {
        setCustomValue("images", images)
    }, [images])

    useEffect(() => {
        if(isProductCreated){
            reset()
            setImages(null)
            setIsProductCreated(false)
        }
    }, [isProductCreated])


    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    // const addImageToState = useCallback((value: ImageType) => {
    //     setImages((prev) => {
    //         if(!prev){
    //             return [value]
    //         }

    //         return [...prev, value]
    //     })
    // }, [])

    // const removeImageFromState = useCallback((value: ImageType) => {
    //     setImages((prev) => {
    //         if(prev){
    //             const filteredImages = prev.filter((image) => image !== value)
    //             return filteredImages
    //         }
    //         return prev
    //     })
    // }, [])

    const onChangeFunc = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0){
            setImages(e.target.files[0])
        }
    }

    return (
        <>
            <Heading text="ÜRÜN OLUŞTUR" center />
            <Input placeholder="Ad" type="text" id="name" disabled={isLoading} register={register} errors={errors} required />
            <Input placeholder="Açıklama" type="text" id="description" disabled={isLoading} register={register} errors={errors} required />
            <Input placeholder="Marka" type="text" id="brand" disabled={isLoading} register={register} errors={errors} required />
            <Input placeholder="Fiyat" type="number" id="price" disabled={isLoading} register={register} errors={errors} required />
            <Checkbox id="inStock" label="Ürün stokta mevcut mu ?" register={register} />
            <div className="flex flex-wrap gap-2">
                {
                    categoryList.map((cat, i) => {
                        if(cat.name == "All"){
                            return null
                        }

                        return <div key={cat.name}>
                            <ChoiceInput key={cat.name} icon={cat.icon} text={cat.name} onClick={(category) => setCustomValue("category", category)} selected={category == cat.name} />
                        </div>
                    })
                }
            </div>
            <div className="relative w-full flex flex-col flex-wrap gap-4">
                <div className="p-3 pb-4">
                    <div className="font-bold pb-3">Ürün resimlerini ekle</div>
                    <div>
                        {/* <SelectImage addImageToState={addImageToState} removeImageFromState={removeImageFromState} isProductCreated={isProductCreated} /> */}
                        <input type="file" onChange={onChangeFunc} />
                    </div>
                </div>
            </div>
            <Button text={isLoading? 'Loading...':'Ürün Oluştur'} onClick={handleSubmit(onSubmit)} />
        </>
    )
}

export default CreateForm





/*"use client"

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Heading from "../general/Heading"
import Input from "../general/Input"
import Checkbox from "../general/Checkbox"
import ChoiceInput from "../general/ChoiceInput"
import Button from "../general/Button"
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import firebaseApp from "@/libs/firebase"
import axios from "axios"
import { useRouter } from "next/navigation"
import { categoryList } from "@/utils/Categories"
import SelectImage from "../general/SelectImage"

export type ImageType = {
    image: File | null
}

const CreateForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState<ImageType[]>([])
    const [isProductCreated, setIsProductCreated] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            description: "",
            brand: "",
            category: "",
            price: "",
            images: [],
            inStock: false
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
    
        if (!data.category) {
            setIsLoading(false)
            return toast.error('Kategori seçilmedi')
        }
    
        if (!images || images.length === 0) {
            setIsLoading(false)
            return toast.error('Resim seçilmedi')
        }
    
        let uploadedImages: string[] = []
    
        const handleImageUploads = async () => {
            toast('Ürün oluşturuluyor, lütfen bekleyin..')
            try {
                for (const item of images) {
                    if (item.image) {
                        const fileName = new Date().getTime() + '-' + item.image.name
                        const storage = getStorage(firebaseApp)
                        const storageRef = ref(storage, `products/${fileName}`)
                        const uploadTask = uploadBytesResumable(storageRef, item.image)
    
                        await new Promise<void>((resolve, reject) => {
                            uploadTask.on(
                                'state_changed',
                                (snapshot) => {
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                                    console.log("Upload is " + progress + '% done')
                                    switch (snapshot.state) {
                                        case 'paused':
                                            console.log('Upload is paused')
                                            break
                                        case 'running':
                                            console.log('Upload is running')
                                            break
                                    }
                                },
                                (error) => {
                                    console.log('Error uploading image', error)
                                    reject(error)
                                },
                                () => {
                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                        uploadedImages.push(downloadURL)
                                        console.log('File available at', downloadURL)
                                        resolve()
                                    }).catch((error: any) => {
                                        console.log('Error getting the download URL', error)
                                        reject(error)
                                    })
                                }
                            )
                        })
                    }
                }
            } catch (error) {
                setIsLoading(false)
                console.log('Error handling image uploads', error)
                return toast.error('Error handling image uploads')
            }
        }
    
        await handleImageUploads()
    
        const productData = { ...data, price: parseFloat(data.price), images: uploadedImages }
        console.log("productData", productData)
    
        axios.post('/api/product', productData)
            .then((response) => {
                const createdProductId = response.data.id
    
                uploadedImages.forEach(async (url) => {
                    await axios.post('/api/image', {
                        url: url,
                        productId: createdProductId
                    })
                })
    
                toast.success('Ürün oluşturuldu')
                setIsProductCreated(true)
                router.refresh()
            })
            .catch((error) => {
                console.error("Error creating product:", error)
                toast.error('Bir şeyler yanlış gitti')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const onChangeFunc = (e:React.ChangeEvent<HTMLInputElement>) => {}
    

    const category = watch('category')

    useEffect(() => {
        setCustomValue("images", images)
    }, [images])

    useEffect(() => {
        if (isProductCreated) {
            reset()
            setImages([])
            setIsProductCreated(false)
        }
    }, [isProductCreated])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (!prev) {
                return [value]
            }

            return [...prev, value]
        })
    }, [])

    const removeImageFromState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (prev) {
                const filteredImages = prev.filter((image) => image !== value)
                return filteredImages
            }
            return prev
        })
    }, [])

    return (
        <>
            <Heading text="ÜRÜN OLUŞTUR" center />
            <Input placeholder="Ad" type="text" id="name" disabled={isLoading} register={register} errors={errors} required />
            <Input placeholder="Açıklama" type="text" id="description" disabled={isLoading} register={register} errors={errors} required />
            <Input placeholder="Marka" type="text" id="brand" disabled={isLoading} register={register} errors={errors} required />
            <Input placeholder="Fiyat" type="number" id="price" disabled={isLoading} register={register} errors={errors} required />
            <Checkbox id="inStock" label="Ürün stokta mevcut mu ?" register={register} />
            <div className="flex flex-wrap gap-2">
                {categoryList.map((cat, i) => {
                    if (cat.name === "All") {
                        return null
                    }
                    return (
                        <div key={cat.name}>
                            <ChoiceInput key={i} icon={cat.icon} text={cat.name} onClick={(category) => setCustomValue("category", category)} selected={category === cat.name} />
                        </div>
                    )
                })}
            </div>
            <div className="relative w-full flex flex-col flex-wrap gap-4">
                <div className="p-3 pb-4">
                    <div className="font-bold pb-3">Ürün resimlerini ekle</div>
                    <input onChange={onChangeFunc} />
                </div>
            </div>
            <Button text={isLoading ? 'Loading...' : 'Ürün Oluştur'} onClick={handleSubmit(onSubmit)} />
        </>
    )
}

export default CreateForm*/
