import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getOrders from "@/app/actions/getOrders";
import Container from "@/app/components/Container";
import WarningText from "@/app/components/WarningText";
import ManageOrdersClient from "@/app/components/admin/ManageOrdersClient";



const ManageOrders = async () => {
    const orders = await getOrders();

    const currentUser =  await getCurrentUser();

    if(!currentUser || currentUser.role !== "ADMIN"){
        return (
            <WarningText text="Buraya erişimin yasak!" />
        )
    }
  return (
    <div className="pt-8">
        <Container>
          <ManageOrdersClient orders={orders} />
        </Container>
    </div>
  )
}

export default ManageOrders