"use client"

import { Order, Product, User } from '@prisma/client'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import formatPrice from '@/utils/formatPrice'
import Heading from '../general/Heading'
import Status from '../general/Status'
import { MdDeliveryDining, MdDone, MdRemoveRedEye } from 'react-icons/md'
import ActionButton from '../general/ActionButton'
import moment from 'moment'

interface ManageOrdersClientProps {
    orders: ExtendedOrder[]
}

type ExtendedOrder = Order & {
    user: User
}

const ManageOrdersClient:React.FC<ManageOrdersClientProps> = ({orders}) => {

    const router = useRouter()

    let rows: any = []

    if(orders){
        rows = orders.map((order) => ({

                id: order.id,
                customer: order.user.name,
                amount: formatPrice(order.amount / 100),
                paymentStatus: order.status,
                date: moment(order.createDate).fromNow(),
                deliveryStatus: order.deliveryStatus,
            
            }))
    }

    const columns: GridColDef[] = [
        {field: "id", headerName: "ID", width: 220},
        {field: "customer", headerName: "Müşteri Adı", width: 130},
        {field: "amount", headerName: "Miktar", width: 130, renderCell: 
        (params) => {
            return (<div className='font-bold text-slate-800'>{params.row.amount}</div>)
        }},
        {field: "paymentStatus", 
            headerName: "Ödeme Durumu", 
            width: 130,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.paymentStatus == 'pending' ? (<Status text='beklemede'
                        icon={MdDone} bg='bg-green-500'
                        color='text-green-900' />) : params.row.paymentStatus === 'complete' ? (
                            <Status text='tamamlandı'
                            icon={MdDone}
                            bg='bg-green-200'
                            color='text-green-600' />
                        ) : (<></>)}
                    </div>
                )
            }
        },
        {field: "deliveryStatus", 
            headerName: "Delivery Status", 
            width: 130, 
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.deliveryStatus == 'pending' ? (<Status text='beklemede'
                        icon={MdDone} bg='bg-green-500'
                        color='text-green-900' />) : params.row.deliveryStatus === 'dispatched' ? (
                            <Status text='dispatched'
                            icon={MdDeliveryDining}
                            bg='bg-purple-200'
                            color='text-purple-600' />
                        ) : params.row.deliveryStatus === 'delivered' ? (
                            <Status text='delivered'
                            icon={MdDone}
                            bg='bg-green-200'
                            color='text-green-600' />
                        ) : <></>}
                    </div>
                )
            }
        },
        {
            field: "date",
            headerName: "Date",
            width: 130,
        },
        {field: "action", 
            headerName: "Actions", 
            width: 200, 
            renderCell: (params) => {
                return (
                    <div className='flex justify-between gap-4 w-full'>
                        <ActionButton icon={MdDone} onClick={() => handleDeliver(params.row.id)} />
                        <ActionButton icon={MdDeliveryDining} onClick={() => handleDispatch(params.row.id)} />
                        <ActionButton icon={MdRemoveRedEye} onClick={() => {
                            router.push(`/order/${params.row.id}`)
                        }} />
                    </div>
                )
            }
        },
    ]

    const handleDeliver = useCallback((id: string) => {
        axios.put('/api/order', {
            id,
            deliveryStatus: 'delivered'
        }).then((res) => {
            toast.success("Order Delivered")
            router.refresh()
        }).catch((err) => {
            toast.error('Bir şeyler yanlış gitti')
            console.log(err)
        })
    }, [])

    const handleDispatch = useCallback((id: string) => {
        axios.put('/api/order', {
            id,
            deliveryStatus: 'dispatched'
        }).then((res) => {
            toast.success("Order Dispatched")
            router.refresh()
        }).catch((err) => {
            toast.error('Bir şeyler yanlış gitti')
            console.log(err)
        })
    }, [])

  return (
    <div className='ml-12 max-w-[1150px] rounded-lg m-auto text-xl border-zinc-300 border-[1.5px]'>
        <div className='mb-4 mt-8'>
            <Heading text='Siparişleri Yönet' center />
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

export default ManageOrdersClient