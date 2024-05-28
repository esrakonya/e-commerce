import prisma from '@/libs/prismadb'


const getOrdersByUserId = async (userId: string) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true
            },
            orderBy: {
                createDate: 'desc'
            },
            where: {
                userId: userId
            }
        })

        return orders
    } catch (error:any) {
        console.log(error)
    }
}


export default getOrdersByUserId