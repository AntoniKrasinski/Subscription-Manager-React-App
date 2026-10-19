import { useLogout } from "../../../../lib/auth";
import { useNavigate } from "react-router";

const LogOutButton = () => {
  const navigate = useNavigate();
  const logoutMutatuon = useLogout({
    onSuccess: () => {
      navigate("/login");
    },
  });
  return (
    <button
      className="min-h-11 w-full cursor-pointer rounded-xl border border-border  py-2 pl-4 text-left text-text-muted "
      onClick={() => logoutMutatuon.mutate()}
    >
      Log out
    </button>
  );
};

export default LogOutButton;
