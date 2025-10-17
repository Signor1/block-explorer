import {
  connect,
  disconnect,
  getLocalStorage,
  isConnected,
} from "@stacks/connect";
import { useEffect, useState } from "react";

type UserData = {
  addresses: {
    stx: { address: string }[];
    btc: { address: string }[];
  };
};

/**
 * A hook that provides wallet connection and disconnection functionality using the @stacks/connect library.
 * It returns the user's data and two functions to connect and disconnect the wallet.
 * Upon successful connection, it updates the user's data in the component's state.
 * If the connection fails, it logs an error to the console.
 */
export function useStacks() {
  const [userData, setUserData] = useState<UserData | null>(null);

  /**
   * Connects to the user's wallet using the @stacks/connect library.
   * Upon successful connection, it updates the user's data in the component's state.
   * If the connection fails, it logs an error to the console.
   */
  async function connectWallet() {
    try {
      await connect();
      setUserData(getLocalStorage());
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  }

  /**
   * Disconnects the user's wallet from the component using the @stacks/connect library.
   * Upon disconnection, it resets the user's data in the component's state to null.
   */
  function disconnectWallet() {
    disconnect();
    setUserData(null);
  }

  // Check if a session exists in local storage
  useEffect(() => {
    if (isConnected()) {
      // If a session exists in local storage, load it into the state
      setUserData(getLocalStorage());
    }
  }, []);

  // Return user data and wallet functions
  return { userData, connectWallet, disconnectWallet };
}
