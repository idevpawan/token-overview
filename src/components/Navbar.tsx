import { useEffect } from "react";
import Button from "./Button";
import { useAccount, useConnect } from "wagmi";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const connector = connectors[0];

  useEffect(() => {
    if (account.address && account.isConnected) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [account]);

  return (
    <nav className="px-8 w-full absolute z-10 py-2 h-[50px] border-b border-[#363A45] flex items-center justify-between">
      <p>TokenSight</p>
      {account.address && account.isConnected ? (
        <p className="text-sm text-gray-400">
          Address:{" "}
          <span className="text-white font-semibold uppercase">
            {account.address?.slice(0, 4) + "..." + account.address?.slice(-4)}
          </span>
        </p>
      ) : (
        <Button
          key={connector.uid}
          onClick={() => connect({ connector })}
          size="small"
          variant="outline"
          label="Connect Wallet"
        />
      )}
    </nav>
  );
}

export default Navbar;
