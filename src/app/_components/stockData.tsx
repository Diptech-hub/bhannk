"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Stock {
  symbol: string;
  currentPrice?: number;
  highPrice?: number;
  lowPrice?: number;
  openPrice?: number;
  prevClose?: number;
}

const StockList = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get("/api/stocks");
        setStocks(response.data.stocks);
      } catch (err) {
        console.error("Error fetching stock data:", err);
        setError("Failed to load stock market data");
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div className="p-6 bg-[#1F1F21] text-white rounded-lg shadow-lg w-full max-w-6xl">
      <h2 className="text-xl font-bold mb-4 bg-[#2A2A2D] p-3 rounded-md">
        Stock Market Overview
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading stock data...</p>
      ) : error ? (
        <p className="text-red-400 text-center">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2A2A2D] text-gray-300">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Symbol</th>
                <th className="p-3 text-left">Current Price</th>
                <th className="p-3 text-left">High</th>
                <th className="p-3 text-left">Low</th>
                <th className="p-3 text-left">Open</th>
                <th className="p-3 text-left">Prev Close</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr
                  key={stock.symbol}
                  className="border-b border-[#2A2A2D] hover:bg-[#2A2A2D] transition rounded-lg mt-2"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-bold text-gray-400">{stock.symbol}</td>
                  <td className="p-3">{stock.currentPrice !== undefined ? `$${stock.currentPrice.toFixed(2)}` : "N/A"}</td>
                  <td className="p-3 text-green-500">{stock.highPrice !== undefined ? `$${stock.highPrice.toFixed(2)}` : "N/A"}</td>
                  <td className="p-3 text-red-500">{stock.lowPrice !== undefined ? `$${stock.lowPrice.toFixed(2)}` : "N/A"}</td>
                  <td className="p-3">{stock.openPrice !== undefined ? `$${stock.openPrice.toFixed(2)}` : "N/A"}</td>
                  <td className="p-3">{stock.prevClose !== undefined ? `$${stock.prevClose.toFixed(2)}` : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StockList;
