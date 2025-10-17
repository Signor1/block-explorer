"use client";
import { useStacks } from "@/hooks/use-stacks";
import { abbreviateAddress } from "@/lib/stx-utils";
import { createAddress } from "@stacks/transactions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

/**
 * A navigation bar component that displays a search bar, a button for connecting to a wallet,
 * and a button for disconnecting from a wallet. If a user is connected to a wallet,
 * it also displays a button for quickly viewing the user's own transaction history.
 *
 * @returns A JSX element representing the navigation bar.
 */
export function Navbar() {
    const router = useRouter();

    const [searchAddress, setSearchAddress] = useState("");

    const { userData, connectWallet, disconnectWallet } = useStacks();

    // optional chaining (?.) to prevent errors if the data is not yet loaded.
    const stxAddress = userData?.addresses?.stx?.[0]?.address;

    /**
     * Handles search bar input. Checks if the input is a valid mainnet Stacks address starting with 'SP'.
     * If the address is valid, redirects to /SP... which will show the txn history for this address.
     * If the address is invalid, shows an error toast with the error message.
     */
    function handleSearch() {
        if (!searchAddress.startsWith("SP")) {
            toast.error("Please enter a valid mainnet Stacks address starting with 'SP'");
            return;
        }

        try {
            createAddress(searchAddress);
        } catch (error) {
            toast.error(`Invalid Stacks address entered: ${error}`);
            return;
        }

        // redirect to /SP... which will show the txn history for this address
        router.push(`/${searchAddress}`);
    }

    return (
        <nav className="flex w-full items-center justify-between gap-4 p-4 h-16 border-b border-gray-500">
            <Link href="/" className="text-2xl font-bold">
                Stacks Account History
            </Link>

            <input
                type="text"
                placeholder="SP..."
                className="w-96 rounded-lg bg-gray-700  px-4 py-2 text-sm"
                onChange={(e) => setSearchAddress(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        // enter = search
                        handleSearch();
                    }
                }}
            />

            <div className="flex items-center gap-2">
                {/* If stxAddress is defined, show the disconnect wallet button, else show the connect wallet button */}
                {stxAddress ? (
                    <div className="flex items-center gap-2">
                        {/* button for quickly viewing the user's own transaction history */}
                        <button
                            type="button"
                            onClick={() =>
                                router.push(`/${stxAddress}`)
                            }
                            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            View {abbreviateAddress(stxAddress)}
                        </button>
                        <button
                            type="button"
                            onClick={disconnectWallet}
                            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Disconnect
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={connectWallet}
                        className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Connect Wallet
                    </button>
                )}
            </div>
        </nav>
    );
}