import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/user/context/UserContext";
import { DriverProvider } from "@/driver/context/DriverContext";
import { ThemeProvider } from "@/common/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AmbuConnect",
  description: "Fast & Reliable Ambulance Service",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <UserProvider>
            <DriverProvider>
              {children}
            </DriverProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
