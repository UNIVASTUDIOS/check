import React, { useContext, useEffect, useRef, useState } from "react";
import DashboardHeader from "../dashboard/DashboardHeader/DashboardHeader";
import CollapseBlock from "../dashboard/CollapseBlockLeft/collapseblockleft";
import CollapseBlockRight from "../dashboard/collapseblockright/collapseblockright";
import CustomSvg from "../svgs/CustomSvg";
import { useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../apiRequests/requestApi";
import { Spinner } from "react-bootstrap";
import CustomErrorMsg from "../errorMsg/CustomErrorMsg";
import socket from "../../socket";
import { GamesContext } from "../../utils/contexts/GameContext";
import { UserContext } from "../../utils/contexts/UserContext";

// const myLobbies = [
//   {
//     stakeValue: 5000,
//     gameId: "chess",
//     roomId: "qufh_24J__-!",
//     user_id: "1",
//   },
//   {
//     stakeValue: 5000,
//     gameId: "chess",
//     roomId: "qufh_24J__-!",
//     user_id: "1",
//   },
//   {
//     stakeValue: 5000,
//     gameId: "chess",
//     roomId: "qufh_24J__-!",
//     user_id: "1",
//   },
//   {
//     stakeValue: 5000,
//     gameId: "chess",
//     roomId: "qufh_24J__-!",
//     user_id: "1",
//   },
// ];

const EnterPin = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);
  const goToWaitingRoom = () => navigateTo("/games/waiting-room");

  const gameContextData = useContext(GamesContext);
  const userContextData = useContext(UserContext);

  const [apiReqs, setApiReqs] = useState({
    isLoading: false,
    data: null,
    errorMsg: null,
  });
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (apiReqs.data && apiReqs.isLoading) {
      const { data } = apiReqs;

      console.log(data);

      submit(data);
    }
  }, [apiReqs]);

  const handleChange = (element, index) => {
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Move to the next input field if the current one is filled
    if (element.nextSibling && element.value) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const initiateJoinLobby = () => {
    console.log("YH");
    const lobbyCode = otp.join("");
    setApiReqs({
      isLoading: true,
      data: {
        lobbyCode,
      },
      errorMsg: null,
    });

    return;
  };

  const submit = async (requestBody) => {
    console.log(requestBody);
    try {
      const response = await postRequest({
        url: "/join-lobby",
        data: requestBody,
      });

      const { message, success } = response;

      if (success) {
        const userID = userContextData.user._id;
        socket.emit(
          "lobby-joined",
          userID,
          requestBody.lobbyCode,
          (response) => {
            const gameName = response.gameName;

            const lobbyCode = requestBody.lobbyCode;

            navigateTo(
              `/tournaments/play/${userID}/${gameName}/${1000}/${lobbyCode}`
            );
            setApiReqs({ isLoading: false, data: null, errorMsg: null });
          }
        );
        // goToWaitingRoom();
        return;
      }

      return setApiReqs({ isLoading: false, data: null, errorMsg: message });
    } catch (error) {
      console.error(error);
      setApiReqs({
        isLoading: false,
        data: null,
        errorMsg: error.message ? error.message : "Error joining lobby",
      });

      return;
    }
  };

  const btnDisabled = otp.join("").length != 6;

  return (
    <div>
      {apiReqs.errorMsg && (
        <CustomErrorMsg errorMsg={apiReqs.errorMsg} verticalPadding={true} />
      )}

      <div className="d-flex align-items-center justify-content-between mb-4 pb-3">
        {otp.map((data, index) => {
          return (
            <input
              type="text"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="email-verify-input p-3 col-lg-2 col-md-2 col-2 text-center font-family-source-sans txt-FFF medium-txt"
            />
          );
        })}
      </div>

      <button
        disabled={apiReqs.isLoading || btnDisabled ? true : false}
        style={{
          opacity: apiReqs.isLoading || btnDisabled ? 0.5 : 1,
        }}
        onClick={initiateJoinLobby}
        className="w-100 bg-BD3193 d-flex align-items-center justify-content-center p-2 mb-5"
      >
        <>
          {apiReqs.isLoading ? (
            <div className="py-1">
              <Spinner size="sm" variant="light" />
            </div>
          ) : (
            <>
              <p className="p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1">
                Enter
              </p>
              <div className="m-0 p-0 mx-2 d-flex align-items-center">
                <CustomSvg name={"arrow-right"} />
              </div>
            </>
          )}
        </>
      </button>

      <div>
        <p className="p-0 m-0 opacity-_8 text-center letter-spacing-_22 line-height-30 font-weight-300 small-txt txt-FFF font-family-poppins">
          Didn’t receive email? <br /> You can resend code in{" "}
          <span className="txt-BD3193">55s</span>
        </p>
      </div>
    </div>
  );
};

const MyLobbies = () => {
  //please note the user id and the myLobbies array are dummy and not valid on the database. They should be replaced with valid data from the database. The user_id specified is that of the opponent!

  // Remember for the tournament need to ask alfred to do an endpoint to get all users in the game

  const [myLobbies, setMylobbies] = useState([]);

  useEffect(() => {
    const getLobbies = async () => {
      try {
        const responsegames = await getRequest("games");

        const games = responsegames?.data;

        const gameLookup = games.reduce((lookup, game) => {
          lookup[game._id] = game.name;
          return lookup;
        }, {});
        const response = await getRequest("/mylobbies");

        const { data, message } = response;

        const gameSessionsWithNames = data.map((session) => ({
          ...session,
          gameId: gameLookup[session.gameId],
        }));

        console.log(gameSessionsWithNames);
        setMylobbies(gameSessionsWithNames);
        alert(message);
      } catch (error) {
        console.error(error);
      }
    };

    getLobbies();
  }, []);

  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);
  const goToTournaments = ({ user_id, stakeValue, roomID, gameId }) =>
    navigateTo(
      `/tournaments/play/${user_id}/${gameId}/${stakeValue}/${roomID}`
    );

  const displayMyLobbies = myLobbies.map((lobby, i) => {
    const { _id, participants, wagerAmount, gameId } = lobby;

    const openLobby = () =>
      goToTournaments({
        user_id: participants[0],
        stakeValue: wagerAmount,
        gameId,
        roomID: _id,
      });

    return (
      <div
        key={i}
        className="bg-transparent join-lobby-inactive-route rounded-3 p-2"
        onClick={openLobby}
      >
        <p className="p-0 px-2 m-0 opacity-_8 text-center letter-spacing-_22 line-height-30 font-weight-300 small-txt txt-FFF font-family-poppins">
          {gameId}
        </p>
      </div>
    );
  });

  return (
    <div>
      <div>
        {myLobbies.length > 0 ? (
          <>
            <div className="d-flex align-items-center justify-content-between flex-wrap mb-4">
              {displayMyLobbies}
            </div>
            <p className="p-0 px-2 m-0 opacity-_8 text-center letter-spacing-_22 line-height-30 font-weight-300 small-txt txt-FFF font-family-poppins">
              Click to open lobby
            </p>
          </>
        ) : (
          <p className="p-0 px-2 m-0 opacity-_8 text-center letter-spacing-_22 line-height-30 font-weight-300 small-txt txt-FFF font-family-poppins">
            No Acive Lobby found
          </p>
        )}
      </div>
    </div>
  );
};

const ScanQrCode = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);
  const goToWaitingRoom = () => navigateTo("/games/waiting-room");

  return (
    <div>
      <div className="mb-4 pb-3 d-flex align-items-center justify-content-center">
        <CustomSvg name="qrCode" />
      </div>
      <button
        onClick={goToWaitingRoom}
        className="w-100 bg-BD3193 d-flex align-items-center justify-content-center p-2 mb-4"
      >
        <p className="p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1">
          Enter
        </p>
        <div className="m-0 p-0 mx-2 d-flex align-items-center">
          <CustomSvg name={"arrow-right"} />
        </div>
      </button>
      <div>
        <p className="p-0 px-2 m-0 opacity-_8 text-center letter-spacing-_22 line-height-30 font-weight-300 small-txt txt-FFF font-family-poppins">
          QR Code are unique and different for each competition, you can invite
          your friends to join the competition
        </p>
      </div>
    </div>
  );
};

export default function JoinLobby() {
  const [activeRoute, setActiveRoute] = useState("enterPin");
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

  const routeToEnterPin = () => setActiveRoute("enterPin");
  const routeToQrCode = () => setActiveRoute("qrCode");
  const routeToMyLobbies = () => setActiveRoute("myLobbies");

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
          <h1 className="m-0 p-0 mb-3 font-weight-700 font-family-quantico txt-large txt-FFF">
            Join <span className="create-lobby-title-span">Lobby</span>
          </h1>
          <p className="m-0 p-0 mb-4 regular-txt font-weight-300 font-family-poppins txt-FFF opacity-_7">
            {activeRoute == "myLobbies"
              ? "Lobbies you belong to that are still active"
              : "We’ve sent the pin to your email address. Check your email and enter the pin below"}
          </p>

          <div className="d-lg-flex d-md-flex d-block col-lg-12 w-100 align-items-center justify-content-between mb-5">
            <div
              onClick={routeToMyLobbies}
              className={`${
                activeRoute === "myLobbies"
                  ? "bg-BD3193"
                  : "bg-transparent join-lobby-inactive-route"
              } clickable col-lg-5 col-md-5 col-12 p-3 mb-lg-0 mb-md-0 mb-4`}
            >
              <p className="m-0 p-0 text-center txt-FFF font-weight-500 regular-txt font-family-poppins">
                My Lobbies
              </p>
            </div>
            <div
              onClick={routeToEnterPin}
              className={`${
                activeRoute === "enterPin"
                  ? "bg-BD3193"
                  : "bg-transparent join-lobby-inactive-route"
              } clickable col-lg-5 col-md-5 col-12 p-3 mb-lg-0 mb-md-0 mb-4`}
            >
              <p className="m-0 p-0 text-center txt-FFF font-weight-500 regular-txt font-family-poppins">
                Enter Pin
              </p>
            </div>
            <div
              onClick={routeToQrCode}
              className={`${
                activeRoute === "qrCode"
                  ? "bg-BD3193"
                  : "bg-transparent join-lobby-inactive-route"
              } clickable col-lg-5 col-md-5 col-12 p-3`}
            >
              <p className="m-0 p-0 text-center txt-FFF font-weight-500 regular-txt font-family-poppins">
                Scan QR Code
              </p>
            </div>
          </div>

          {activeRoute === "enterPin" && <EnterPin />}
          {activeRoute === "qrCode" && <ScanQrCode />}
          {activeRoute === "myLobbies" && <MyLobbies />}
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
    </div>
  );
}
