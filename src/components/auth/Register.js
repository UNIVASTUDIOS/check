import "./css/auth.css";
import logo from "../../assets/images/logo1.png";
import carouselImg1 from "../../assets/images/registerCarouselImg1.png";
import { ErrorMessage, Formik } from 'formik'
import CustomSvg from "../svgs/CustomSvg";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaPhone } from "react-icons/fa6";
import { Carousel, Spinner } from "react-bootstrap";
import SuccessModal from "./auxiliary/SuccessModal";
import { register, SendEmailOTP } from "../apiRequests/requestApi";
import { useUser } from "../../utils/hooks";
import CustomErrorMsg from "../errorMsg/CustomErrorMsg";
import * as yup from 'yup'
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { EMAIL_REGEX, ONLY_NUMBERS_REGEX } from "../helpers/regex";
import ScrollTo from "../scroll/ScrollTo";

const carouselItems = [
  {
    img: carouselImg1,
    caption:
      "Play classics like Scrabble, WHOT, Chess, and Snooker with friends and family while betting to win big.",
  },
];

export default function Register({ navigateTo }) {

  const goToVerifyEmail = () => navigateTo("/email-verification");
  const goToLogin = () => navigateTo("/login");


  const { setUserDetails, user } = useUser();


  const validationSchema = yup.object().shape({
    email: yup.string().required('Email required').matches(EMAIL_REGEX, 'Must be a valid email address'),
    phoneNumber: yup.string().required('Phone number required').matches(ONLY_NUMBERS_REGEX, 'Must be only numbers'),
    username: yup.string().min('3', 'Must be up to 3 characters').max(20, 'Must be less than 20 characters').required('Username required'),
    password: yup.string().required('Password required'),
    confirmPassword: yup.string().required('Confirm password required').oneOf([yup.ref('password'), null], 'Passwords must match')
  })

  const [referralCode, setRefferalCode] = useState(null);
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [successModal, setSuccessModal] = useState({
    visible: false,
    onHide: null,
    size: "md",
  });


  useEffect(() => {
    if(apiReqs.data && apiReqs.isLoading){
      const { data } = apiReqs
      submit({ requestBody: data })
    }
  }, [apiReqs])


  const submit = async ({ requestBody }) => {
    try {

      const { dob, email } = requestBody

      // const dateParts = new at;
      // const day = dateParts[2];
      // const month = dateParts[1];
      // const year = dateParts[0];

      const formattedDate = new Date(dob).toLocaleDateString('en-US')

      const details = {
        ...requestBody,
        dob: formattedDate,
        referralCode,
      };

      console.log(details);

      const response = await register(details);

      console.log(response);

      const tokens = {...response.data}
      localStorage.setItem("token", tokens);
      setUserDetails({
        ...user, email 
      });
      openSuccessModal();

      const otpResponse = await SendEmailOTP(email);
      console.log(otpResponse);

      return setApiReqs({ isLoading: false, data: null, errorMsg: null })

    } catch (error) {
      console.log(error)
      setApiReqs({ isLoading: false, data: null, errorMsg: error && error.message ? error.message : 'Unexpected Error' })
    }
  };


  const onFocusDobPicker = (e) => {
    e.target.type = "date";
    e.target.showPicker();
  };

  const onBlurDobPicker = (e) => {
    e.target.type = "text";
  };

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible((prev) => !prev);

  const openSuccessModal = () =>
    setSuccessModal({ visible: true, onHide: hideSuccessModal, size: "md" });
  const hideSuccessModal = () =>
    setSuccessModal({ visible: false, onHide: null, size: "md" });

  const toggleTermsAgreement = () => setTermsAgreed(prev => !prev)

  const displayCarouselItems = carouselItems.map((item, i) => {
    const { img, caption } = item;

    return (
      <div
        key={i}
        className="d-flex align-items-center justify-content-center flex-column py-5"
      >
        <div className="col-lg-6 d-flex align-items-center justify-content-center mb-5">
          <img src={img} className="col-lg-12" alt="" />
        </div>

        <p className="small-txt txt-F7FAFF font-weight-400 line-height-30 m-0 p-0 font-family-poppins text-center">
          {caption}
        </p>
      </div>
    );
  });

  return (
    <ScrollTo
      condition={apiReqs.errorMsg}
    >
      <div className="register-bg py-4 px-lg-5 px-md-5 px-3">
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

        <div className="d-lg-flex d-md-flex d-block justify-content-between align-items-center">
          <div className="col-lg-5 col-md-12 col-12">
            <h1 className="m-0 p-0 extra-large-txt txt-FFF font-weight-500 mb-4 font-family-quantico">
              Register your <span className="register-acct-txt">Account</span>
            </h1>
            <p className="m-0 p-0 small-txt txt-FFF opacity-_7 font-family-poppins font-weight-300 mb-4">
              New here! Create a new account
            </p>

            {
              apiReqs.errorMsg && <div className="mb-4"><CustomErrorMsg errorMsg={apiReqs.errorMsg} /></div>
            }

            <Formik
              validationSchema={validationSchema}

              initialValues={{
                username: '', email: '', dob: '', password: '', confirmPassword: '', phoneNumber: ''
              }}

              onSubmit={(values) => {

                const { username, email, dob, password, phoneNumber } = values

                if(!termsAgreed){
                  return setApiReqs({ isLoading: false, data: null, errorMsg: 'Agree to the terms and conditions to proceed' })
                }

                return setApiReqs({ 
                  isLoading: true,
                  errorMsg: null,
                  data: {
                    username, email, dob, password, phoneNumber
                  }
                })
              }}

            >
              {({ isValid, dirty, handleBlur, handleChange, handleSubmit, values }) => (
                <>
                  <div className="mb-3 w-100">
                    <div className="mb-4">
                      <div className="d-flex align-items-center register-input-container justify-content-between p-2">
                        <div style={{ width: "3%" }}>
                          <CustomSvg name="profile" />
                        </div>
                        <input
                          name="username"
                          style={{ width: "94%" }}
                          placeholder="Enter your username"
                          className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                        />                   
                      </div>
                      <ErrorMessage 
                          name="username" 
                          render={
                              errorMsg => <CustomErrorMsg errorMsg={errorMsg} />
                              } 
                      /> 
                    </div>
                    <div className="mb-4">
                      <div className="d-flex align-items-center register-input-container justify-content-between p-2">
                        <div style={{ width: "3%" }}>
                          <CustomSvg name="mail" />
                        </div>
                        <input
                          style={{ width: "94%" }}
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          placeholder="Enter your email address"
                          className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                        />                    
                      </div>
                      <ErrorMessage 
                          name="email" 
                          render={
                              errorMsg => <CustomErrorMsg errorMsg={errorMsg} />
                              } 
                      /> 
                    </div>
                    <div className="mb-4">
                      <div className="d-flex align-items-center register-input-container justify-content-between p-2">
                        <div style={{ width: "3%" }}>
                          <FaPhone size={16} color={"#fff"} />
                        </div>
                        <input
                          style={{ width: "94%" }}
                          type="number"                
                          name="phoneNumber"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phoneNumber}
                          placeholder="Enter your phone number"
                          className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                        />                    
                      </div>
                      <ErrorMessage 
                          name="phoneNumber" 
                          render={
                              errorMsg => <CustomErrorMsg errorMsg={errorMsg} />
                              } 
                      /> 
                    </div>                  
                    <div className="mb-4">
                      <div className="clickable d-flex align-items-center register-input-container justify-content-between p-2">
                        <div style={{ width: "3%" }}>
                          <CustomSvg name="calendar" />
                        </div>
                        <input
                          name="dob"
                          type="text"
                          style={{ width: "88%" }}
                          onChange={handleChange}
                          onFocus={onFocusDobPicker}
                          value={values.dob}
                          onBlur={onBlurDobPicker}
                          placeholder="Select your date of birth"
                          className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico clickable"
                        />
                        <div
                          style={{ width: "3%" }}
                          className="d-flex jusitfy-content-start"
                        >
                          <CustomSvg name="caret-down" />
                        </div>
                      </div>
                      <ErrorMessage 
                          name="dob" 
                          render={
                              errorMsg => <CustomErrorMsg errorMsg={errorMsg} />
                              } 
                      />                   
                    </div>
                    <div className="mb-4">
                      <div className="d-flex align-items-center register-input-container justify-content-between p-2">
                        <div style={{ width: "3%" }}>
                          <CustomSvg name="lock" />
                        </div>
                        <input
                          name="password"
                          type={passwordVisible ? "text" : "password"}
                          style={{ width: "88%" }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
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
                      <ErrorMessage 
                          name="password" 
                          render={
                              errorMsg => <CustomErrorMsg errorMsg={errorMsg} />
                              } 
                      /> 
                    </div>
                    <div>
                      <div className="d-flex align-items-center register-input-container justify-content-between p-2">
                        <div style={{ width: "3%" }}>
                          <CustomSvg name="lock" />
                        </div>
                        <input
                          name="confirmPassword"
                          type={confirmPasswordVisible ? "text" : "password"}
                          style={{ width: "88%" }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confirmPassword}
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
                      <ErrorMessage 
                          name="confirmPassword" 
                          render={
                              errorMsg => <CustomErrorMsg errorMsg={errorMsg} />
                              } 
                      />                     
                    </div>
                  </div>

                  <div className="d-flex justify-content-start mb-5">
                    <div className="d-flex align-items-center">
                      <div className="clickable" onClick={toggleTermsAgreement}>
                        {
                          termsAgreed
                          ?
                            <MdOutlineCheckBox color="#FFF" size={15} />
                          :
                            <MdOutlineCheckBoxOutlineBlank color="#FFF" size={15} />
                        }
                      </div>
                      <p className="font-weight-400 small-txt txt-FFF text-start font-family-poppins m-0 p-0 mx-2">
                        By checking the box you agree to our{" "}
                        <span className="txt-BD3193 opacity-_7">Terms</span> and{" "}
                        <span className="txt-BD3193 opacity-_7">Conditions</span>.
                      </p>
                    </div>
                  </div>

                  <div className="w-100 mb-3">
                    <button
                      style={{
                        opacity: (!(isValid && dirty) || apiReqs.isLoading) ? 0.5 : 1
                      }}
                      onClick={handleSubmit}
                      disabled={(!(isValid && dirty) || apiReqs.isLoading)}
                      className="w-100 bg-BD3193 d-flex align-items-center justify-content-center p-2"
                    >
                      <>
                        { 
                          apiReqs.isLoading
                          ?
                            <div className="py-1">
                              <Spinner size="sm" variant="light" />
                            </div>
                          :
                            <>
                              <p className="p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1">
                                Register
                              </p>
                              <div className="m-0 p-0 mx-2 d-flex align-items-center">
                                <CustomSvg name={"arrow-right"} />
                              </div>
                            </>                          
                        }
                      </>
                    </button>
                  </div>
                </>
              )}
            </Formik>

            <div
              onClick={goToLogin}
              className="d-flex align-items-center justify-content-center"
            >
              <p className="clickable font-weight-400 small-txt txt-FFF text-start font-family-poppins m-0 p-0 mx-2">
                Already have an account?{" "}
                <span className="txt-BD3193 opacity-_7">Login</span>.
              </p>
            </div>
          </div>

          <div className="col-lg-6 d-lg-flex d-md-none d-none justify-content-center align-items-center">
            <div className="col-lg-10 register-carousel-container px-4 py-5">
              <Carousel controls={false}>{displayCarouselItems}</Carousel>
            </div>
          </div>
        </div>

        <SuccessModal
          modalProps={successModal}
          redirectFunc={goToVerifyEmail}
          subTxt="Registration completed, we are redirecting you..."
        />
      </div>
    </ ScrollTo>
  );
}
