'use client'
import React from 'react'
import { SafeUser } from '../types'
import useCountries from '../hooks/useCountry';
import Heading from './Heading';
import Image from 'next/image';
import HeartButton from './HeartButton';

interface ListingHeadProps{
    title:string;
    imageSrc:string;
    locationValue:string;
    id:string;
    currentUser?:SafeUser | null;
}

const ListingHead = ({title,imageSrc,locationValue,id,currentUser}:ListingHeadProps) => {
  const {getByValue} = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
    <Heading title={title} subtitle={`${location?.region},${location?.label}`} />
    <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
      <Image alt='Image' src={imageSrc} fill className='object-cover w-full'/>
    </div>
    </>
  )
}

export default ListingHead