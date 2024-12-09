import React, { useEffect, useState } from "react";
import userProfile1 from "../../assets/images/userProfile1.png";
import DashboardHeader from "../dashboard/DashboardHeader/DashboardHeader";
import UserProfileNav from "./UserProfileNav";
import { MdEdit } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import CustomSvg from "../svgs/CustomSvg";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/hooks";
import { patchRequest } from "../apiRequests/requestApi";

export default function EditProfile() {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);

  const goToSelectAvatar = () => navigateTo(`/user-profile/select-avatar`);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isEditting, setIsEditting] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
  const toggleEditMode = () => setIsEditting((prev) => !prev);

  const { user, setUserDetails } = useUser();

  const { bgClass, username, avatar, country, email, bio, phoneNumber, dob } =
    user;

  const [phonenum, setPhoneNumber] = useState(phoneNumber);
  const [userName, setUserName] = useState(username);
  const [biography, setBio] = useState(bio);
  const [date, setDob] = useState(dob);
  const [changedInputs, setChangedInputs] = useState({});

  const handleChange = (e, set) => {
    const { name, value } = e.target;

    set(value);

    setChangedInputs((prevChanges) => ({
      ...prevChanges,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (userName == null) {
      setUserName(username);
      setPhoneNumber(phoneNumber);
      setBio(bio);
      setDob(dob);
    }
  }, [user]);

  const update = async () => {
    try {
      console.log("Update started ");

      console.log(changedInputs);
      const response = await patchRequest("/auth/profile", changedInputs);

      console.log(response);
      const userDetails = {
        ...user,
        ...changedInputs,
      };
      alert(response?.message);
      setUserDetails(userDetails);
      console.log(user);
      setIsEditting(!isEditting);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="dashboard py-lg-5 py-md-5 my-md-3 my-lg-3 my-0 py-2">
        <div className="d-lg-flex d-md-flex d-block align-items-center justify-content-between mb-lg-5 mb-md-5 mb-3">
          <div className="d-lg-flex d-md-flex d-block align-items-center mb-lg-0 mb-md-0 pb-md-0 pb-lg-0 pb-3 mb-4">
            <div>
              <div
                className={`${bgClass} user-profile-edit-profile-img-container rounded-circle d-flex flex-column align-items-center justify-content-center p-1`}
              >
                <img
                  src={avatar ?? userProfile1}
                  alt="Avatar"
                  width={100}
                  style={{ borderRadius: 30 }}
                />
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <div
                  onClick={goToSelectAvatar}
                  className="user-profile-edit-profile-profile-edit-icon p-2 clickable rounded-circle bg-FFF"
                >
                  <MdEdit size={20} color="#BD3193" />
                </div>
              </div>
            </div>
            <div className="mx-2">
              <h5 className="m-0 mb-1 p-0 txt-FFF text-lg-auto text-md-auto text-center font-family-poppins font-weight-600 regular-txt">
                {username || "not set"}
              </h5>
              <p className="m-0 p-0 txt-FFF opacity-_7 text-lg-auto text-md-auto text-center small-txt font-family-poppins font-weight-300">
                {country ?? "Country not assigned yet"}
              </p>
            </div>
          </div>
          <div
            onClick={toggleEditMode}
            className="d-flex align-items-center justify-content-lg-center justify-content-md-center justify-content-end clickable"
          >
            <p className="m-0 p-0 font-family-poppins txt-small font-weight-400 txt-BD3193 text-capitalize">
              {isEditting ? "revert" : "edit profile"}
            </p>
            <div className="mx-2">
              <CustomSvg name="arrow-right" color="#BD3193" />
            </div>
          </div>
        </div>

        <div className="d-flex flex-wrap align-items-start justify-content-lg-between justify-content-md-between justify-content-center mb-4">
          <div className="col-lg-5 col-md-5 col-12 mb-lg-0 mb-md-0 mb-4">
            <div className="mb-4">
              <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">
                Name
              </label>
              <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
                <input
                  style={{ width: "100%" }}
                  defaultValue={userName}
                  name="username"
                  // disabled={isEditting}
                  disabled={!isEditting}
                  className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                  onChange={(e) => handleChange(e, setUserName)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">
                Phone Number
              </label>
              <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
                <input
                  style={{ width: "100%" }}
                  defaultValue={phonenum}
                  name="phoneNumber"
                  disabled={!isEditting}
                  className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                  onChange={(e) => handleChange(e, setPhoneNumber)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">
                Date Of Birth
              </label>
              <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
                <input
                  style={{ width: "100%" }}
                  defaultValue={dob ? date : ""}
                  disabled={!isEditting}
                  className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">
                Password
              </label>
              <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
                <input
                  type={passwordVisible ? "text" : "password"}
                  style={{ width: "91%" }}
                  disabled={!isEditting}
                  defaultValue="**************"
                  className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                />
                <div
                  style={{ width: "3%" }}
                  className="d-flex jusitfy-content-start clickable"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <FiEye color="#FFFFFFB2" size={15} />
                  ) : (
                    <CustomSvg name="eye-slash" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-5 col-12 mb-lg-0 mb-md-0 mb-4">
            <div className="mb-4">
              <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">
                Email Address
              </label>
              <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
                <input
                  type="email"
                  style={{ width: "100%" }}
                  defaultValue={email}
                  disabled={!isEditting}
                  className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">
                Bio
              </label>
              <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
                <textarea
                  style={{ width: "100%", height: "37vh" }}
                  defaultValue={
                    username ? biography || "Not set" : "Not Signed in"
                  }
                  name="bio"
                  className="p-lg-4 p-md-4 p-2 txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                  disabled={!isEditting}
                  onChange={(e) => handleChange(e, setBio)}
                />
              </div>
            </div>
          </div>
        </div>

        {isEditting && (
          <button
            className="w-100 bg-BD3193 d-flex align-items-center justify-content-center p-2 mb-5"
            onClick={update}
          >
            <p className="p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1">
              Save
            </p>
            <div className="m-0 p-0 mx-2 d-flex align-items-center">
              <CustomSvg name={"arrow-right"} />
            </div>
          </button>
        )}
      </div>
    </>
  );
}
