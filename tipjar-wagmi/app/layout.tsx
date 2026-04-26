import { WagmiProvider } from 'wagmi';
import { config } from '../lib/config';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </body>
    </html>
  );
}
