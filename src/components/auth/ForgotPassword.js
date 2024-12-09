import React, { useState } from "react";
import logo from "../../assets/images/logo1.png";
import CustomSvg from "../svgs/CustomSvg";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../apiRequests/requestApi";
import { useUser } from "../../utils/hooks";

export default function ForgotPassword() {
  const { setUserDetails, user } = useUser();
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);

  const goToVerifyEmail = () => navigateTo("/forgot-password/verify-email");

  const [email, setEmail] = useState("");

  const submit = async () => {
    try {
      setUserDetails({ ...user, email });
      const response = await forgotPassword({ email });
      console.log(response);
      goToVerifyEmail();
    } catch (error) {
      alert("Something went wrong try again");
      console.error(error);
    }
  };

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
            Forgot <span className="email-verify-email-txt">Password?</span>
          </h1>

          <p className="m-0 p-0 mb-5 opacity-_7 font-family-poppins txt-small font-weight-300 txt-FFF">
            Enter an email address to get an OTP code to reset your password
          </p>

          <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
            <div style={{ width: "3%" }}>
              <CustomSvg name="mail" />
            </div>
            <input
              style={{ width: "94%" }}
              placeholder="Enter your email address"
              className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
              onChange={(e) => setEmail(e.target.value)}
            />
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
    </div>
  );
}
