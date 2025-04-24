import {IconArrowLeft} from "icons";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(-1)}
      className="fixed top-6 left-6 z-50 cursor-pointer text-white transition"
      >
      <IconArrowLeft size="24" />
    </div>
  );
}

export default BackButton;