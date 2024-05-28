"use client"

import { Order } from "@prisma/client"
import Heading from "../general/Heading"
import formatPrice from "@/utils/formatPrice"
import Status from "../general/Status"
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md"
import moment from "moment"
import OrderItem from "./OrderItem"

interface OrderDetailsProps{
    order: Order
}

const OrderDetails:React.FC<OrderDetailsProps> = ({order}) => {


  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
        <div>
            <Heading text="Sipariş Detayları" />
        </div>
        <div>Sipariş ID: {order.id}</div>
        <div>
            Toplam Tutar:{" "} 
            <span className="font-bold">{formatPrice(order.amount)}</span>
        </div>
        <div className="flex gap-2 items-center">
            <div>Ödeme durumu:</div>
            <div>
                {order.status === 'pending' ? <Status
                text="beklemede"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700" 
                /> : order.status === 'complete' ? <Status
                text="tamamlandı"
                icon={MdDone}
                bg="bg-green-700"
                color="text-green-700" 
                /> : (<></>)}
            </div>
        </div>
        <div className="flex gap-2 items-center">
            <div>Delivery durumu:</div>
            <div>
                {order.deliveryStatus === 'pending' ? <Status
                text="beklemede"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700" 
                /> : order.deliveryStatus === 'dispatched' ? <Status
                text="tamamlandı"
                icon={MdDeliveryDining}
                bg="bg-purple-700"
                color="text-purple-700" 
                /> : order.deliveryStatus === 'delivered' ? <Status
                text="delivered"
                icon={MdDone}
                bg="bg-green-700"
                color="text-green-700" 
                /> : (<></>)}
            </div>
        </div>
        <div>Date: {moment(order.createDate).fromNow()}</div>
        <div>
            <h2 className="font-semibold mt-4 mb-2">Products ordered</h2>
            <div className="grid grid-cols-5 text-sm gap-4 pb-2 items-center">
                <div className="col-span-2 justify-self-start">PRODUCT</div>
                <div className="justify-self-center">PRICE</div>
                <div className="justify-self-center">QTY</div>
                <div className="justify-self-end">TOPLAM</div>
            </div>
            {order.products && order.products.map((item) => {
                return (
                    <div>
                        <OrderItem key={item.id} item={item}></OrderItem>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default OrderDetails