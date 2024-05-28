import { getCurrentUser } from "@/app/actions/getCurrentUser"
import WarningText from "@/app/components/WarningText";
import CreateForm from "@/app/components/admin/CreateForm";
import PageContainer from "@/app/components/containers/PageContainer";


const CreateProduct = async () => {
    const currentUser =  await getCurrentUser();

    if(!currentUser || currentUser.role !== "ADMIN"){
        return (
            <WarningText text="Bu sayfaya erişimin yasak!" />
        )
    }
    return (
        <PageContainer>
            <CreateForm />
        </PageContainer>
    )
}

export default CreateProduct