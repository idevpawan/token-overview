import { useState } from "react";
import SearchInput from "../components/SearchInput";
import { TokenData } from "../types";
import Chart from "../components/Chart";

function Dashboard() {
  const [tokenData, setTokenData] = useState<TokenData | undefined>(undefined);

  return (
    <div className="py-20 px-4 lg:px-10">
      <SearchInput setSelectedToken={setTokenData} />
      {tokenData && (
        <div className="w-full gap-5 lg:gap-10 mt-10 flex flex-col lg:grid grid-cols-3">
          <div className="bg-[#131722] rounded-md border border-[#363A45] col-span-1 p-4">
            <div className="flex items-center gap-3">
              <img
                src={tokenData.info?.imageUrl ?? ""}
                width={40}
                height={40}
                alt="token_image"
                className="rounded-full"
              />
              <p className="text-lg font-bold">
                {tokenData.baseToken.name}{" "}
                <span className="font-normal text-gray-500">
                  {tokenData.baseToken.symbol}
                </span>
              </p>
            </div>
            <div className="mt-3">
              <p className="text-sm font-semibold">
                Price: ${tokenData.priceUsd}
              </p>
              <p className="text-sm font-semibold mt-1">
                Market Cap: ${tokenData.marketCap}
              </p>
              <p className="text-sm font-semibold mt-1">
                24h Price Change: {tokenData.priceChange.h24}%
              </p>
              <p className="text-sm font-semibold mt-1">
                Liquidity (USD): ${tokenData.liquidity.usd}
              </p>
            </div>
          </div>
          <div className="col-span-2 tradingView-h">
            <Chart
              chain={tokenData?.chainId ?? ""}
              address={tokenData?.pairAddress ?? ""}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
