import Container from "../components/Container"
import CheckoutClient from "../components/checkout/CheckoutClient"


const Checkout = () => {
  return (
    <div className="p-8">
        <Container>
          <CheckoutClient />
        </Container>
    </div>
  )
}

export default Checkout