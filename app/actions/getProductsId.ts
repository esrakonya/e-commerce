import prisma from '@/libs/prismadb'


interface IParams {
    productId?: string
}

const getProductsId = async (params: IParams) => {
    try {
        const {productId} = params
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            },
            include: {
                reviews: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdDate: "desc"
                    }
                }
            }
        })

        if(!productId){
            return null
        }

        return product
    } catch (error) {
        console.log(error)
    }
}


export default getProductsId