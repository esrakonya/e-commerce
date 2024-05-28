/*"use client"

import { useCallback, useEffect, useState } from "react"
import { ImageType } from "../admin/CreateForm"
import Button from "./Button"
import ImagePreview from "./ImagePreview"

interface SelectImageProps{
    item: ImageType
    addImageToState: (value: ImageType) => void
    removeImageFromState: (value: ImageType) => void
    isProductCreated: boolean
}

const SelectImage:React.FC<SelectImageProps> = ({
    addImageToState, removeImageFromState, isProductCreated
}) => {
    const [isSelected, setSelected] = useState(false)
    const [file, setFile] = useState<File | null>()

    useEffect(() => {
        if(isProductCreated){
            setSelected(false)
            setFile(null)
        }
    }, [isProductCreated])

    const handleFileChange = useCallback((value: File) => {
        setFile(value)
        addImageToState({image: value})
    }, [addImageToState])

    return (
        <div>
            <>
                {!file && (
                    <div className="col-span-2 text-center">
                        <ImagePreview handleFileChange={handleFileChange} />
                    </div>
                )}
                {file && (
                    <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
                        <p>{file?.name}</p>
                        <div className="w-40px">
                            <Button text="Sil" small outline onClick={() => {
                                setFile(null)
                                //removeImageFromState()
                            }} />
                        </div>
                    </div>
                )}
            </>
        </div>
    )
}


export default SelectImage*/



"use client"

import { useCallback, useEffect, useState } from "react"
import { useDropzone } from 'react-dropzone'
import Button from "./Button"

interface ImageType {
    image: File | null
}

interface SelectImageProps {
    addImageToState: (value: ImageType) => void
    removeImageFromState: (value: ImageType) => void
    isProductCreated: boolean
}

const SelectImage: React.FC<SelectImageProps> = ({
    addImageToState, removeImageFromState, isProductCreated
}) => {
    const [files, setFiles] = useState<File[]>([])

    useEffect(() => {
        if (isProductCreated) {
            setFiles([])
        }
    }, [isProductCreated])

    const handleFileChange = useCallback((value: File) => {
        setFiles(prevFiles => [...prevFiles, value])
        addImageToState({ image: value })
    }, [addImageToState])

    const handleRemoveImage = useCallback((file: File) => {
        setFiles(prevFiles => prevFiles.filter(f => f !== file))
        removeImageFromState({ image: file })
    }, [removeImageFromState])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => handleFileChange(file))
    }, [handleFileChange])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [".jpeg", ".jpg", ".png"] }
    })

    return (
        <div>
            <div {...getRootProps()} className="border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center">
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the image here...</p>
                ) : (
                    <p>Drag and drop some files here</p>
                )}
            </div>
            <div>
                {files.map((file, index) => (
                    <div key={index} className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
                        <p>{file.name}</p>
                        <Button text="Sil" small outline onClick={() => handleRemoveImage(file)} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectImage
