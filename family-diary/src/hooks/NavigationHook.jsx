// hooks/useAppNavigation.js

import { useNavigate } from "react-router-dom";

export default function useAppNavigation() {
  const navigate = useNavigate();

  const push = (path) => {
    navigate(path);
  };

  const back = () => {
    navigate(-1);
  };

  return {
    push,
    back,
  };
}
