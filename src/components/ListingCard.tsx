"use client";
import { Reservation, Listing, User } from "@prisma/client";
import React, { useCallback, useMemo } from "react";
import { SafeUser } from "../types";
import { useRouter } from "next/navigation";
import useCountries from "../hooks/useCountry";
import format from "date-fns/format";
import Image from "next/image";
import HeartButton from "./HeartButton";
import Button from "../common/Button";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disable: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: null | SafeUser | undefined;
}

const ListingCard = ({
  data,
  reservation,
  onAction,
  disable,
  actionLabel,
  currentUser,
  actionId = "",
}: ListingCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disable) {
        return;
      }

      onAction?.(actionId);
    },
    [disable, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = reservation.startDate;
    const end = reservation.endDate;

    if (
      !start ||
      !end ||
      isNaN(start as unknown as number) ||
      isNaN(end as unknown as number)
    ) {
      return null;
    }

    return `${format(start.getTime(), "pp")} - ${format(end.getTime(), "pp")}`;
  }, [reservation]);

  return (
    <>
      <div
        onClick={() => router.push(`/listings/${data.id}`)}
        className="col-span-1 cursor-pointer group"
      >
        <div className="flex flex-col gap-2 w-full">
          <div
            className="aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl"
          >
            <Image
              src={data.imageSrc}
              alt="listing"
              className="object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition"
              fill
            />
            <div
              className="
            absolute
            top-3
            right-3
          "
            >
              <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>
          </div>
          <div className="font-semibold text-lg">
            {location?.region} , {location?.label}
          </div>
          <div className="font-light text-neutral-800/60">
            {reservationDate || data.category}
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">${price}</div>
            {!reservation && <div className="font-light">night</div>}
          </div>
          {onAction && actionLabel && (
            <Button
              disabled={disable}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ListingCard;
