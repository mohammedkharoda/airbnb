"use client";
import React from "react";
import Container from "../common/Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiDesert,
  GiForestCamp,
  GiIsland,
  GiUndergroundCave,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiingNordic } from "react-icons/fa";
import { FiCloudSnow } from "react-icons/fi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { IoDiamondOutline } from "react-icons/io5";
export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This is the property close to the beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This is the property has windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "Some Modern touch ups",
  },

  {
    label: "CountrySide",
    icon: TbMountain,
    description: "Near country side",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "Amazing Pools",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "Near the Islands",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "Near the Lake",
  },
  {
    label: "Skiing",
    icon: FaSkiingNordic,
    description: "Skiing Area site",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "Some Forest camps",
  },
  {
    label: "Artic",
    icon: FiCloudSnow,
    description: "Artic locations views",
  },
  {
    label: "Cave",
    icon: GiUndergroundCave,
    description: "Cave location views",
  },
  {
    label: "Desert",
    icon: GiDesert,
    description: "Desert location property",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "Barns near property",
  },
  {
    label: "Lux",
    icon: IoDiamondOutline,
    description: "Barns near property",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const categorys = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((category, index) => (
          <CategoryBox
            key={index}
            label={category.label}
            description={category.description}
            icon={category.icon}
            selected={categorys === category.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
