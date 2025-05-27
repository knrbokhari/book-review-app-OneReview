"use client";

import "@/css/satoshi.css";
import "@/css/style.css";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import HomeHeader from "@/components/Layouts/header/homeHeader";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import { DashboardSidebar } from "@/components/Layouts/dashboardSidebar";
import QueryProvider from "@/apis/client/query-provider";
import Footer from "@/components/ui/footer";
import { ModalProvider } from "@/components/ui/modal/modal.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManagedModal from "@/components/ui/modal/managed-modal";
import PrivateRoute from "@/utils/private-route";
import PrivateAdminRoute from "@/utils/private-admin-route";

export default function RootLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");
  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <html lang="en" suppressHydrationWarning={false}>
      <body>
        <ModalProvider>
          <QueryProvider>
            <Providers>
              <NextTopLoader color="#5750F1" showSpinner={false} />

              {isAdminRoute ? (
                <PrivateRoute>
                  <PrivateAdminRoute>
                    <div className="flex min-h-screen">
                      <Sidebar />

                      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
                        <Header />

                        <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                          {children}
                        </main>
                      </div>
                    </div>
                  </PrivateAdminRoute>
                </PrivateRoute>
              ) : isDashboardRoute ? (
                <PrivateRoute>
                  <div className="flex min-h-screen">
                    <DashboardSidebar />

                    <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
                      <Header />

                      <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                        {children}
                      </main>
                    </div>
                  </div>
                </PrivateRoute>
              ) : (
                <div className="flex min-h-screen">
                  <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
                    <HomeHeader />

                    <main className="max-w-screen-2xl- p-4-md:p-6-2xl:p-10 isolate mx-auto w-full overflow-hidden">
                      {children}
                    </main>
                    <Footer />
                  </div>
                </div>
              )}
            </Providers>
            <ManagedModal />
            <ToastContainer autoClose={2000} theme="colored" />
          </QueryProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
