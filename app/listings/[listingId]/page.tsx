import ClientOnly from '@/app/ClientOnly';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getListById from '@/app/actions/getListById';
import EmptyState from '@/src/components/EmptyState';
import ListingClient from './ListingClient';


interface IParamsprops {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParamsprops }) => {
    const listing = await getListById(params);
    const currentUser = getCurrentUser()
    if(!listing){
        return(
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            {/* @ts-ignore */}
            <ListingClient listing={listing} currentUser={currentUser}/>
        </ClientOnly>
    )
}

export default ListingPage