import { Space_Grotesk, Raleway, Oswald } from "next/font/google";
// ...código existente...
import "@rainbow-me/rainbowkit/styles.css";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata = getMetadata({
  title: "Simple NFT Example | SpeedRunEthereum",
  description: "Built with 🏗 Scaffold-ETH 2",
});

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
        // filepath: i:\Proyectos\nft-store-saul\packages\nextjs\app\layout.tsx
    <html
      suppressHydrationWarning
      className={`
        ${spaceGrotesk.variable}
        ${raleway.variable}
        ${oswald.variable}
        font-space-grotesk
      `}
    >
      <body>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
