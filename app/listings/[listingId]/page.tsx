import ClientOnly from "@/app/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListById from "@/app/actions/getListById";
import EmptyState from "@/src/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservation";

interface IParamsprops {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParamsprops }) => {
  const listing = await getListById(params);
  const reservation = await getReservations(params);
  const currentUser = getCurrentUser();
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ListingClient
        // @ts-ignore
        listing={listing}
        // @ts-ignore
        currentUser={currentUser}
        reservations={reservation}
      />
    </ClientOnly>
  );
};

export default ListingPage;
