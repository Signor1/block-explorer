"use client";

import { useStacks } from "@/hooks/use-stacks";
import { redirect } from "next/navigation";

/**
 * The home page of the app. If the user's wallet is connected,
 * it redirects to the /SP... page to show their profile.
 * If the user's wallet is not connected, it shows a page
 * with instructions to connect their wallet or search for an address.
 */
export default function Home() {
  const { userData } = useStacks();

  const stxAddress = userData?.addresses?.stx?.[0]?.address;

  if (!stxAddress) {
    return (
      <main className="flex min-h-screen flex-col items-center gap-8 p-24">
        <span>Connect your wallet or search for an address</span>
      </main>
    );
  }

  redirect(`/${stxAddress}`);
}