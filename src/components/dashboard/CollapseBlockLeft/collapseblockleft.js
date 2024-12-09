import React, { useEffect, useState } from "react";
import "./collapseblockleft.css";
import { Offcanvas } from "react-bootstrap";
import lobby_arrow_right from "../../../assets/images/lobby_arrow_right.svg";
import top_contribution from "../../../assets/images/top_contribution.svg";
import logowithname from "../../../assets/images/logowithname.png";
import top_games from "../../../assets/images/top_games.svg";
import arrow_down from "../../../assets/images/arrow_down.svg";
import Active from "../../../assets/images/Active.svg";
import SnookerActiveicon from "../../../assets/images/SnookerActiveicon.svg";
import LudoActiveicon from "../../../assets/images/LudoActiveicon.svg";
import ChessActiveicon from "../../../assets/images/ChessActiveicon.svg";
import ScrabbleActiveicon from "../../../assets/images/ScrabbleActiveicon.svg";
import CardActiveicon from "../../../assets/images/CardActiveicon.svg";
import ActiveLaptopicon from "../../../assets/images/ActiveLaptopicon.svg";
import ActiveWorldIcon from "../../../assets/images/ActiveWorldIcon.svg";
import CustomSvg from "../../svgs/CustomSvg";
import { useGames } from "../../../utils/hooks";

const Block = ({ activebutton, activehandler, handleclose, isOpen }) => {
  const { topGames, totalPlays, getTopGames } = useGames();

  useEffect(() => {
    if (topGames.length === 0) getTopGames();
  }, []);

  const swithcImages = (t) => {
    switch (t?.name) {
      case "chess":
        return ChessActiveicon;
      case "Ludo":
        return LudoActiveicon;
      case "Scrabble":
        return ScrabbleActiveicon;
      case "Snooker":
        return SnookerActiveicon;
      default:
        return CardActiveicon;
    }
  };
  return (
    <div className="collapseright collapsible-container">
      <div
        className="collapsebackright py-3 d-lg-flex d-md-flex d-none align-items-center justify-content-center"
        onClick={handleclose}
        disabled={!isOpen}
      >
        <img src={lobby_arrow_right} className="me-3" alt="" />
        <div className="collapsebackclick">Collapse Block</div>
      </div>

      <div>
        <div className="d-flex justify-content-between align-items-center topcollapse gap-3 gap-xxl-0 mb-2">
          <div>
            <img src={top_contribution} alt="" />
          </div>
          <div className="topcompetition">Top Competitions</div>
          <div>
            <img src={arrow_down} className="clickable" alt="" />
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center topcollapsegames">
          <div>
            <img src={top_games} alt="" />
          </div>
          <div className="topcompetition">Top Games</div>
          <div>
            <img src={arrow_down} className="clickable" alt="" />
          </div>
        </div>
      </div>

      <div className='w-100'>
          <span className='activebutton d-flex align-items-center justify-content-center p-3 clickable' onClick={activehandler}><img src={Active} className='me-2'/>Active</span>
      </div>

      {activebutton && (
        <>
          <div className="d-flex p-3 justify-content-between align-items-center activeall">
            <div className="d-flex justify-content-between">
              <div className="pe-4">All {topGames.length}</div>
              <div>
                <img src={ActiveLaptopicon} alt="" />
                {totalPlays}
              </div>
            </div>
            <div>
              <img src={ActiveWorldIcon} alt="" />
            </div>
          </div>
          <div className="activetop">Top</div>
          {topGames &&
            topGames.map((t, i) => {
              return (
                <div
                  className="d-flex justify-content-between align-items-center activetext"
                  key={i}
                >
                  <div className="d-flex">
                    <img src={swithcImages(t?.gameInfo)} alt="" />
                    <div className="d-flex ps-2">
                      {t?.gameInfo?.name}
                      <div className="ps-1">{t?.totalPlays}</div>
                    </div>
                  </div>
                  <div>
                    <img src={arrow_down} className="clickable" alt="" />
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

function CollapseBlock({ setIsLeftBlockOpen, isSmallScreen }) {
  const [isOpen, setIsOpen] = useState(true);
  const [showOpenButton, setShowOpenButton] = useState(false);
  const [showOffCanvasBlock, setShowOffCanvasBlock] = useState(false);

  const [activebutton, setActivebutton] = useState(false);

  useEffect(() => {
    if (setIsLeftBlockOpen) {
      setIsLeftBlockOpen(isOpen);
    }
  }, [isOpen]);

  const openOffCanvasBlock = () => setShowOffCanvasBlock(true);
  const closeOffCanvasBlock = () => setShowOffCanvasBlock(false);

  const activehandler = () => {
    setActivebutton(!activebutton);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setShowOpenButton(false);
  };
  const handleclose = () => {
    setIsOpen(false);
    setShowOpenButton(true);
  };

  return (
    <>
      {(showOpenButton || isSmallScreen) && (
        <div>
          <button
            className="d-lg-block d-md-block d-none arrowLeft mb-lg-0 mb-md-0 mb-4"
            onClick={handleOpen}
          >
            <img src={lobby_arrow_right} alt="" />
          </button>
          <button
            className="d-lg-none d-md-none d-block arrowLeft mb-lg-0 mb-md-0 mb-4"
            onClick={openOffCanvasBlock}
          >
            <img src={lobby_arrow_right} alt="" />
          </button>
        </div>
      )}
      {isOpen && (
        <div className="d-lg-block d-md-block d-none">
          <Block
            activebutton={activebutton}
            activehandler={activehandler}
            handleclose={handleclose}
            isOpen={isOpen}
          />
        </div>
      )}

      <Offcanvas show={showOffCanvasBlock}>
        <div
          style={{ backgroundColor: "#130828", overflowY: "auto" }}
          className="w-100 h-100"
        >
          <div className="navContainer w-100 h-100 p-4">
            <div className="d-flex align-items-center mb-5 justify-content-between">
              <div className="col-3 d-flex">
                <img src={logowithname} className="col-12" alt="Our Logo" />
              </div>
              <div onClick={closeOffCanvasBlock} className="clickable">
                <CustomSvg name="x" color="#FFF" />
              </div>
            </div>

            <div className="mb-5">
              <Block
                activebutton={activebutton}
                activehandler={activehandler}
                handleclose={handleclose}
                isOpen={isOpen}
              />
            </div>
          </div>
        </div>
      </Offcanvas>
    </>
  );
}

export default CollapseBlock;
