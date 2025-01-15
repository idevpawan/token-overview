import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { SearchInputProps, TokenData } from "../types";

function SearchInput({ setSelectedToken }: SearchInputProps) {
  const [list, setList] = useState<TokenData[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFetchToken = async () => {
    if (searchValue.length >= 2) {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://api.dexscreener.com/latest/dex/search/?q=${searchValue}`
        );
        setList(res.data.pairs);
      } catch (error) {
        console.error("Error fetching token data:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setList([]);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleFetchToken();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  const handleSelectToken = (token: TokenData) => {
    setSelectedToken(token);
    setSearchValue("");
    setList([]);
  };

  return (
    <div className="max-w-screen-sm relative">
      <div className="flex items-center border gap-2 p-2 border-[#363A45] px-4 rounded-md">
        <Search className="text-[#7c7c7c]" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full bg-transparent outline-none placeholder:text-[#7c7c7c]"
          placeholder="Search token, address or liquidity pool pair"
        />
      </div>
      {searchValue.length > 0 && (
        <div className="mt-2 border absolute w-full bg-[#0b0b0b] border-[#363A45] rounded-md h-80 overflow-auto space-y-2 p-3">
          {isLoading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : list.length === 0 ? (
            <p className="text-center mt-10">No token found!</p>
          ) : (
            list.map((pair, i) => (
              <div
                key={i}
                className={`flex cursor-pointer hover:bg-zinc-900 gap-2 rounded-md p-2.5 justify-between`}
                onClick={() => handleSelectToken(pair)}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={
                      pair?.info?.imageUrl ??
                      "https://static.vecteezy.com/system/resources/thumbnails/040/155/881/small/dollar-coin-with-placeholder-showing-concept-icon-of-business-location-bank-location-design-vector.jpg"
                    }
                    width={20}
                    height={20}
                    className="rounded-full"
                    alt="token_image"
                  />
                  <p className="text-sm  font-semibold">
                    {pair?.baseToken.name}{" "}
                    {pair.labels && (
                      <span className="text-xs border border-[#8c8c8c] px-1 rounded ml-2 text-[#8c8c8c] font-normal">
                        {pair.labels}
                      </span>
                    )}
                    <span className="text-xs ml-2 text-[#8c8c8c] font-normal">
                      {pair.baseToken.symbol} / {pair.quoteToken.symbol}
                    </span>
                  </p>
                  <p className="text-xs capitalize font-semibold">
                    ${pair.priceUsd}
                  </p>
                </div>
                <div>
                  <p className="text-[#8c8c8c] text-xs capitalize">
                    {pair.dexId}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchInput;
