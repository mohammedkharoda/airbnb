"use client";
import React from "react";
import { SafeUser } from "../types";
import { IconType } from "react-icons";
import useCountries from "../hooks/useCountry";
import dynamic from "next/dynamic";
import Avatar from "./Avatar";
import ListingCategory from "./ListingCategory";

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  category: { label: string; icon: IconType; description: string } | any;
  bathroomCount: number;
  roomCount: number;
  guestCount: number;
  locationValue: string;
  title: string;
}

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

const ListingInfo = ({
  user,
  description,
  category,
  bathroomCount,
  roomCount,
  guestCount,
  locationValue,
  title,
}: ListingInfoProps) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  console.log({ category });
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && <ListingCategory label={category} description={title} />}
      <hr />
      <div
        className="
      text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
