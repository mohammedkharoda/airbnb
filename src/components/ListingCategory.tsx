"use client";
import React from "react";
import { IconType } from "react-icons";

interface ListCategoryProps {
  label: string;
  description: string;
}

const ListingCategory = ({ label, description }: ListCategoryProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-neutral-500 font-light">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
