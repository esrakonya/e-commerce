import { getCurrentUser } from "../actions/getCurrentUser"
import CartClient from "../components/cart/CartClient"


const Cart = async () => {
    const currentUser = await getCurrentUser()
    return (
        <div className="pt-8">
            <CartClient currentUser={currentUser} />
        </div>
    )
}

export default Cart