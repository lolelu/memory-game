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

// Usando Node.js, React e typescript, implementa una pagina web su cui l’utente possa giocare al gioco del memory.
// Lo schermo deve mostrare dall’alto il piano di gioco, su cui giacciono 16 carte coperte disposte su una matrice 4x4.
//  Le 16 carte sono formate da 8 coppie di carte identiche per coppia ma diverse tra coppie, disposte sul piano in maniera randomica.

// Quando l’utente clicca su una carta, quella carta si gira svelando l’immagine sul suo retro
// (puoi scegliere immagini a tuo piacimento). A questo punto, l’utente può cliccare su una seconda carta,
// la quale si girerà al click. Se la carta che sceglie combacia con quella scelta precedentemente,
//  il giocatore fa 10 punti e le due carte rimangono scoperte. Se no, ne perde 5 e le carte si rigirano. I
//  l punteggio deve essere mostrato in alto a destra e può andare in negativo. L’obiettivo è massimizzare il proprio punteggio.
