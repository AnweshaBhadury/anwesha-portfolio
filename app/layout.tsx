import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anwesha Bhadury",

  description:
    "Portfolio website of Anwesha Bhadury — Computer Science student passionate about AI, Machine Learning, intelligent systems, modern web applications, and impactful digital experiences.",

  keywords: [
    "Anwesha Bhadury",
    "Portfolio",
    "Computer Science",
    "Developer",
    "Frontend Developer",
    "Next.js",
    "React",
    "AI",
    "Machine Learning",
    "Web Developer",
  ],

  authors: [
    {
      name: "Anwesha Bhadury",
    },
  ],

  creator: "Anwesha Bhadury",

  metadataBase: new URL("https://anwesha-portfolio.vercel.app"),

  openGraph: {
    title: "Anwesha Bhadury Portfolio",

    description:
      "Computer Science student building intelligent systems, modern web applications, and impactful digital experiences.",

    url: "https://anwesha-portfolio.vercel.app",

    siteName: "Anwesha Portfolio",

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Anwesha Bhadury Portfolio",

    description:
      "Computer Science student passionate about AI, Machine Learning, and modern web development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >

      <body className="min-h-full flex flex-col bg-[#050816] text-white overflow-x-hidden">

        {children}

      </body>

    </html>
  );
}