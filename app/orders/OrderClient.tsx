"use client"
import formatPrice from "@/utils/formatPrice"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Order, User } from "@prisma/client"
import moment from "moment"
import { useRouter } from "next/navigation"
import { MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md"
import Status from "../components/general/Status"
import ActionButton from "../components/general/ActionButton"
import { useCallback } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import Heading from "../components/general/Heading"




interface OrdersClientProps {
    orders: ExtendedOrder[]
}

type ExtendedOrder = Order & {
    user: User
}

const OrdersClient:React.FC<OrdersClientProps> = ({orders}) => {

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
            headerName: "Teslimat Durumu", 
            width: 130, 
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.deliveryStatus == 'pending' ? (<Status text='beklemede'
                        icon={MdDone} bg='bg-green-500'
                        color='text-green-900' />) : params.row.deliveryStatus === 'dispatched' ? (
                            <Status text='gönderimde'
                            icon={MdDeliveryDining}
                            bg='bg-purple-200'
                            color='text-purple-600' />
                        ) : params.row.deliveryStatus === 'delivered' ? (
                            <Status text='teslim edildi'
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
            headerName: "Tarih",
            width: 130,
        },
        {field: "action", 
            headerName: "Hareketler", 
            width: 200, 
            renderCell: (params) => {
                return (
                    <div className='flex justify-between gap-4 w-full'>
                        <ActionButton icon={MdRemoveRedEye} onClick={() => {
                            router.push(`/order/${params.row.id}`)
                        }} />
                    </div>
                )
            }
        },
    ]

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

export default OrdersClient