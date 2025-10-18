import TxnDetailsTop from "@/components/txn-details-top";
import { TransactionsList } from "@/components/txns-list";
import { fetchAddressTransactions } from "@/lib/fetch-address-transactions";

export default async function Activity({
    params,
}: {
    params: Promise<{ address: string }>;
}) {
    // params contains parameters we can parse from the URL Route
    const { address } = await params;

    // Once we know the address, we fetch the initial 20 transactions
    const initialTransactions = await fetchAddressTransactions({ address });

    return (
        <main className="flex h-[100vh-4rem] flex-col p-8 gap-8">
            <TxnDetailsTop address={address} />

            <TransactionsList address={address} transactions={initialTransactions} />
        </main>
    );
}