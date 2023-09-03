'use client'
import React, { useMemo } from 'react'
import {Reservation} from '@prisma/client'
import { SafeListing, SafeUser } from '@/src/types'
import { categories } from '@/src/components/Categories';
import Container from '@/src/common/Container';
import ListingHead from '@/src/components/ListingHead';
import ListingInfo from '@/src/components/ListingInfo';

interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListing & {
      user: SafeUser;
      updatedAt: string;
      Date:any
    };
    currentUser?: SafeUser | null;
}

const ListingClient = ({reservations,listing,currentUser}:ListingClientProps) => {
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category)
    }, [listing.category])
  return (
    <Container>
    <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
            <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue} id={listing.id} currentUser={currentUser}/>
            <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
              <ListingInfo user={listing.user} category={listing.category} description={listing.description} roomCount={listing.roomCount} guestCount={listing.guestCount} bathroomCount={listing.bathroomCount} locationValue={listing.locationValue} />
            </div>
        </div>
    </div>
    </Container>
  )
}

export default ListingClient