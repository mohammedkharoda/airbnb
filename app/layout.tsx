import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "../src/components/Navbar";
import ClientOnly from "./ClientOnly";
import RegisterModal from "@/src/components/RegisterModal";
import ToasterProvider from "@/src/providers/ToasterProvider";
import LoginModal from "@/src/components/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
