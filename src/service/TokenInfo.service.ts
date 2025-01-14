import axios from "axios";

interface TokenData {
  basicInfo: {
    name: string;
    address: string;
    symbol: string;
    decimals: number;
    totalSupply: string;
    coinGeckoCoinId: string;
    priceUsd: string;
    fdvUsd: string;
    totalReserveUsd: string;
    volumeUsd: string;
    marketCapUsd: string;
  };
  advancedInfo: {
    // Placeholder for advanced token data (can be extended)
  };
  holderInfo: {
    // Placeholder for holder information
  };
  securityInfo: {
    // Placeholder for security info
  };
  liquidityInfo: {
    // Placeholder for liquidity info
  };
}

const fetchTokenData = async (chain: string, tokenAddress: string) => {
  try {
    const response = await axios.get(
      `https://api.geckoterminal.com/api/v2/networks/${chain}/tokens/${tokenAddress}`
    );
    const data = response.data.data;

    const tokenData: TokenData = {
      basicInfo: {
        name: data.attributes.name,
        address: data.attributes.address,
        symbol: data.attributes.symbol,
        decimals: data.attributes.decimals,
        totalSupply: data.attributes.total_supply,
        coinGeckoCoinId: data.attributes.coingecko_coin_id,
        priceUsd: data.attributes.price_usd,
        fdvUsd: data.attributes.fdv_usd,
        totalReserveUsd: data.attributes.total_reserve_in_usd,
        volumeUsd: data.attributes.volume_usd,
        marketCapUsd: data.attributes.market_cap_usd,
      },
      advancedInfo: {
        // You can extend this with additional API calls for advanced data
      },
      holderInfo: {
        // Placeholder for token holders data
      },
      securityInfo: {
        // Placeholder for security data (audit status, etc.)
      },
      liquidityInfo: {
        // Placeholder for liquidity-related data (like total liquidity, slippage, etc.)
      },
    };

    return tokenData;
  } catch (error) {
    console.error("Error fetching token data:", error);
    throw error;
  }
};

export default fetchTokenData;
