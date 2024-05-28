import { getCurrentUser } from "@/app/actions/getCurrentUser";
import Container from "@/app/components/Container";
import WarningText from "@/app/components/WarningText";
import getOrdersByUserId from "../actions/getOrdersByUserId";
import OrderClient from "./OrderClient";



const Orders = async () => {

    const currentUser = await getCurrentUser()

    const orders = await getOrdersByUserId(currentUser.id)

    if(!orders){
        return (
            <WarningText text="Henüz siparişin yok" />
        )
    }

    
  return (
    <div className="pt-8">
        <Container>
          <OrderClient orders={orders} />
        </Container>
    </div>
  )
}

export default Orders