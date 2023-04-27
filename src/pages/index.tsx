import { Inter } from "next/font/google";
import { useState } from "react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

interface Board {
  position: number;
  status: number;
}

export default function Home() {
  const [gameArray, setGameArray] = useState(
    Array<Board>(9)
      .fill({ position: 0, status: 0 })
      .map((item, index) => {
        return { ...item, position: index };
      })
  );
  const [player, setPlayer] = useState(1);
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const [isEnded, setIsEnded] = useState(false);

  function handleClick(index: number) {
    if(isEnded) return alert("Game ended! Press Reset!");
    if (gameArray[index].status === 0 ) {
      player === 1 ? setPlayer(2) : setPlayer(1); // change player
      const newGameArray = [...gameArray];
      newGameArray[index].status = player;
      setGameArray(newGameArray);
      checkWinner();
    } else {
      alert("This position is already taken");
      return;
    }
  }

  function checkWinner() {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (gameArray[a].status !== 0 && gameArray[b].status !== 0 && gameArray[c].status !== 0) {
        if (
          gameArray[a].status === gameArray[b].status &&
          gameArray[b].status === gameArray[c].status
        ) {
          alert("Player " + gameArray[a].status === "1" ? "X" : "O" + " won");
          setIsEnded(true);
          return;
        }
      }
    }
  }

  return (
    <>
      <Head>
        <title>TicTacToe</title>
      </Head>
      <main className='h-screen flex items-center justify-center'>
        <div className='flex flex-col'>
          <div className='grid grid-cols-3 gap-3'>
            {gameArray.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`bg-gray-300 w-56 aspect-square text-8xl text-black flex items-center justify-center font-bold font-mono rounded cursor-pointer`}
                  onClick={() => handleClick(index)}>
                  {item.status === 0 ? "" : item.status === 1 ? "X" : "O"}
                </div>
              );
            })}
          </div>
          <button
            className='border h-10 border-white text-white rounded mt-5 hover:bg-gray-400 transition'
            onClick={() => {
              setIsEnded(false);
              setGameArray(
                gameArray.map((item) => {
                  return { ...item, status: 0 };
                })
              )
            }
            }>
            Reset
          </button>
        </div>
      </main>
    </>
  );
}

