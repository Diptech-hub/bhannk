"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Crypto {
  name: string;
  symbol: string;
  currentPrice: number;
  marketCap: string;
  change24h: string;
  change30d: string;
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
    <div className="p-4 border rounded-lg shadow-lg w-full max-w-5xl">
      <h2 className="text-lg font-bold mb-4">Crypto Market Overview</h2>

      {loading ? (
        <p>Loading cryptocurrencies...</p>
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
              <th className="border p-2">30d Change (%)</th>
              <th className="border p-2">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  No cryptocurrency data available
                </td>
              </tr>
            ) : (
              cryptos.map((crypto, index) => (
                <tr key={`${crypto.symbol}-${index}`} className="border">
                  <td className="border p-2">
                    <img
                      src={crypto.image}
                      alt={crypto.name}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </td>
                  <td className="border p-2">{crypto.name}</td>
                  <td className="border p-2 font-bold">{crypto.symbol}</td>
                  <td className="border p-2">
                    ${crypto.currentPrice.toFixed(2)}
                  </td>
                  <td
                    className={`border p-2 font-semibold ${
                      parseFloat(crypto.change24h) >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {crypto.change24h}%
                  </td>
                  <td
                    className={`border p-2 font-semibold ${
                      parseFloat(crypto.change30d) >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {crypto.change30d}%
                  </td>
                  <td className="border p-2">${crypto.marketCap}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CryptoList;
