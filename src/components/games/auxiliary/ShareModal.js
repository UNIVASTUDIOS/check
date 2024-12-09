import { Modal } from "react-bootstrap";
import CustomSvg from "../../svgs/CustomSvg";
import facebook from "../../../assets/images/facebook.png";
import twitter from "../../../assets/images/twitter.png";
import tiktok from "../../../assets/images/tiktok.png";
import weChat from "../../../assets/images/weChat.png";
import sms from "../../../assets/images/sms.png";
import instagram from "../../../assets/images/instagram.png";
import yahooMail from "../../../assets/images/yahooMail.png";
import whatsApp from "../../../assets/images/whatsApp.png";
import { useGames, useUser } from "../../../utils/hooks";

const dummy = () => {
  console.log("Just a handleCopy");
};

export default function ShareModal({ modalProps }) {
  const { lobbyCode, gameId } = useGames();
  const { user } = useUser();

  const ShareButton = () => {
    const message = encodeURIComponent(
      `You are invited to play ${gameId} with ${user?.username} This is the lobby code ${lobbyCode?.code}. Register and supply the code at this link https://skyboardgames.com/user_dashboard/#/games/join-lobby`
    );
    // const link = encodeURIComponent("https://example.com");
    const whatsappUrl = `https://wa.me/?text=${message}`;

    window.open(whatsappUrl, "_blank");
  };

  const tiktokShare = () => {
    handleCopy();
    window.open("https://www.tiktok.com/", "_blank");
  };

  const facebookShare = () => {
    handleCopy();
    window.open("https://web.facebook.com/", "_blank");
  };

  const twitterShare = () => {
    handleCopy();
    window.open("https://x.com/", "_blank");
  };

  const instagramShare = () => {
    handleCopy();
    window.open("https://www.instagram.com/", "_blank");
  };

  const handleCopy = () => {
    console.log(lobbyCode);
    navigator.clipboard
      .writeText(
        `You are invited to play ${gameId} with ${user?.username}.
         This is the lobby code ${lobbyCode?.code}. Register and supply the code at this link https://skyboardgames.com/user_dashboard/#/games/join-lobby`
      )
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const mediaHandles1 = [
    {
      name: "WhatsApp",
      img: whatsApp,
      share: ShareButton,
    },
    {
      name: "Twitter",
      img: twitter,
      share: twitterShare,
    },
    {
      name: "Facebook",
      img: facebook,
      share: facebookShare,
    },
    {
      name: "Instagram",
      img: instagram,
      share: instagramShare,
    },
  ];

  const mediaHandles2 = [
    {
      name: "Yahoo",
      img: yahooMail,
      share: handleCopy,
    },
    {
      name: "Tiktok",
      img: tiktok,
      share: tiktokShare,
    },
    {
      name: "Chat",
      img: sms,
      share: handleCopy,
    },
    {
      name: "WeChat",
      img: weChat,
      share: handleCopy,
    },
  ];
  if (modalProps) {
    const { visible, onHide, size } = modalProps;

    const displayMediaHandles = ({ handles }) =>
      handles.map((handle, i) => {
        const { name, img, share } = handle;

        return (
          <div key={i} className="col-lg-2">
            <div
              className="d-flex align-items-center justify-content-center mb-1"
              onClick={share}
            >
              <img src={img} alt="" />
            </div>
            <p className="text-center m-0 p-0 txt-000 font-family-source-sans extra-small-txt font-weight-600">
              {name}
            </p>
          </div>
        );
      });

    return (
      <Modal
        show={visible}
        onHide={onHide}
        size={size ? size : "sm"}
        centered={true}
      >
        <div className="py-4 px-4 mx-3">
          <div
            onClick={onHide}
            className="d-flex align-items-center justify-content-end mb-2 clickable"
          >
            <CustomSvg name="x" />
          </div>

          <h4 className="p-0 m-0 mb-4 txt-130828 text-center font-family-quantico font-weight-700 line-height-30 letter-spacing-_32 medium-txt">
            Share With Friends
          </h4>

          <div className="d-flex align-items-center justify-content-between mb-4">
            {displayMediaHandles({ handles: mediaHandles1 })}
          </div>

          <div className="d-flex align-items-center justify-content-between pb-4">
            {displayMediaHandles({ handles: mediaHandles2 })}
          </div>
        </div>
      </Modal>
    );
  }

  return <></>;
}
