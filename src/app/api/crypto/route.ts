import { NextResponse } from "next/server";
import axios from "axios";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/coins/markets";

export async function GET() {
  try {
    const response = await axios.get(COINGECKO_API_URL, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 50,
        page: 1,
        sparkline: false,
        price_change_percentage: "24h", 
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cryptos = response.data.map((crypto: any) => ({
      name: crypto.name,
      symbol: crypto.symbol.toUpperCase(),
      image: crypto.image,
      currentPrice: crypto.current_price,
      marketCap: crypto.market_cap.toLocaleString(),
      change24h: crypto.price_change_percentage_24h?.toFixed(2) ?? "N/A",
    }));

    return NextResponse.json({ cryptos });
  } catch (error) {
    console.error("Error fetching cryptocurrencies:", error);
    return NextResponse.json(
      { error: "Failed to fetch cryptocurrency data" },
      { status: 500 }
    );
  }
}
