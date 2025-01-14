import axios from "axios";

interface DexPair {
  dexId: string;
  liquidity: { usd: number };
  volume: { h24: number };
  priceUsd: string;
  priceChange?: { h24: string };
}

interface MarketData {
  price: {
    current: string | undefined;
    change24h: string | undefined;
  };
  liquidity: {
    total: number | undefined;
    pairs: Array<{
      dex: string;
      liquidityUsd: number | undefined;
      volume24h: number | undefined;
    }>;
  };
  marketCap: number | undefined;
  volume24h: number | undefined;
  priceChange24h: number | undefined;
}

interface SecurityData {
  contractVerified: boolean | undefined;
  hasProxy: boolean | undefined;
  holderAnalysis: {
    topHoldersRisk: number | undefined;
    creatorHoldings: number | undefined;
    isHoneypot: boolean | undefined;
  };
  tradingAnalysis: {
    buyTax: string | undefined;
    sellTax: string | undefined;
    canTrade: boolean | undefined;
  };
}

interface HolderData {
  totalHolders: number | undefined;
  topHolders: Array<{
    address: string;
    balance: string;
    percentage: number;
  }>;
  holdersDistribution: {
    top10Percentage: number;
    top50Percentage: number;
  };
}

interface SocialData {
  twitter: {
    followers: number | undefined;
    status: string | undefined;
  };
  reddit: {
    subscribers: number | undefined;
    activeAccounts: number | undefined;
  };
  developer: {
    forks: number | undefined;
    stars: number | undefined;
    subscribers: number | undefined;
  };
}

interface ComprehensiveTokenData {
  market: MarketData;
  security: SecurityData;
  holders: HolderData;
  social: SocialData;
}

class TokenDataService {
  private dexscreenerApi = "https://api.dexscreener.com/latest/dex";
  private coingeckoApi = "https://api.coingecko.com/api/v3";
  private goPlusApi = "https://api.gopluslabs.io/api/v1";
  private moralisApi = "https://deep-index.moralis.io/api/v2";

  async getComprehensiveTokenData(
    address: string,
    chain: string
  ): Promise<ComprehensiveTokenData> {
    try {
      // Fetch data from multiple sources in parallel
      const [marketData, securityData, holderData, socialData] =
        await Promise.all([
          this.getMarketData(address, chain),
          this.getSecurityData(address, chain),
          this.getHolderData(address, chain),
          this.getSocialData(address),
        ]);

      return {
        market: marketData,
        security: securityData,
        holders: holderData,
        social: socialData,
      };
    } catch (error) {
      console.error("Error fetching comprehensive token data:", error);
      throw error;
    }
  }

  private async getMarketData(
    address: string,
    chain: string
  ): Promise<MarketData> {
    const dexResponse = await axios.get(
      `${this.dexscreenerApi}/tokens/${address}`
    );
    const cgResponse = await axios.get(
      `${this.coingeckoApi}/simple/token_price/${chain}?contract_addresses=${address}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
    );

    const dexData = dexResponse.data?.pairs[0];
    return {
      price: {
        current: dexData?.priceUsd,
        change24h: dexData?.priceChange?.h24,
      },
      liquidity: {
        total: dexData?.liquidity?.usd,
        pairs: dexResponse.data.pairs.map((pair: DexPair) => ({
          dex: pair.dexId,
          liquidityUsd: pair.liquidity?.usd,
          volume24h: pair.volume?.h24,
        })),
      },
      marketCap: cgResponse.data[address]?.usd_market_cap,
      volume24h: cgResponse.data[address]?.usd_24h_vol,
      priceChange24h: cgResponse.data[address]?.usd_24h_change,
    };
  }

  private async getSecurityData(
    address: string,
    chain: string
  ): Promise<SecurityData> {
    const securityResponse = await axios.get(
      `${this.goPlusApi}/token/security/${chain}/${address}`
    );
    const result = securityResponse.data.result;

    return {
      contractVerified: result.is_open_source,
      hasProxy: result.is_proxy,
      holderAnalysis: {
        topHoldersRisk: result.holder_count,
        creatorHoldings: result.creator_holdings,
        isHoneypot: result.is_honeypot,
      },
      tradingAnalysis: {
        buyTax: result.buy_tax,
        sellTax: result.sell_tax,
        canTrade: result.can_take_back_ownership,
      },
    };
  }

  private async getHolderData(
    address: string,
    chain: string
  ): Promise<HolderData> {
    const holdersResponse = await axios.get(
      `${this.moralisApi}/token/${address}/holders?chain=${chain}`,
      {
        headers: {
          "X-API-Key":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjY1MjJiZTg5LTJjMmEtNDRmMy1iODA0LTUxMGU2MWU2YzkwNiIsIm9yZ0lkIjoiNDI1Mzc2IiwidXNlcklkIjoiNDM3NTAxIiwidHlwZUlkIjoiYzYzMDZjZDYtMDgyYi00Zjg3LTk5ODYtNTFhMGM1ZTA1ODE2IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MzY2OTg3MTMsImV4cCI6NDg5MjQ1ODcxM30.ZoHdVdDb0zliX60cWbmSGV6FAhtWRDNL9xpxIhqxubo",
        },
      }
    );

    const holders = holdersResponse.data.result;
    return {
      totalHolders: holdersResponse.data.total,
      topHolders: holders.slice(0, 10).map((holder: any) => ({
        address: holder.address,
        balance: holder.balance,
        percentage: holder.percentage,
      })),
      holdersDistribution: {
        top10Percentage: this.calculateTopPercentage(holders, 10),
        top50Percentage: this.calculateTopPercentage(holders, 50),
      },
    };
  }

  private async getSocialData(address: string): Promise<SocialData> {
    const socialResponse = await axios.get(
      `${this.coingeckoApi}/coins/${address}/social_status`
    );
    const data = socialResponse.data;

    return {
      twitter: {
        followers: data.twitter_followers,
        status: data.twitter_status,
      },
      reddit: {
        subscribers: data.reddit_subscribers,
        activeAccounts: data.reddit_active_accounts,
      },
      developer: {
        forks: data.developer_data?.forks,
        stars: data.developer_data?.stars,
        subscribers: data.developer_data?.subscribers,
      },
    };
  }

  private calculateTopPercentage(holders: any[], limit: number): number {
    const totalSupply = holders.reduce(
      (sum, holder) => sum + Number(holder.balance),
      0
    );
    const topSum = holders
      .slice(0, limit)
      .reduce((sum, holder) => sum + Number(holder.balance), 0);
    return (topSum / totalSupply) * 100;
  }
}

export default new TokenDataService();
