import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/modules/user/context/UserContext";
import { DriverProvider } from "@/modules/driver/context/DriverContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ambulance Booking System",
  description: "Fast & Reliable Ambulance Service",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <DriverProvider>
            {children}
          </DriverProvider>
        </UserProvider>
      </body>
    </html >
  );
}
