import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { clientToken } from "../utils/client";

const useToken = () => {
  const [isAccount, setIsAccount] = useState(false);
  const [errorResponse, setErrorResponse] = useState({});

  const { isLoading: isLogin, mutate: login } = useMutation(
    async (credentials) => {
      // console.log(credentials);
      setErrorResponse({});
      return await clientToken.post("/api/v1/auth/authenticate", credentials);
    },
    {
      onSuccess: (res) => {
        console.log("token : ",res);
        localStorage.setItem("kafka-console-auth-token", res.data); //token
        setIsAccount(true);
      },
      onError: (err) => {
        console.log(err, err.response.data);
        setErrorResponse(err.response.data);
        setIsAccount(false);
        localStorage.setItem(null);
      },
    }
  );

  useEffect(() => {
    if (isLogin) console.log("loading token ...");
  }, [isLogin]);

  return { login, isAccount, errorResponse, setErrorResponse };
};

export default useToken;