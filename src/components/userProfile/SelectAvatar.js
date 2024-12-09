import { useState, useRef } from "react";
import "../auth/css/auth.css";
import logo from "../../assets/images/logo1.png";
import CustomSvg from "../svgs/CustomSvg";
import userProfile1 from "../../assets/images/userProfile1.png";
import userProfile2 from "../../assets/images/userProfile2.png";
import userProfile3 from "../../assets/images/userProfile3.png";
import userProfile4 from "../../assets/images/userProfile4.png";
import userProfile5 from "../../assets/images/userProfile5.png";
import userProfile6 from "../../assets/images/userProfile6.png";
import { useNavigate } from "react-router-dom";

const avatars = [
  {
    id: 1,
    profile: userProfile1,
    bgClass: "bg-FD8D84",
  },
  {
    id: 2,
    profile: userProfile2,
    bgClass: "bg-84FDA6",
  },
  {
    id: 3,
    profile: userProfile3,
    bgClass: "bg-B1DEFF",
  },
  {
    id: 4,
    profile: userProfile4,
    bgClass: "bg-C59AFC",
  },
  {
    id: 5,
    profile: userProfile5,
    bgClass: "bg-FFD2B1",
  },
  {
    id: 6,
    profile: userProfile1,
    bgClass: "bg-FD8D84",
  },
  {
    id: 7,
    profile: userProfile6,
    bgClass: "bg-C5F8FF",
  },
];

export default function SelectAvatar({ isProfileRoute }) {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);

  const goToDashboard = () => navigateTo("/");
  const goToEditProfile = () => navigateTo("/user-profile/");

  const [selectedAvatarId, setSelectedAvatarId] = useState();

  const displayAvatars = avatars.map((avatar, i) => {
    const { bgClass, profile, id } = avatar;

    const onSelectAvatar = () => setSelectedAvatarId(id);

    const isSelected = id === selectedAvatarId ? true : false;

    return (
      <div
        key={i}
        onClick={onSelectAvatar}
        className={`col-lg-auto col-md-auto col-auto ${bgClass} ${
          isSelected && "user-profile-edit-profile-img-container"
        } clickable mb-4 rounded-circle mx-lg-4 mx-md-4 mx-2 d-flex align-items-center justify-content-center p-1`}
      >
        <img src={profile} className="col-lg-12 col-md-12 col-12" alt="" />
      </div>
    );
  });

  const onBtnClick = () =>
    isProfileRoute ? goToEditProfile() : goToDashboard();

  return (
    <div className="email-verify-bg py-4 px-lg-5 px-md-5 px-3">
      {!isProfileRoute && (
        <div className="d-flex align-items-start flex-column mb-5">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="mb-0 col-lg-8 d-flex align-items-center justify-content-center">
              <img src={logo} className="col-lg-12" alt="" />
            </div>
            <h3 className="regular-txt txt-FFF m-0 p-0 text-center font-family-quantico font-weight-500">
              SkyBoard
            </h3>
          </div>
        </div>
      )}

      <div className="d-flex align-items-center justify-content-center py-0">
        <div
          className={`${
            isProfileRoute ? "col-lg-12" : "col-lg-10"
          } d-flex flex-column align-items-center justify-content-center`}
        >
          <h1 className="m-0 p-0 mb-4 font-weight-700 font-family-quantico txt-FFF extra-large-txt text-center">
            Select <span className="email-verify-email-txt">Avatar</span>
          </h1>

          <p className="m-0 p-0 mb-5 opacity-_7 font-family-poppins txt-small font-weight-300 txt-FFF text-center">
            Select an avatar as your profile picture
          </p>

          <div className="d-flex mb-5 align-items-center justify-content-between flex-wrap">
            {displayAvatars}
          </div>

          <button
            onClick={onBtnClick}
            disabled={!selectedAvatarId ? true : false}
            style={{
              opacity: selectedAvatarId ? 1 : 0.5,
            }}
            className="w-lg-50 w-md-50 w-75 bg-BD3193 d-flex align-items-center justify-content-center p-2 mb-5"
          >
            <p className="p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1">
              {selectedAvatarId ? "Continue" : "Select an avatar"}
            </p>
            {selectedAvatarId && (
              <div className="m-0 p-0 mx-2 d-flex align-items-center">
                <CustomSvg name={"arrow-right"} />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
