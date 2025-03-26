"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Crypto {
  name: string;
  symbol: string;
  currentPrice: number;
  marketCap: string;
  change24h: string;
  image: string;
}

const CryptoList = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/crypto");
        setCryptos(response.data.cryptos || []);
      } catch (err) {
        console.error("Error fetching crypto data:", err);
        setError("Failed to load cryptocurrency data");
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  return (
    <div className="p-6 bg-[#1F1F21] text-white rounded-lg shadow-lg w-full max-w-6xl">
      <h2 className="text-xl font-bold mb-4">Crypto Market Overview</h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading cryptocurrencies...</p>
      ) : error ? (
        <p className="text-red-400 text-center">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2A2A2D] text-gray-300">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Logo</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Symbol</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">24h Change</th>
                <th className="p-3 text-left">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {cryptos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-gray-400">
                    No cryptocurrency data available
                  </td>
                </tr>
              ) : (
                cryptos.map((crypto, index) => (
                  <tr
                    key={crypto.symbol}
                    className="border-b border-[#2A2A2D] hover:bg-[#2A2A2D] transition rounded-lg"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">
                      <img
                        src={crypto.image}
                        alt={crypto.name}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    </td>
                    <td className="p-3 font-medium">{crypto.name}</td>
                    <td className="p-3 font-bold text-gray-400">
                      {crypto.symbol.toUpperCase()}
                    </td>
                    <td className="p-3">
                      ${crypto.currentPrice?.toFixed(2) ?? "N/A"}
                    </td>
                    <td
                      className={`p-3 font-semibold ${
                        parseFloat(crypto.change24h) >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {crypto.change24h}%
                    </td>
                    <td className="p-3">
                      ${crypto.marketCap.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CryptoList;
