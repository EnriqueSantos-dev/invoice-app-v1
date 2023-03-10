import ActiveBar from "@/app/components/ActiveBar";
import InvoiceItemSkeleton from "@/app/components/InvoiceSkeleton";
import dbGetInvoicesCount from "@/lib/prisma/db-get-invoices-count";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { Suspense } from "react";
import ControllerListInvoices from "./components/ControllerListInvoices";
import ErrorBoundaryFallback from "./components/ErrorBoundaryInvoices";

async function getData() {
  const session = await unstable_getServerSession(authOptions);
  const data = await dbGetInvoicesCount({ userId: session?.user.id! });
  return data;
}

export default async function Home() {
  const { count } = await getData();

  return (
    <div className="container h-[calc(100vh_-_72px)] pt-8 md:h-screen md:pt-10">
      <div className="relative flex h-full flex-col">
        <ActiveBar count={count} />
        <div className="relative mt-12 flex-1 overflow-y-auto rounded-t-lg scrollbar-hide">
          <div className="absolute top-0 left-0 right-0 z-0 grid grid-flow-row gap-6 h-auto pt-2 pb-4 px-1">
            <Suspense
              fallback={Array.from({ length: 8 }).map((_, index) => (
                <InvoiceItemSkeleton key={index} />
              ))}
            >
              <ErrorBoundaryFallback>
                <ControllerListInvoices />
              </ErrorBoundaryFallback>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
