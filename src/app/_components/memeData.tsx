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
    <div className="p-4 border rounded-lg shadow-lg w-full max-w-6xl">
      <h2 className="text-lg font-bold mb-4">Top Meme Coins</h2>

      {loading ? (
        <p>Loading meme coins...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full border-collapse border border-gray-500">
          <thead>
            <tr className="">
              <th className="border p-2">Logo</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Symbol</th>
              <th className="border p-2">Price (USD)</th>
              <th className="border p-2">24h Change (%)</th>
              <th className="border p-2">Sparkline (7d)</th>
            </tr>
          </thead>
          <tbody>
            {memeCoins.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No meme coins available
                </td>
              </tr>
            ) : (
              memeCoins.map((coin) => (
                <tr key={coin.id} className="border">
                  <td className="border p-2">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </td>
                  <td className="border p-2">{coin.name}</td>
                  <td className="border p-2 font-bold">
                    {coin.symbol.toUpperCase()}
                  </td>
                  <td className="border p-2">
                    ${coin.current_price.toFixed(4)}
                  </td>
                  <td
                    className={`border p-2 font-semibold ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="border p-2">
                    <ResponsiveContainer width={100} height={40}>
                      <LineChart
                        data={coin.sparkline_in_7d.price.map(
                          (price, index) => ({ index, price })
                        )}
                      >
                        <XAxis hide dataKey="index" />
                        <YAxis hide />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke="#3182CE"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MemeCoins;
