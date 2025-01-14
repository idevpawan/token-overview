import Button from "../components/Button";
import { useConnect } from "wagmi";

export default function Landing() {
  return (
    <div className="bg-gradient-to-b relative  min-h-screen">
      <div className="h-screen w-full flex items-center justify-center">
        <WelcomeUi />
      </div>
    </div>
  );
}

function WelcomeUi() {
  const { connectors, connect } = useConnect();
  const connector = connectors[0];

  return (
    <div className="text-center max-w-[700px]">
      <p className="leading-[70px] text-6xl font-semibold">
        Welcome to TokenSight{" "}
      </p>
      <p className="text-base text-gray-400 my-2">
        Your go-to dashboard for exploring token insights. Connect your wallet
        to analyze token statistics, track liquidity, and view real-time charts
        for DeFi tokens on DEXs.
      </p>

      <Button
        key={connector.uid}
        onClick={() => connect({ connector })}
        className="mt-4"
        label={"Connect Wallet"}
      />
    </div>
  );
}
