import { useState, useRef, useEffect } from "react";
import "./css/auth.css";
import logo from "../../assets/images/logo1.png";
import CustomSvg from "../svgs/CustomSvg";
import { useNavigate } from "react-router-dom";
import { verifyOTP } from "../apiRequests/requestApi";
import { useUser } from "../../utils/hooks";
import { Spinner } from "react-bootstrap";
import CustomErrorMsg from "../errorMsg/CustomErrorMsg";
import ScrollTo from "../scroll/ScrollTo";

export default function EmailVerification({ type }) {
  const { user, setCode } = useUser();

  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);

  const goToDashboard = () => navigateTo("/");
  const goToSelectAvatar = () => navigateTo("/select-avatar");
  const goToResetPassword = () => navigateTo("/forgot-password/reset-password");
  const goToRegister = () => navigateTo("/register");

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

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

  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);


  useEffect(() => {
    if(apiReqs.data && apiReqs.isLoading){
      const { data } = apiReqs
      submitOtp({ requestBody: data })
    }
  }, [apiReqs])


  const onBtnClick = () => {
    const code = otp.join("");

    setCode(code);
    setApiReqs({ isLoading: true, data: { otp: code }, errorMsg: null })
  }

  const submitOtp = async ({ requestBody }) => {
    try {

      const details = {
        email: user?.email,
        ...requestBody
      };

      console.log(details);

      const response = await verifyOTP(details);

      console.log(response);
      if (type === "resetPassword") {
        return goToResetPassword();
      }

      if (type === "activateAcct") {
        return goToSelectAvatar();
      }

      setApiReqs({ isLoading: false, data: null, errorMsg: null })

    } catch (error) {
      if (error.message) {
        setApiReqs({ isLoading: false, data: null, errorMsg: 'OTP is incorrect'})
      } 
      else {
        setApiReqs({ isLoading: false, data: null, errorMsg: 'Network Error'})
      }

      console.error(error);
    }
  };

  return (
    <ScrollTo
      condition={apiReqs.errorMsg}
    >
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
            {type === "resetPassword" ? (
              <h1 className="m-0 p-0 mb-4 font-weight-700 font-family-quantico txt-FFF extra-large-txt">
                Email <span className="email-verify-email-txt">Sent</span>
              </h1>
            ) : (
              <h1 className="m-0 p-0 mb-4 font-weight-700 font-family-quantico txt-FFF extra-large-txt">
                Verify <span className="email-verify-email-txt">Email</span>
              </h1>
            )}

            <p className="m-0 p-0 mb-5 opacity-_7 font-family-poppins txt-small font-weight-300 txt-FFF">
              We’ve sent the OTP verification code to your email address. Check
              your email and enter the code below
            </p>

            {
              apiReqs.errorMsg && <CustomErrorMsg errorMsg={apiReqs.errorMsg} verticalPadding={true} />
            }

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
              onClick={onBtnClick}
              disabled={apiReqs.isLoading ? true : false}
              style={{
                opacity: apiReqs.isLoading ? 0.5 : 1
              }}
              className="w-100 bg-BD3193 d-flex align-items-center justify-content-center p-2 mb-5"
            >
              <>
                {
                  apiReqs.isLoading
                  ?
                    <div className="py-1">
                      <Spinner variant="light" size="sm" />
                    </div>
                  :
                    <>
                      <p className="p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1">
                        Continue
                      </p>
                      <div className="m-0 p-0 mx-2 d-flex align-items-center">
                        <CustomSvg name={"arrow-right"} />
                      </div>                  
                    </>
                }
              </>
            </button>

            <div>
              <p className="p-0 m-0 opacity-_8 text-center letter-spacing-_22 line-height-30 font-weight-300 small-txt txt-FFF font-family-poppins">
                Didn’t receive email? <br /> You can resend code in{" "}
                <span className="txt-BD3193">{countdown}s</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollTo>
  );
}
