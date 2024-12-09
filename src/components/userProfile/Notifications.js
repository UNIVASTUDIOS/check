import React, { useEffect, useState } from "react";
import img1 from "../../assets/images/userProfile1.png";
import logo from "../../assets/images/logowithname.svg";
import { getRequest, refreshToken } from "../apiRequests/requestApi";
import { formatDateString } from "../../utils";
import { Spinner } from "react-bootstrap";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get = async () => {
      try {
        const response = await getRequest("/notifications");
        console.log(response);

        if (!response.data) {
          setNotifications(null);
        }

        const data = response.data;

        const newArray = data.map(({ image, body, createdAt }) => ({
          image,
          text: body,
          date: formatDateString(createdAt, "long"),
          senderProfile: img1,
          type: "normal",
        }));

        const ad = await refreshToken();

        console.log(ad);

        setNotifications(newArray);
        console.log({});
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    get();
  }, []);

  // Note Alfred needs to update the notifications to include type

  const displayNotifications = notifications?.map((notify, i) => {
    const { text, date, senderProfile, type } = notify;

    return (
      <div
        key={i}
        className="d-lg-flex d-md-flex d-block align-items-center mb-4"
      >
        <div className="d-lg-block d-md-block d-flex align-items-center justify-content-start mb-lg-0 mb-md-0 mb-2">
          <div
            className={`${
              senderProfile === "skyBoard"
                ? "col-lg-12"
                : "bg-FFD2B1 rounded-circle d-flex align-items-center justify-content-center p-1"
            }`}
          >
            <img
              className={`${senderProfile === "skyBoard" && "col-lg-12"}`}
              src={senderProfile === "skyBoard" ? logo : senderProfile}
              alt="skyBoard"
            />
          </div>
        </div>

        <div className="mx-lg-4 mx-md-4 mx-0 w-100">
          <h4 className="m-0 p-0 mb-2 regular-txt font-family-poppins txt-FFF font-weight-400 opacity-_8">
            {text}
          </h4>
          <p className="m-0 p-0 txt-BD3193 font-weight-400 font-family-poppins opacity-_7 line-height-18">
            {date}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="dashboard py-lg-5 py-md-5 my-md-3 my-lg-3 my-0 py-2">
      {loading ? (
        <div className="d-flex align-items-center">
          <p className="m-0 p-0 txt-FFF font-weight-600 font-family-poppins small-txt">
            Retrieving notifications...
          </p>
          <div className="mx-2">
            <Spinner size="sm" variant="light" />
          </div>
        </div>
      ) : notifications && notifications.length > 0 ? (
        <div>{displayNotifications}</div>
      ) : (
        <p className="m-0 p-0 txt-FFF font-weight-600 font-family-poppins small-txt">
          No notifications found
        </p>
      )}
    </div>
  );
}
