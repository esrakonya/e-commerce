

const getUsers = async () => {
    try {
        const users = prisma?.user.findMany()

        return users
    } catch (error: any) {
        throw new Error(error)
    }
}

export default getUsers