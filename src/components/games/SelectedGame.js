import "./css/games.css";
import CustomSvg from "../svgs/CustomSvg";
import { IoArrowBackSharp } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import JoinLobbyModal from "./auxiliary/JoinLobbyModal";
import DashboardHeader from "../dashboard/DashboardHeader/DashboardHeader";
import { CSSTransition } from "react-transition-group";
import ActiveUsers from "./ActiveUsers";
import AmountPicker from "../payments/auxiliary/AmountPicker";
import CollapseBlock from "../dashboard/CollapseBlockLeft/collapseblockleft";
import CollapseBlockRight from "../dashboard/collapseblockright/collapseblockright";
import { useNavigate, useParams } from "react-router-dom";
import { useGames, useUser } from "../../utils/hooks";
import { postRequest } from "../apiRequests/requestApi";
import CustomErrorMsg from "../errorMsg/CustomErrorMsg";
import socket from "../../socket";
import { GamesContext } from "../../utils/contexts/GameContext";
import { UserContext } from "../../utils/contexts/UserContext";

export default function SelectedGame() {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);
  const goToTournaments = ({ user_id, stakeValue, roomID }) =>
    navigateTo(
      `/tournaments/play/${user_id}/${gameId}/${stakeValue}/${roomID}`
    );
  const goToAllGames = () => navigateTo("/games");

  const { setLobbyCode, setGameId } = useGames();
  const { setUserDetails, user } = useUser();

  const gameContextData = useContext(GamesContext);
  const userContextData = useContext(UserContext);

  const params = useParams();
  const { gameId } = params;

  const { games } = useGames();

  const stakesNodeRef = useRef(null);
  const showActiveUsersNodeRef = useRef(null);

  const [selectedGame, setSelectedGame] = useState();
  const [roomId, setRoomId] = useState();
  const [apiReqs, setApiReqs] = useState({ isLoading: false, errorMsg: null });
  const [showGames, setShowGames] = useState(true);
  const [showActiveUsers, setShowActiveUsers] = useState(false);
  const [showBtns, setShowBtns] = useState(true);
  const [showStakes, setShowStakes] = useState(false);
  const [stakeValue, setStakeValue] = useState();
  const [joinLobbyModal, setJoinLobbyModal] = useState({
    visible: false,
    onHide: null,
    size: "md",
  });

  const [value, setValue] = useState(2000);
  const [isLeftBlockOpen, setIsLeftBlockOpen] = useState(true);
  const [isRightBlockOpen, setIsRightBlockOpen] = useState(true);
  const [blocksOpen, setBlocksOpen] = useState("both");

  useEffect(() => {
    if (isLeftBlockOpen && isRightBlockOpen) {
      setBlocksOpen("both");
    }

    if (!isLeftBlockOpen && !isRightBlockOpen) {
      setBlocksOpen("none");
    }

    if (
      (!isLeftBlockOpen && isRightBlockOpen) ||
      (isLeftBlockOpen && !isRightBlockOpen)
    ) {
      setBlocksOpen("one");
    }
  }, [isLeftBlockOpen, isRightBlockOpen]);

  useEffect(() => {
    if (apiReqs.isLoading) {
      createLobby();
    }
  }, [apiReqs]);

  useEffect(() => {
    if (games) {
      const s_game = games.filter((game) => game.id === gameId);

      if (s_game[0]) {
        setSelectedGame(s_game[0]);
      } else {
        goToAllGames();
      }
    } else {
      goToAllGames();
    }
  }, [games]);

  const initiateLobbyCreation = () =>
    setApiReqs({ isLoading: true, errorMsg: null });

  const createLobby = async () => {
    const selectedGame = games?.filter((game) => game.id === gameId);
    const { _id } = selectedGame[0];

    const details = {
      gameId: _id,
      wagerAmount: value * 100,
    };

    console.log(details);
    try {
      const response = await postRequest({
        url: "/create-lobby",
        data: details,
      });
      console.log("response from create lobby", response);
      console.log(user);
      const newUser = {
        ...user,
        walletBalance: user.walletBalance - value * 100,
      };

      setUserDetails(newUser);

      const { data, message } = response;
      alert(message);
      setLobbyCode(data);
      setGameId(gameId);
      console.log(data);

      setRoomId(data);

      //   alert("Share code to your friend " + data.code);

      openActiveUsers(details.wagerAmount);

      console.log(userContextData);

      const userID = userContextData.user._id;

      socket.emit("lobby-created", userID);

      setApiReqs({ isLoading: false, errorMsg: null });
    } catch (error) {
      console.error(error);
      setApiReqs({
        isLoading: false,
        errorMsg: error.message ? error.message : "Error getting users",
      });
    }
  };

  const openStakes = () => setShowStakes(true);
  const hideStakes = () => setShowStakes(false);

  const openActiveUsers = (amountStaked) => {
    setShowActiveUsers(true);
    setStakeValue(amountStaked);
  };
  const hideActiveUsers = () => setShowActiveUsers(false);

  // const onIncrementStake = () => stakeValue < 25000 && setStakeValue(prev => prev + 1000)
  // const onDecrementStake = () => stakeValue > 0 && setStakeValue(prev => prev - 1000)
  // const resetStakeValue = amount => setStakeValue(amount)

  const openJoinLobbyModal = () =>
    setJoinLobbyModal({
      visible: true,
      onHide: hideJoinLobbyModal,
      size: "md",
    });
  const hideJoinLobbyModal = () =>
    setJoinLobbyModal({ visible: false, onHide: null, size: "md" });

  const goToGame = () => navigateTo(`/games/${gameId}?roomID=${roomId.code}`);

  const onSelectUser = (user) => {
    // if (roomId && user.user_id && stakeValue) {
    // console.log(roomId);

    // return goToTournaments({
    //   user_id: user.user_id,
    //   stakeValue,
    //   roomID: roomId._id,
    // });

    goToGame();
    // }

    setApiReqs({
      isLoading: false,
      data: null,
      errorMsg: "Something went wrong! Try again later",
    });
  };

  if (selectedGame) {
    const { id, bgClass, img, title, caption, text, splitTitle1, splitTitle2 } =
      selectedGame;

    return (
      <div style={{ minHeight: "100vh" }} className="dashboard">
        <DashboardHeader />
        <div className="d-lg-flex d-md-flex d-block mt-lg-4 mt-md-4 mt-4 px-lg-4 px-md-4 px-4 justify-content-between align-items-start herogeneral">
          <div className="d-lg-none d-md-none d-flex align-items-center justify-content-between mb-2">
            <div className="col-lg-2">
              <CollapseBlock isSmallScreen={true} />
            </div>
            <div className="col-lg-2">
              <CollapseBlockRight isSmallScreen={true} />
            </div>
          </div>

          <div
            className={`${
              isLeftBlockOpen ? "col-lg-2 col-md-2" : "col-lg-1 col-md-1"
            } d-lg-flex d-md-flex d-none`}
          >
            <CollapseBlock setIsLeftBlockOpen={setIsLeftBlockOpen} />
          </div>

          <div
            className={`${
              blocksOpen === "both"
                ? "col-lg-8 col-md-8"
                : blocksOpen === "one"
                ? "col-lg-9 col-md-9"
                : blocksOpen === "none"
                ? "col-lg-10 col-md-10"
                : ""
            } col-auto px-lg-4 px-md-4 px-0`}
          >
            <div>
              {showGames && (
                <div className="d-flex align-items-center justify-content-stretch">
                  <div className="w-100">
                    <div className="d-flex align-items-center justify-content-center create-lobby-bg col-lg-12 col-md-12 col-12 mb-3">
                      <img
                        src={img}
                        className="col-lg-12 col-md-12 col-12"
                        alt=""
                      />
                    </div>

                    <h1 className="m-0 p-0 mb-3 font-weight-700 font-family-quantico txt-large txt-FFF">
                      {splitTitle1}{" "}
                      <span className="create-lobby-title-span">
                        {splitTitle2}
                      </span>
                    </h1>

                    {showBtns && (
                      <div>
                        <p className="m-0 p-0 mb-4 regular-txt font-weight-300 font-family-poppins txt-FFF opacity-_7">
                          {text}
                        </p>

                        <button
                          onClick={openStakes}
                          className="w-100 bg-FBBC04 d-flex align-items-center justify-content-center p-2 mb-3"
                        >
                          <p className="p-0 m-0 small-txt txt-000 font-weight-500 font-family-poppins mx-1">
                            Create Lobby
                          </p>
                          <div className="m-0 p-0 mx-2 d-flex align-items-center">
                            <CustomSvg name={"arrow-right"} color="#000" />
                          </div>
                        </button>

                        {/* <button 
                                                            onClick={openJoinLobbyModal}
                                                            className='w-100 bg-transparent create-lobby-join-btn d-flex align-items-center justify-content-center p-2 mb-5'
                                                        >
                                                            <p className='p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1'>Join Lobby</p>
                                                            <div className='m-0 p-0 mx-2 d-flex align-items-center'>
                                                                <CustomSvg name={'arrow-right'} />
                                                            </div>
                                                        </button> */}
                      </div>
                    )}

                    <CSSTransition
                      in={showStakes}
                      timeout={300}
                      classNames="alert"
                      unmountOnExit
                      nodeRef={stakesNodeRef}
                      onEnter={() => setShowBtns(false)}
                      onExited={() => setShowBtns(true)}
                    >
                      <div ref={stakesNodeRef} className="w-100">
                        <p className="m-0 p-0 mb-4 regular-txt font-weight-300 font-family-poppins txt-FFF">
                          Select Stake Amount
                        </p>

                        {apiReqs.errorMsg && (
                          <CustomErrorMsg
                            errorMsg={apiReqs.errorMsg}
                            verticalPadding={true}
                          />
                        )}

                        <AmountPicker
                          btnTxt="Select Player"
                          btnFunc={initiateLobbyCreation}
                          subTxt="Stake 1k upwards for a 2 player game"
                          value={value}
                          loading={apiReqs.isLoading}
                          setValue={setValue}
                        />

                        <button
                          onClick={hideStakes}
                          className="w-100 bg-transparent create-lobby-join-btn d-flex align-items-center justify-content-center p-2 mb-5"
                        >
                          <div className="m-0 p-0 mx-1 d-flex align-items-center">
                            <IoArrowBackSharp size={20} color="#fff" />
                          </div>
                          <p className="p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1">
                            Back
                          </p>
                        </button>
                      </div>
                    </CSSTransition>
                  </div>
                </div>
              )}

              <CSSTransition
                in={showActiveUsers}
                nodeRef={showActiveUsersNodeRef}
                timeout={300}
                classNames="alert"
                unmountOnExit
                onEnter={() => setShowGames(false)}
                onExited={() => setShowGames(true)}
              >
                <div className="w-100" ref={showActiveUsersNodeRef}>
                  <button
                    onClick={hideActiveUsers}
                    className="w-25 bg-transparent create-lobby-join-btn d-flex align-items-center justify-content-center p-2 mb-4"
                  >
                    <div className="m-0 p-0 mx-1 d-flex align-items-center">
                      <IoArrowBackSharp size={20} color="#fff" />
                    </div>
                    <p className="p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1">
                      Back
                    </p>
                  </button>
                  <ActiveUsers btnTxt="select" btnFunc={onSelectUser} />
                </div>
              </CSSTransition>
            </div>
          </div>

          <div
            className={`${
              isRightBlockOpen ? "col-lg-2 col-md-2" : "col-lg-1 col-md-1"
            } d-lg-flex d-md-flex d-none align-items-center justify-content-end`}
          >
            <div className="">
              <CollapseBlockRight setIsRightBlockOpen={setIsRightBlockOpen} />
            </div>
          </div>
        </div>

        <JoinLobbyModal modalProps={joinLobbyModal} />
      </div>
    );
  } else {
    return navigateTo("/");
  }
}
