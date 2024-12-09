import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import CustomSvg from "../svgs/CustomSvg";
import "./css/payment.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SuccessModal from "../auth/auxiliary/SuccessModal";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/hooks";

export default function WithdrawModal({ modalProps }) {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successModal, setSuccessModal] = useState({
    visible: false,
    onHide: null,
    size: "md",
  });

  const { user } = useUser();

  const { walletBalance } = user;

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const openSuccessModal = () =>
    setSuccessModal({ visible: true, onHide: hideSuccessModal, size: "md" });
  const hideSuccessModal = () =>
    setSuccessModal({ visible: false, onHide: null, size: "md" });

  if (modalProps) {
    const { size, onHide, visible } = modalProps;

    const goHome = () => {
      hideSuccessModal();
      onHide();
      return navigateTo("/");
    };

    return (
      <Modal show={visible} size={size} onHide={onHide} centered={true}>
        <div className="py-4 px-4 mx-3">
          <div
            onClick={onHide}
            className="d-flex align-items-center justify-content-end mb-4 clickable"
          >
            <CustomSvg name="x" />
          </div>

          <h4 className="p-0 m-0 mb-4 txt-130828 text-center font-family-quantico font-weight-700 line-height-30 letter-spacing-_32 medium-txt">
            Withdraw Money
          </h4>

          <div className="withdraw-modal-balance-container p-3 mb-4">
            <p className="m-0 p-0 mb-2 font-weight-500 small-txt font-family-poppins txt-FFF text-center">
              Available Balance
            </p>
            <h4 className="m-0 p-0 regular-txt txt-FFF font-weight-700 font-family-poppins text-center">
              ₦{walletBalance / 100}
            </h4>
          </div>

          <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
            <div style={{ width: "3%" }}>
              <CustomSvg name="money" />
            </div>
            <input
              style={{ width: "92%" }}
              placeholder="Minimum withdrawal amount (2000)"
              className="txt-000 mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
            />
          </div>

          <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
            <div style={{ width: "3%" }}>
              <CustomSvg name="lock" color="#000" />
            </div>
            <input
              type={passwordVisible ? "text" : "password"}
              style={{ width: "84%" }}
              placeholder="Enter your password"
              className="txt-000 mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
            />
            <div
              style={{ width: "3%" }}
              className="d-flex jusitfy-content-start clickable"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <FiEye size={30} color="#000" />
              ) : (
                <FiEyeOff size={30} color="#000" />
              )}
            </div>
          </div>

          <button
            onClick={openSuccessModal}
            className="w-100 bg-BD3193 d-flex align-items-center justify-content-center p-2 mb-5"
          >
            <p className="p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1">
              Withdraw
            </p>
            <div className="m-0 p-0 mx-2 d-flex align-items-center">
              <CustomSvg name={"arrow-right"} />
            </div>
          </button>
        </div>

        <SuccessModal
          modalProps={successModal}
          redirectFunc={goHome}
          subTxt="Withdrawal successful, we are redirecting you..."
        />
      </Modal>
    );
  }

  return <></>;
}
