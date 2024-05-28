"use client"
import { useCallback } from "react"
import { ImageType } from "../admin/CreateForm"
import { useDropzone } from 'react-dropzone'

interface ImageProps{
    item?: ImageType
    handleFileChange: (value: File) => void
}

const ImagePreview:React.FC<ImageProps> = ({ item, handleFileChange }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length > 0){
            handleFileChange(acceptedFiles[0])
        }
    }, [handleFileChange])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [".jpeg", ".jpg", ".png"] }
    })

    return (
        <div {...getRootProps()}
        className="border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center"
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the image here...</p>
            ) : (
                <p>Drag drop some files here</p>
            )}
        </div>
    )
}

export default ImagePreview