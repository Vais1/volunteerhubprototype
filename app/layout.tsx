import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VolunteerHub | Centralized Volunteer Management System",
  description: "A web-based platform to streamline volunteer registration, scheduling, and reporting for organizations. Manage volunteers efficiently with real-time analytics and automated workflows.",
  keywords: ["volunteer management", "volunteer scheduling", "nonprofit", "organization management", "volunteer registration"],
  authors: [{ name: "VolunteerHub Team" }],
  openGraph: {
    title: "VolunteerHub | Centralized Volunteer Management System",
    description: "Streamline volunteer registration, scheduling, and reporting for your organization",
    type: "website",
  },
  icons: {
    icon: "/CS_Moon_13.svg",
    shortcut: "/CS_Moon_13.svg",
    apple: "/CS_Moon_13.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
