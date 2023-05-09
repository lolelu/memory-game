import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="sm:text-4xl font-bold text-white mb-8 text-2xl">
          Welcome to MEMOVAS
        </h1>
        <div className="flex flex-col items-center justify-stretch gap-4 w-80">
          <Link
            href="/game"
            className="bg-white text-green-600 hover:text-green-800 px-6 py-3 rounded font-semibold shadow w-full text-center"
          >
            <p>Start a new game</p>
          </Link>
          <Link
            href="/scores"
            className="bg-white text-blue-600 hover:text-blue-800 px-6 py-3 rounded font-semibold shadow w-full text-center"
          >
            <p>View scores</p>
          </Link>
        </div>
      </div>
    </>
  );
}
