import Container from "@/src/common/Container";
import ClientOnly from "./ClientOnly";
import EmptyState from "@/src/components/EmptyState";
import getListing, { ILisitngParams } from "./actions/getListings";
import ListingCard from "@/src/components/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

interface HomeProps {
  searchParams:ILisitngParams
}

export default async function Home({ searchParams }: HomeProps) {
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
    <>
      <ClientOnly>
        <Container>
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listings: any) => {
              return (
                <ListingCard
                  disable
                  currentUser={currentUser}
                  key={listings.id}
                  data={listings}
                />
              );
            })}
          </div>
        </Container>
      </ClientOnly>
    </>
  );
}
