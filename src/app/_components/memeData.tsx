"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MemeCoin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  sparkline_in_7d: { price: number[] };
}

const MemeCoins = () => {
  const [memeCoins, setMemeCoins] = useState<MemeCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemeCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/meme");
        setMemeCoins(response.data.memeCoins || []);
      } catch (err) {
        console.error("Error fetching meme coin data:", err);
        setError("Failed to load meme coin data");
      } finally {
        setLoading(false);
      }
    };

    fetchMemeCoins();
  }, []);

  return (
    <div className="p-6 bg-[#1F1F21] text-white rounded-lg shadow-lg w-full max-w-lg">
      {/* Main Title */}
      <h2 className="text-xl font-bold mb-6">Top Meme Coins</h2>

      {/* Table Headers */}
      <div className="flex justify-between px-3 py-2 bg-[#2A2A2D] rounded-lg">
        <span className="text-gray-400 text-sm font-semibold w-6">#</span>
        <span className="text-gray-400 text-sm font-semibold flex-1">Coin</span>
        <span className="text-gray-400 text-sm font-semibold w-24 text-right">
          Price
        </span>
        <span className="text-gray-400 text-sm font-semibold w-24 text-right">
          Change
        </span>
        <span className="text-gray-400 text-sm font-semibold w-20 text-right">
          Chart
        </span>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 mt-4">Loading meme coins...</p>
      ) : error ? (
        <p className="text-red-400 text-center mt-4">{error}</p>
      ) : memeCoins.length === 0 ? (
        <p className="text-center text-gray-400 p-4 mt-4">
          No meme coins available
        </p>
      ) : (
        <div className="flex flex-col space-y-3 mt-2">
          {memeCoins.map((coin, index) => (
            <div
              key={coin.id}
              className="flex items-center justify-between py-3 px-3 hover:bg-[#2A2A2D] rounded-lg transition"
            >
              {/* Numbering */}
              <span className="text-gray-400 text-sm font-semibold w-6">
                {index + 1}.
              </span>

              {/* Coin Logo & Name */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img
                  src={coin.image}
                  alt={coin.name}
                  width={30}
                  height={30}
                  className="rounded-full flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate w-24">
                    {coin.name}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {coin.symbol.toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="text-sm font-medium w-24 text-right">
                ${coin.current_price.toFixed(4)}
              </div>

              {/* Change */}
              <div
                className={`text-xs font-semibold w-24 text-right ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>

              {/* Sparkline Chart */}
              <div className="w-20 h-8 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={coin.sparkline_in_7d.price.map((price, i) => ({
                      index: i,
                      price,
                    }))}
                  >
                    <XAxis hide dataKey="index" />
                    <YAxis hide />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#3182CE"
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemeCoins;
