import React, { useEffect, useState } from "react";
import "./css/userProfile.css";
import CustomSvg from "../svgs/CustomSvg";
import { HiUsers } from "react-icons/hi";
import { IoMdNotifications } from "react-icons/io";
import { LuUser } from "react-icons/lu";
import { IoLockClosed } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { GoInfo } from "react-icons/go";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import FloatingBtn from "../customBtns/FloatingBtn";

const navLinks = [
  {
    name: "user info",
    path: "user-profile",
    Icon: () => <LuUser size={18} color="#6499FF" />,
  },
  {
    name: "invite friends",
    path: "invite-friends",
    Icon: () => <HiUsers size={18} color="#6499FF" />,
  },
  {
    name: "notifications",
    path: "notifications",
    Icon: () => <IoMdNotifications size={18} color="#6499FF" />,
  },
  {
    name: "transactions",
    path: "transaction-history",
    Icon: () => <GrTransaction size={18} color="#6499FF" />,
  },
  {
    name: "security",
    path: "security",
    Icon: () => <IoLockClosed size={18} color="#6499FF" />,
  },
  {
    name: "help",
    path: "help",
    Icon: () => <GoInfo size={18} color="#6499FF" />,
  },
];

export default function UserProfileNav({ userLogout }) {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);

  const pathname = useLocation().pathname;

  const [activeNav, setActiveNav] = useState("user-profile");
  const [showOffCanvasNav, setShowOffCanvasNav] = useState(false);

  const openOffCanvasNav = () => setShowOffCanvasNav(true);
  const closeOffCanvasNav = () => setShowOffCanvasNav(false);

  useEffect(() => {
    if (pathname.toLowerCase().includes("user-profile/help")) {
      setActiveNav("help");
    } else if (pathname.toLowerCase().includes("user-profile/security")) {
      setActiveNav("security");
    } else if (pathname.toLowerCase().includes("user-profile/notifications")) {
      setActiveNav("notifications");
    } else if (pathname.toLowerCase().includes("user-profile/invite-friends")) {
      setActiveNav("invite-friends");
    } else if (
      pathname.toLowerCase().includes("user-profile/transaction-history")
    ) {
      setActiveNav("transaction-history");
    } else if (pathname.toLowerCase().includes("user-profile")) {
      setActiveNav("user-profile");
    } else {
      setActiveNav("");
    }
  }, [pathname]);

  const displayNavLinks = navLinks.map((navLink, i) => {
    const { name, path, Icon } = navLink;

    const onNavClick = () => {
      closeOffCanvasNav();
      navigateTo(
        path === "user-profile" ? `/${path}` : `/user-profile/${path}`
      );

      return;
    };

    const isActive = activeNav === path ? true : false;

    return (
      <div
        key={i}
        className={`${
          isActive
            ? "user-profile-nav-link-container-active"
            : "user-profile-nav-link-container"
        } d-flex align-items-center py-lg-4 py-md-4 py-2 clickable`}
        onClick={onNavClick}
      >
        <div className="user-profile-nav-nav-link-icon-container p-3">
          <Icon />
        </div>

        <div className="mx-4">
          <p
            className={`${
              isActive ? "txt-BD3193" : "txt-FFF"
            } m-0 p-0 small-txt font-family-poppins font-weight-500 text-capitalize`}
          >
            {name}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="w-100">
      <div className="d-lg-block d-md-block d-block">
        <div className="d-flex mb-4 pb-3 align-items-center justify-content-between">
          <h1 className="m-0 p-0 font-weight-700 font-family-quantico txt-large txt-FFF">
            User <span className="create-lobby-title-span">Profile</span>
          </h1>
          <div
            onClick={openOffCanvasNav}
            style={{
              opacity: 0.8,
              background: "rgba(189, 49, 147, 0.10)",
            }}
            className="clickable d-lg-none d-md-none d-flex align-items-center p-2 justify-content-center rounded-3"
          >
            <CustomSvg name="settings" />
          </div>
        </div>
        <div className="d-lg-flex d-md-flex d-none flex-column justify-content-between">
          <div className="mb-5 pb-5">{displayNavLinks}</div>
          <div
            onClick={userLogout}
            className="d-flex align-items-center clickable"
          >
            <div className="user-profile-nav-nav-link-icon-container p-3">
              <RiLogoutBoxRLine size={18} color="#FF1843" />
            </div>

            <div className="mx-4">
              <p className="m-0 p-0 txt-FFF small-txt font-family-poppins font-weight-500 text-capitalize">
                logout
              </p>
            </div>
          </div>
        </div>
      </div>

      <Offcanvas show={showOffCanvasNav}>
        <div style={{ backgroundColor: "#130828" }} className="w-100 h-100">
          <div className="navContainer w-100 h-100 p-4">
            <div className="d-flex align-items-center mb-5 justify-content-between">
              <h1 className="m-0 p-0 font-weight-700 font-family-quantico txt-large txt-FFF">
                User <span className="create-lobby-title-span">Profile</span>
              </h1>
              <div onClick={closeOffCanvasNav} className="clickable">
                <CustomSvg name="x" color="#FFF" />
              </div>
            </div>

            <div className="d-flex flex-column justify-content-between">
              <div className="mb-5">{displayNavLinks}</div>
              <div
                onClick={userLogout}
                className="d-flex align-items-center clickable"
              >
                <div className="user-profile-nav-nav-link-icon-container p-3">
                  <RiLogoutBoxRLine size={18} color="#FF1843" />
                </div>

                <div className="mx-4">
                  <p className="m-0 p-0 txt-FFF small-txt font-family-poppins font-weight-500 text-capitalize">
                    logout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Offcanvas>
    </div>
  );
}
