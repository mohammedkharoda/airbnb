export const dynamic = "force-dynamic";

import Container from "@/src/common/Container";
import ClientOnly from "./ClientOnly";
import EmptyState from "@/src/components/EmptyState";
import getListing, { ILisitngParams } from "./actions/getListings";
import ListingCard from "@/src/components/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

interface HomeProps {
  searchParams: ILisitngParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListing(searchParams);
  const currentUser = await getCurrentUser();
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <div>
      <Container>
        <div
          className="pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8">
          {listings.map((listing) => {
            return (
              <ListingCard
                disable
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};
export default Home;