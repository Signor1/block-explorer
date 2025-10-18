'use client';

import React, { useMemo } from 'react'
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

const TxnDetailsTop = ({ address }: { address: string }) => {

    const currentNetwork = useMemo(() => {
        if (address.startsWith("SP")) {
            return 'mainnet';
        } else {
            return 'testnet';
        }
    }, [address]);

    const networkExplorer = useMemo(() => {
        if (address.startsWith("SP")) {
            return `https://explorer.hiro.so/address/${address}`;
        } else {
            return `https://explorer.hiro.so/address/${address}?chain=testnet`;
        }
    }, [address]);

    return (
        <div className="flex items-center gap-4">

            <span
                className={`text-xs font-bold capitalize px-2 py-1 border-[1px] rounded-full ${currentNetwork === 'mainnet'
                    ? 'border-green-500 text-green-500'
                    : 'border-amber-500 text-amber-500'
                    }`}
            >
                {currentNetwork}
            </span>
            <h1 className="text-3xl font-bold">{address}</h1>
            <Link
                href={networkExplorer}
                target="_blank"
                className="rounded-lg flex gap-1 bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                <ExternalLinkIcon className="h-4 w-4" />
                View on Hiro
            </Link>
        </div>
    )
}

export default TxnDetailsTop