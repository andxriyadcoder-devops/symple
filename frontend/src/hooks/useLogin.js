import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth.service";

const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export default useLogin;