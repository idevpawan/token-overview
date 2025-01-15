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
                src={
                  tokenData.info?.imageUrl ??
                  "https://static.vecteezy.com/system/resources/thumbnails/040/155/881/small/dollar-coin-with-placeholder-showing-concept-icon-of-business-location-bank-location-design-vector.jpg"
                }
                width={40}
                height={40}
                alt="token_image"
                className="rounded-full"
              />
              <p className="text-sm truncate font-semibold">
                {tokenData?.baseToken.name}{" "}
                {tokenData.labels && (
                  <span className="text-xs border border-[#8c8c8c] px-1 rounded ml-2 text-[#8c8c8c] font-normal">
                    {tokenData.labels}
                  </span>
                )}
                <span className="text-xs ml-2 text-[#8c8c8c] font-normal">
                  {tokenData.baseToken.symbol} / {tokenData.quoteToken.symbol}
                </span>
              </p>
              <p className="text-base capitalize font-semibold">
                ${tokenData.priceUsd}
              </p>
            </div>
            {/* basic info */}
            <p className="mt-4 text-lg border-b border-gray-600">
              Basic Details
            </p>
            <div className="mt-3">
              <p className="text-sm flex justify-between text-[#aeaeae] mt-1">
                Market Cap:{" "}
                <span className="text-white font-semibold">
                  ${tokenData?.marketCap ?? "-"}
                </span>
              </p>
              <p className="text-sm flex justify-between text-[#aeaeae] mt-1">
                24h Price Change:{" "}
                <span className="text-white font-semibold">
                  {tokenData?.priceChange.h24 ?? "-"}%
                </span>
              </p>
              <p className="text-sm flex justify-between text-[#aeaeae] mt-1">
                Liqidity (USD):{" "}
                <span className="text-white font-semibold">
                  ${tokenData?.liquidity.usd ?? "-"}
                </span>
              </p>
              <p className="text-sm flex justify-between text-[#aeaeae] mt-1">
                FDV:{" "}
                <span className="text-white font-semibold">
                  ${tokenData?.fdv ?? "-"}
                </span>
              </p>
              <p className="text-sm flex justify-between text-[#aeaeae] mt-1">
                ChainID:{" "}
                <span className="text-white font-semibold">
                  {tokenData?.chainId ?? "-"}
                </span>
              </p>
              <p className="text-sm flex justify-between text-[#aeaeae] mt-1">
                Pair Address:{" "}
                <span className="text-white font-semibold">
                  {tokenData?.pairAddress.slice(0, 6) +
                    "..." +
                    tokenData?.pairAddress.slice(-6)}
                </span>
              </p>
              <p className="text-sm flex justify-between text-[#aeaeae] mt-1">
                Base Token:{" "}
                <span className="text-white font-semibold">
                  {tokenData?.baseToken.address.slice(0, 6) +
                    "..." +
                    tokenData?.baseToken.address.slice(-6)}
                </span>
              </p>
              <p className="text-sm flex justify-between text-[#aeaeae] mt-1">
                Pair Created at:{" "}
                <span className="text-white font-semibold">
                  {tokenData?.pairCreatedAt
                    ? new Date(tokenData.pairCreatedAt)
                        .toLocaleString()
                        .split(",")[0]
                    : "-"}
                </span>
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
