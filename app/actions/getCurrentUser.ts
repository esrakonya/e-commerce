/*import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from '@/libs/prismadb';


export async function getSession() {
    return await getServerSession(authOptions)
}

export async function getCurrentUser() {
    try {
        const session = await getServerSession();

        if(!session?.user?.email){
            return null
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            },
            include: {
                orders: true
            }
        })

        if(!currentUser){
            return null
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updateAt: currentUser.updateAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        }
    } catch (error: any) {
        console.log(error)
    }
}*/



import { getServerSession } from "next-auth";
import prisma from '@/libs/prismadb';

export async function getCurrentUser() {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            },
            include: {
                orders: true
            }
        });

        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updateAt: currentUser.updateAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        };
    } catch (error: any) {
        console.error("Error in getCurrentUser:", error);
        return null; // Hata durumunda null döndürün
    }
}
