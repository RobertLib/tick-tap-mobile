import { createContext, useContext, useState } from "react";

const GameStatusContext = createContext<{
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}>({
  score: 0,
  setScore: () => {},
});

export const GameStatusProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [score, setScore] = useState(0);

  return (
    <GameStatusContext.Provider value={{ score, setScore }}>
      {children}
    </GameStatusContext.Provider>
  );
};

export const useGameStatus = () => useContext(GameStatusContext);
