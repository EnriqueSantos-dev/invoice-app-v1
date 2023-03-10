import Header from "@/app/components/Header";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const fetchCache = "force-no-store";

async function getUserHasSession() {
  const session = await unstable_getServerSession(authOptions);
  if (!session) redirect("/login");
  return session;
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserHasSession();

  return (
    <>
      <div id="portal" />
      <Header session={session} />
      <main className="min-h-screen w-full bg-offWhite pt-[72px] transition-colors duration-300 dark:bg-mirage2 md:pb-0 lg:pl-[90px] lg:pt-0">
        {children}
      </main>
    </>
  );
}
