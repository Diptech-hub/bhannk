import { NextResponse } from "next/server";
import axios from "axios";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/coins/markets";

export async function GET() {
  try {
    const response = await axios.get(COINGECKO_API_URL, {
      params: {
        vs_currency: "usd",
        category: "meme-token",
        order: "market_cap_desc",
        per_page: 50,
        page: 1,
        sparkline: true,
      },
    });

    return NextResponse.json({ memeCoins: response.data });
  } catch (error) {
    console.error("Error fetching meme coins:", error);
    return NextResponse.json(
      { error: "Failed to fetch meme coin data" },
      { status: 500 }
    );
  }
}
