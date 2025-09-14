import type { Metadata } from "next";
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './components/ThemeProvider';
import GSAPProvider from './components/landing/GSAPProvider';

export const metadata: Metadata = {
  title: "Dental Management System (DMS)",
  description: "Comprehensive dental clinic management system for Philippine dental practices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GSAPProvider>
          <ThemeProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeProvider>
        </GSAPProvider>
      </body>
    </html>
  );
}
