import prisma from '@/src/libs/prismadb'

export interface ILisitngParams{
    userId?:string
}

export default async function getListing(params:ILisitngParams) {
    try {
        const {userId} = params
        let query:any = {};
        if(userId){
            query.userId = userId
        }
        const listing = await prisma.listing.findMany({
            where: query,
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