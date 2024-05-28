import prisma from '@/libs/prismadb'

export interface IProductParams {
    category?: string | null
    search?: string | null
}

const getProducts = async (params:IProductParams) => { 
    try{
        const {category, search} = params
        let query: any = {}
        let searchString = search
        if(!search){
            searchString = ""
        }
        

        if(category){
            query.category = category
        }
        const products = await prisma.product.findMany({
            where: {
                ...query,
                OR: [
                    {
                        name: {
                            contains: searchString,
                            mode: 'insensitive'
                        },
                        description: {
                            contains: searchString,
                            mode: 'insensitive'
                        },
                    }
                ]
            },
            include: {
                reviews: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdDate: 'desc'
                    }
                }
            }
        })

        if(!products){
            throw new Error("Ürün bulunamadı")
        }

        return products

    }catch(error:any){
        console.log(error)
    }
}

export default getProducts
