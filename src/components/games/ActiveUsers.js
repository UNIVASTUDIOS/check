import CustomSvg from "../svgs/CustomSvg";
import { IoMdShare } from "react-icons/io";
import { useState } from "react";
import DisplayUsers from "./auxiliary/DisplayUsers";
import ShareModal from "./auxiliary/ShareModal";
import { allUsers } from "./auxiliary/gamesAux";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/hooks";

export default function ActiveUsers({ btnTxt, btnFunc }) {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);

  const [shareModal, setShareModal] = useState({
    visible: false,
    onHide: null,
    size: "md",
  });

  const openShareModal = () =>
    setShareModal({ visible: true, onHide: hideShareModal, size: "md" });
  const hideShareModal = () =>
    setShareModal({ visible: false, onHide: null, size: "md" });

  const { user } = useUser();

  return (
    <div className="d-flex w-100">
      <div className="w-100">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="m-0 p-0 font-weight-700 font-family-quantico txt-large txt-FFF">
            Active <span className="create-lobby-title-span">Users</span>
          </h1>
          <div className="clickable" onClick={openShareModal}>
            <IoMdShare color="#FFF" size={30} />
          </div>
        </div>
        <div>
          <DisplayUsers
            users={[user]}
            btnTxt={btnTxt || "share"}
            btnFunc={btnFunc}
          />
        </div>
      </div>

      <ShareModal modalProps={shareModal} />
    </div>
  );
}
