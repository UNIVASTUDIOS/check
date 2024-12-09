import React, { useEffect, useState } from "react";
import CustomSvg from "../svgs/CustomSvg";
import { useUser } from "../../utils/hooks";
import { postRequest } from "../apiRequests/requestApi";
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import * as yup from 'yup'
import { EMAIL_REGEX } from "../helpers/regex";
import CustomErrorMsg from "../errorMsg/CustomErrorMsg";
import { Spinner } from "react-bootstrap";

export default function Help() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState();
  const [message, setMessage] = useState();
  const [apiReqs, setApiReqs] = useState({ isLoading: false, data: null, errorMsg: null })

  const validationSchema = yup.object().shape({
    email: yup.string().matches(EMAIL_REGEX, "Must be a valid email address").required("Email required"),
    fullName: yup.string().max(50, "Cannot be more than 50 characters").required("Full name required"),
    message: yup.string().max(500, "Cannot be more than 500 characters").required("Message required")
  })

  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);

  const goToProfile = () => navigateTo("/user-profile");
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if(apiReqs.data && apiReqs.isLoading){
      const { data } = apiReqs
      submit({ requestBody: data })
    }
  }, [apiReqs])

  const submit = async ({ requestBody }) => {
    try {

      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'

      const response = await postRequest({
        url: "/contact",
        data: requestBody,
        token
      });
      console.log(response);
      alert("Message Successfully delivered");
      setApiReqs({ isLoading: false, data: null, errorMsg: null })
      goToProfile();

    } catch (error) {
      console.error(error);
      setApiReqs({ isLoading: false, data: null, errorMsg: "Error sending message" })
    }
  };

  return (
    <Formik
      validationSchema={validationSchema} 

      initialValues={{
        email: email || '', fullName: '', message: ''
      }}

      onSubmit={(values) => {
        setApiReqs({
          isLoading: true,
          data: values,
          errorMsg: null
        })
        
        return;
      }}
    >
      {
        ({ values, handleBlur, handleChange, isValid, dirty, handleSubmit }) => (
          <div className="dashboard py-lg-5 py-md-5 my-md-3 my-lg-3 my-0 py-2">
            <div className="d-flex w-100 align-items-center justify-content-center">
              <div className="col-lg-10">
                <h6 className="m-0 p-0 mb-4 txt-FFF font-family-poppins opacity-_7 font-weight-500 medium-txt">
                  Send us an email, we will help you
                </h6>

                {
                  apiReqs.errorMsg && <CustomErrorMsg errorMsg={apiReqs.errorMsg} verticalPadding={true} />
                }

                <div className="mb-4">
                  <div className="d-flex align-items-center register-input-container justify-content-between p-3">
                    <div style={{ width: "5%" }}>
                      <CustomSvg name="profile" />
                    </div>
                    <input
                      name="fullName"
                      style={{ width: "92%" }}
                      placeholder="Enter your fullName"
                      className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fullName}
                    />
                  </div>
                  <ErrorMessage 
                      name="fullName" 
                      render={
                          errorMsg => <CustomErrorMsg errorMsg={errorMsg} />
                          } 
                  />                                      
                </div>

                <div className="mb-4">
                  <div className="d-flex align-items-center register-input-container justify-content-between p-3">
                    <div style={{ width: "5%" }}>
                      <CustomSvg name="mail" />
                    </div>
                    <input
                      name="email"
                      style={{ width: "92%" }}
                      placeholder="Enter your email address"
                      className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                      value={email || values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                  <div className="d-flex align-items-start register-input-container justify-content-between p-3">
                    <div style={{ width: "5%" }}>
                      <CustomSvg name="mail" />
                    </div>
                    <textarea
                      name="message"
                      style={{ width: "92%", height: "30vh" }}
                      placeholder="Enter your message"
                      className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.message}
                    />
                  </div>
                  <ErrorMessage 
                      name="message" 
                      render={
                          errorMsg => <CustomErrorMsg errorMsg={errorMsg} />
                          } 
                  />                   
                </div>

                <div className="w-100 mb-3">
                  <button
                    type="submit"
                    disabled={(!(isValid && dirty) || apiReqs.isLoading)}
                    className="w-100 bg-BD3193 d-flex align-items-center justify-content-center p-3"
                    onClick={handleSubmit}
                    style={{
                      opacity: !(isValid && dirty) || apiReqs.isLoading ? 0.5 : 1
                    }}
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
                              Send
                            </p>
                            <div className="m-0 p-0 mx-2 d-flex align-items-center">
                              <CustomSvg name={"arrow-right"} />
                            </div>                          
                          </>
                      }
                    </>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </Formik>
  );
}
