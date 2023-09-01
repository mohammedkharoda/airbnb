import prisma from '@/src/libs/prismadb'

export default async function getListing() {
    try {
        const listing = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return listing
    }
    catch (e: any) {
        throw new Error(e)
    }
}