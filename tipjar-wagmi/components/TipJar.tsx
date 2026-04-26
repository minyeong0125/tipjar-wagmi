'use client';

import { useState } from 'react';
import { useAccount, useConnect, useWriteContract } from 'wagmi';

const CONTRACT_ADDRESS = '0xYourContract';
const ABI = [
  {
    name: 'sendTip',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: '_message', type: 'string' }],
    outputs: [],
  },
];

export default function TipJar() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { writeContract } = useWriteContract();

  const [message, setMessage] = useState('');

  const sendTip = async () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'sendTip',
      args: [message],
      value: BigInt(1e15), // 0.001 ETH
    });
  };

  return (
    <div>
      {!isConnected ? (
        <button onClick={() => connect({ connector: connectors[0] })}>
          Connect Wallet
        </button>
      ) : (
        <div>
          <p>Connected: {address}</p>

          <input
            placeholder="message"
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={sendTip}>Send Tip (0.001 ETH)</button>
        </div>
      )}
    </div>
  );
}
