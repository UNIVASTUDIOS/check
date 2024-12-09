import React, { useState } from "react";
import logo from "../../assets/images/logo1.png";
import CustomSvg from "../svgs/CustomSvg";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SuccessModal from "./auxiliary/SuccessModal";
import { resetPassword } from "../apiRequests/requestApi";
import { useUser } from "../../utils/hooks";

export default function ResetPassword() {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);

  const goToLogin = () => navigateTo("/login");

  const { codeToken, user } = useUser();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [successModal, setSuccessModal] = useState({
    visible: false,
    onHide: null,
    size: "md",
  });

  const submit = async () => {
    try {
      console.log({
        email: user?.email,
        token: codeToken,
        password,
      });
      const response = await resetPassword({
        email: user?.email,
        token: codeToken,
        password,
      });
      console.log(response);
      openSuccessModal();
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible((prev) => !prev);

  const openSuccessModal = () =>
    setSuccessModal({ visible: true, onHide: hideSuccessModal, size: "md" });
  const hideSuccessModal = () =>
    setSuccessModal({ visible: false, onHide: null, size: "md" });

  return (
    <div className="email-verify-bg py-4 px-lg-5 px-md-5 px-3">
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

      <div className="d-flex align-items-center justify-content-center py-0">
        <div className="col-lg-5">
          <h1 className="m-0 p-0 mb-4 font-weight-700 font-family-quantico txt-FFF extra-large-txt">
            Change <span className="email-verify-email-txt">Password?</span>
          </h1>

          <p className="m-0 p-0 mb-5 opacity-_7 font-family-poppins txt-small font-weight-300 txt-FFF">
            Enter a new password to gain access to the system
          </p>

          <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
            <div style={{ width: "3%" }}>
              <CustomSvg name="lock" />
            </div>
            <input
              type={passwordVisible ? "text" : "password"}
              style={{ width: "88%" }}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
            />
            <div
              style={{ width: "3%" }}
              className="d-flex jusitfy-content-start clickable"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <FiEye color="#FFF" />
              ) : (
                <FiEyeOff size={30} color="#FFF" />
              )}
            </div>
          </div>
          <div className="d-flex align-items-center register-input-container justify-content-between p-2 mb-5">
            <div style={{ width: "3%" }}>
              <CustomSvg name="lock" />
            </div>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              style={{ width: "88%" }}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
            />
            <div
              style={{ width: "3%" }}
              className="d-flex jusitfy-content-start clickable"
              onClick={toggleConfirmPasswordVisibility}
            >
              {confirmPasswordVisible ? (
                <FiEye color="#FFF" size={30} />
              ) : (
                <FiEyeOff size={30} color="#FFF" />
              )}
            </div>
          </div>

          <button
            onClick={submit}
            className="w-100 bg-BD3193 d-flex align-items-center justify-content-center p-2 mb-5"
          >
            <p className="p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1">
              Continue
            </p>
            <div className="m-0 p-0 mx-2 d-flex align-items-center">
              <CustomSvg name={"arrow-right"} />
            </div>
          </button>
        </div>
      </div>

      <SuccessModal
        modalProps={successModal}
        redirectFunc={goToLogin}
        subTxt="Password changed successfully, we are redirecting you..."
      />
    </div>
  );
}
