"use client";

import { ImageConfig } from "@/src/utils/ImageConfig";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <>
      <Image
        onClick={() => router.push("/")}
        alt="logo"
        className="hidden md:block cursor-pointer"
        height="100"
        width="100"
        src={ImageConfig.AIRBNB_LOGO}
      />
    </>
  );
};

export default Logo;
