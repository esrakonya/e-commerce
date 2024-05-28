
import getOrders from "../actions/getOrders"
import getUsers from "../actions/getUsers"
import Summary from "./Summary"
import getProducts from "../actions/getProducts"
import Container from "../components/Container"
import { getCurrentUser } from "../actions/getCurrentUser"
import WarningText from "../components/WarningText"


const Admin = async () => {
    const currentUser = await getCurrentUser()
    const products: any = await getProducts({category: undefined})
    const users: any = await getUsers()
    const orders: any = await getOrders()

    if(!currentUser || currentUser.role !== "ADMIN"){
      return (
          <WarningText text="Buraya erişimin yasak!" />
      )
  }
  return (
    <div className="items-center">
      {/* <Container>
        <Summary products={products} users={users} orders={orders} />
      </Container> */}
      <Summary products={products} users={users} orders={orders} />
    </div>
  )
}

export default Admin