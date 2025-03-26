import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const API_KEY = process.env.FINNHUB_API_KEY;
    if (!API_KEY) {
      return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    // Fetch top 50 stocks
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_KEY}`
    );

    if (!response.data) {
      return NextResponse.json({ error: "No stock data available" }, { status: 404 });
    }

    return NextResponse.json({ stocks: response.data.slice(0, 50) });
  } catch (error) {
    console.error("Error fetching stocks:", error);
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 });
  }
}
