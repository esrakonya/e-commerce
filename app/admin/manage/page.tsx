import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getProducts from "@/app/actions/getProducts";
import Container from "@/app/components/Container";
import WarningText from "@/app/components/WarningText";
import CreateForm from "@/app/components/admin/CreateForm";
import ManageClient from "@/app/components/admin/ManageClient";
import AuthContainer from "@/app/components/containers/AuthContainer";


const Manage = async () => {
    const products = await getProducts({category: null})

    const currentUser =  await getCurrentUser();

    if(!currentUser || currentUser.role !== "ADMIN"){
        return (
            <WarningText text="Buraya erişimin yasak!" />
        )
    }
  return (
    <div className="pt-8">
        <Container>
          <ManageClient products={products} />
        </Container>
    </div>
  )
}

export default Manage