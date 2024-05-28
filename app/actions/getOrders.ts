import prisma from '@/libs/prismadb'


const getOrders = async () => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true
            },
            orderBy: {
                createDate: 'desc'
            }
        })

        return orders
    } catch (error:any) {
        console.log(error)
        return []
    }
}


export default getOrders