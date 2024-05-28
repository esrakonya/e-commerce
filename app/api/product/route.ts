

import { getCurrentUser } from '@/app/actions/getCurrentUser';
import prisma from '@/libs/prismadb'
import { error } from 'console';
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser) return NextResponse.error()

    if(currentUser.role !== "ADMIN"){
        return NextResponse.error()
    }
    const body = await request.json()
    const {name, description, brand, category, price, inStock, images } = body;

    try {
        const product = await prisma.product.create({
            data : {
                name, 
                description,
                brand,
                category,
                price: parseFloat(price),
                inStock,
                images: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTHrGgYGcy574s04Gsd2kPMUJIvVeeolwMJC23vagoqRQPBOGyk0fqx95StpLoFs7aTgHAsmhxe1YnOGcz1LZzdfqt1jQ63thK-OrV3LO6TB8BOV8lHgWAd&usqp=CAE'
            }
        }).catch((error) => {
            console.log("Prisma error", error)
        })
    
        return NextResponse.json(product)
    } catch (error) {
        console.log("Prisma error", error)
        return NextResponse.error()
    }
}


export async function PUT(request:Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser || currentUser.role !== "ADMIN"){
        return NextResponse.error()
    }

    const body = await request.json()
    const {id, inStock} = body

    const product = await prisma.product.update({
        where: {id:id},
        data: {inStock}
    })

    return NextResponse.json(product)
}