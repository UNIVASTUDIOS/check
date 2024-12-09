import { createContext, useState } from "react";
import { getRequest } from "../../components/apiRequests/requestApi";
export const GamesContext = createContext();

export const GamesContextProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lobbyCode, setLobbyCode] = useState("");
  const [tournaments, setTournaments] = useState([]);
  const [gameId, setGameId] = useState("");
  const [topGames, setTopGames] = useState([]);
  const [totalPlays, setTotalPlays] = useState(0);

  const getGames = async () => {
    try {
      const response = await getRequest("/games");
      console.log(response);

      if (!response.data) {
        setGames(null);
      }

      const data = response.data;

      const newArray = data.map(({ image, _id, name, description }) => ({
        _id,
        id: name?.toLowerCase(),
        img: image,
        caption: `Play ${name} with friends`,
        bgClass: "bg-2796CE",
        title: name,
        arrowColor: "#2796CE",
        text: description,
        splitTitle1: name,
        splitTitle2: "Game",
      }));

      setGames(newArray);

      console.log(newArray);

      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTournaments = async () => {
    try {
      const response = await getRequest("/tournaments?pageNo=1");
      console.log(response);

      if (!response.data) {
        setTournaments(null);
      }

      const data = response.data;

      setTournaments(data);

      console.log(tournaments);

      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTopGames = async () => {
    try {
      const response = await getRequest("/top-active-games");

      const data = response?.data;

      setTopGames(data);

      const total = data.reduce((sum, game) => sum + game.totalPlays, 0);

      setTotalPlays(total);
    } catch (error) {
      console.error("Error fetching top games:", error);
    }
  };

  return (
    <GamesContext.Provider
      value={{
        games,
        getGames,
        loading,
        lobbyCode,
        setLobbyCode,
        gameId,
        setGameId,
        tournaments,
        getTournaments,
        topGames,
        totalPlays,
        getTopGames,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
