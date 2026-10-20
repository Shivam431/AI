import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shivam Saxena | Senior Software Engineer & Modern Frontend Architect",
  description: "Enterprise meets edgy. Portfolio and career trajectory of Shivam Saxena, Senior Software Engineer 1 at HCLSoftware. Specializing in high-performance web applications, modern UI engineering, React.js, Next.js, and cutting-edge frontend architectures.",
  keywords: ["Shivam Saxena", "Senior Software Engineer", "HCLSoftware", "Frontend Architect", "React.js", "Next.js", "Tailwind CSS", "Modern UI", "Web Developer Noida"],
  openGraph: {
    title: "Shivam Saxena | Senior Software Engineer & Frontend Architect",
    description: "Enterprise meets edgy. 5+ years crafting mission-critical modern frontend architectures & ultra-responsive web experiences.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
