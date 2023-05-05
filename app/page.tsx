import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/game">Start a new game</Link>
      <Link href="/scores">View scores</Link>
    </>
  );
}
