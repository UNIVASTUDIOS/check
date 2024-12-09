import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { GamesContext } from "../contexts/GameContext";
export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export const useGames = () => {
  const context = useContext(GamesContext);
  return context;
};
