"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <AuthProvider>
        <SidebarProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#00000',
              },
              success: {
                duration: 3000,
                style: {
                  background: '#fffff',
                },
              },
              error: {
                duration: 5000,
                style: {
                  background: '#ffffff',
                  color: '#00000',
                },
              },
            }}
          />
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
