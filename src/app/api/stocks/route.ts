import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const API_KEY = process.env.FINNHUB_API_KEY;
    if (!API_KEY) {
      return NextResponse.json(
        { error: "API key is missing" },
        { status: 500 }
      );
    }

    const symbolResponse = await axios.get(
      `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_KEY}`
    );

    if (!symbolResponse.data) {
      return NextResponse.json(
        { error: "No stock data available" },
        { status: 404 }
      );
    }

    const topStocks = symbolResponse.data.slice(0, 50); // Get first 50 stocks

    const stockDataPromises = topStocks.map(
      async (stock: { symbol: string }) => {
        try {
          const [priceResponse, profileResponse] = await Promise.all([
            axios.get(
              `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${API_KEY}`
            ),
            axios.get(
              `https://finnhub.io/api/v1/stock/profile2?symbol=${stock.symbol}&token=${API_KEY}`
            ),
          ]);

          return {
            symbol: stock.symbol,
            name: profileResponse.data.name || "N/A",
            logo: profileResponse.data.logo || null,
            currentPrice: priceResponse.data.c,
            highPrice: priceResponse.data.h,
            lowPrice: priceResponse.data.l,
            openPrice: priceResponse.data.o,
            prevClose: priceResponse.data.pc,
          };
        } catch (err) {
          console.error(`Error fetching data for ${stock.symbol}:`, err);
          return null; // Skip stock if data fetch fails
        }
      }
    );

    // Resolve all fetch promises
    const stocksWithDetails = (await Promise.all(stockDataPromises)).filter(
      Boolean
    );

    return NextResponse.json({ stocks: stocksWithDetails });
  } catch (error) {
    console.error("Error fetching stocks:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock data" },
      { status: 500 }
    );
  }
}
