"use client"

import { Order, Product, User } from "@prisma/client"
import { useEffect, useState } from "react"
import Heading from "../components/general/Heading"
import { formatNumber } from "@/utils/formatNumber"
import formatPrice from "@/utils/formatPrice"


interface SummaryProps{
    orders: Order[]
    products: Product[]
    users: User[]
}

type SummaryDataType = {
    [key: string]: {
        label: string;
        digit: number;
    }
}

const Summary:React.FC<SummaryProps> = ({products, users, orders}) => {
    const [summaryData, setSummaryData] = useState<SummaryDataType>({
        sale: {
            label: 'Toplam Satış',
            digit: 0
        },
        products: {
            label: 'Toplam Ürünler',
            digit: 0
        },
        orders: {
            label: 'Toplam Siparişler',
            digit: 0
        },
        unpaidOrders: {
            label: 'Ödemesi Yapılmamış Siparişler',
            digit: 0
        },
        users: {
            label: 'Kullanıcılar',
            digit: 0
        }
    })

    useEffect(() => {
        setSummaryData((prev) => {
            let tempData = {...prev}

            const totalSale = orders.reduce((acc, item) => {
                if(item.status === 'complete'){
                    return acc + item.amount
                }else{
                    return acc
                }
            }, 0)

            const paidOrders = orders.filter((order) => {
                return order.status === 'complete'
            })

            const unpaidOrders = orders.filter((order) => {
                return order.status === 'pending'
            })

            tempData.sale.digit = totalSale
            tempData.orders.digit = orders.length
            //tempData.paidOrders.digit = paidOrders.length
            tempData.unpaidOrders.digit = unpaidOrders.length
            tempData.products.digit = products.length
            tempData.users.digit = users.length

            return tempData
        })
    }, [products, users, orders])

    const summaryKeys = Object.keys(summaryData)

    return (
        <div className="max-w-[1150px] p-25">
            <div className="text-4xl text-slate-700 mb-4 mt-8">
                <Heading text="Özetler" center />
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
                {
                    summaryKeys && summaryKeys.map((key) => {
                        return (
                            <div key={key} className="rounded-xl border-zinc-500 border-2 p-4 flex flex-col items-center gap-2 transition">
                                <div className="text-xl md:text-4xl font-bold">
                                    {
                                        summaryData[key].label === 'Toplam Satış' ? <>{formatPrice(summaryData[key].digit)}</> : <>
                                        {formatNumber(summaryData[key].digit)}</>
                                    }
                                </div>
                                <div>{summaryData[key].label}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default Summary