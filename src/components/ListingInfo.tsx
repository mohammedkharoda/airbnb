'use client'
import React from 'react'
import { SafeUser } from '../types'
import { IconType } from 'react-icons';
import useCountries from '../hooks/useCountry';

interface ListingInfoProps {
    user:SafeUser;
    description:string;
    category:{label:string,icon:IconType,description:string}|any;
    bathroomCount:number;
    roomCount:number;
    guestCount:number;
    locationValue:string;
}

const ListingInfo = ({user,description,category,bathroomCount,roomCount,guestCount,locationValue}:ListingInfoProps) => {
    const {getByValue} = useCountries()
    const country = getByValue(locationValue)?.latlng
    return (
    <div>ListingInfo</div>
  )
}

export default ListingInfo