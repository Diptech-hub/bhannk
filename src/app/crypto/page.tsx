import CryptoList from "../_components/cryptoData"

export default function Crypto() {

    return (
      <div className="m-4 bg-[#1B1A1D] h-screen rounded-xl">
        <p className="p-8">Welcome to the Crypto Page </p>
        <CryptoList />
      </div>
    );
  }
  