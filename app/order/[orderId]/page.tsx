import getOrderById from "@/app/actions/getOrderById"
import Container from "@/app/components/Container"
import WarningText from "@/app/components/WarningText"
import OrderDetails from "@/app/components/detail/OrderDetails"


interface IParams {
    orderId?: string
}

const Order = async ({params}: {params: IParams}) => {
    const order = await getOrderById(params)

    if(!order) return <WarningText text="Sipariş Yok" />
  return (
    <div className="p-8">
        <Container>
            <OrderDetails order={order} />
        </Container>
    </div>
  )
}

export default Order