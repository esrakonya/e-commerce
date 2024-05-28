"use client"

import { Product } from '@prisma/client'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useCallback } from 'react'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import firebaseApp from '@/libs/firebase'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import formatPrice from '@/utils/formatPrice'
import Heading from '../general/Heading'
import Status from '../general/Status'
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from 'react-icons/md'
import ActionButton from '../general/ActionButton'

interface ManageClientProps {
    products: Product[]
}
const ManageClient:React.FC<ManageClientProps> = ({products}) => {
    const storage = getStorage(firebaseApp)
    const router = useRouter()

    let rows: any = []

    if(products){
        rows = products.map((product) => ({

                id: product.id,
                name: product.name,
                description: product.description,
                price: formatPrice(product.price),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                images: product.images,
            
            }))
    }

    const columns: GridColDef[] = [
        {field: "id", headerName: "ID", width: 220},
        {field: "name", headerName: "Name", width: 220},
        /*{field: "description", headerName: "Description", width: 200},*/
        {field: "price", headerName: "Fiyat", width: 100, renderCell: 
        (params) => {
            return (<div className='font-bold text-slate-800'>{params.row.price}</div>)
        }},
        {field: "category", headerName: "Kategori", width: 100},
        {field: "brand", headerName: "Marka", width: 100},
        {field: "inStock", 
            headerName: "Stok", 
            width: 120, 
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.inStock == true ? (<Status text='stokta mevcut'
                        icon={MdDone} bg='bg-green-500'
                        color='text-green-900' />) : (
                            <Status text='stokta yok'
                            icon={MdClose}
                            bg='bg-red-500'
                            color='text-red-600' />
                        )}
                    </div>
                )
            }
        },
        {field: "action", 
            headerName: "Hareketler", 
            width: 200, 
            renderCell: (params) => {
                return (
                    <div className='flex justify-between gap-4 w-full'>
                        <ActionButton icon={MdDelete} onClick={() => handleDelete(params.row.id, params.row.images)} />
                        <ActionButton icon={MdCached} onClick={() => handleToggleStock(params.row.id, params.row.inStock)} />
                        <ActionButton icon={MdRemoveRedEye} onClick={() => {
                            router.push(`/product/${params.row.id}`)
                        }} />
                    </div>
                )
            }
        },
    ]

    const handleDelete = useCallback(async (id: string, images: any) => {
        toast.success('Ürün siliniyor lütfen bekleyiniz..')
        const handleDeleteImage = async () => {
            try {
                for(const item of images){
                    if(item.image){
                        const imageRef = ref(storage, item.image)
                        await deleteObject(imageRef)
                        console.log('resim silindi', item.image)
                    }
                }
            } catch (error) {
                return console.log("hata var", error)
            }
        }
        await handleDeleteImage()
        axios.delete(`/api/product/${id}`)
        .then(() => {
            toast.success('Sildirme işlemi başarılı...')
            router.refresh()
        })
        .catch((error:any) => {
            console.log(error)
        })
    }, [])

    const handleToggleStock = useCallback(async (id: string, inStock: boolean) => {
        axios.put('/api/product', {
            id,
            inStock: !inStock,
        }).then((res) => {
            toast.success("Ürünün stoğu değişti")
            router.refresh()
        }).catch((err) => {
            toast.error('Bir şeyler yanlış gitti')
            console.log(err)
        })
    }, [])

  return (
    <div className='ml-12 max-w-[1150px] rounded-lg m-auto text-xl border-zinc-300 border-[1.5px]'>
        <div className='mb-4 mt-8'>
            <Heading text='Ürünleri Yönet' center />
        </div>
        <div style={{height: 600, width: "%100"}}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10, 20]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>
    </div>
  )
}

export default ManageClient