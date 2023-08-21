import { useEffect, useState } from "react";
import Router from "./utils/router";
import useToken from "./hooks/useToken";

import Login from "./pages/Login/Login";

const verifyAuthToken = (token) => {
  if (!token) {
    return false;
  }

  try {
    const decodedJwt = JSON.parse(atob(token.split('.')[1]));
    return decodedJwt.exp * 1000 > Date.now();
  } catch (e) {
    return null;
  }
};

function App() {

  const authToken = localStorage.getItem("kafka-console-auth-token");
  const isAuthTokenValid = verifyAuthToken(authToken);
  const allowLocalhostLogin = window.location.hostname === "localhost" && isAuthTokenValid;

  const [hasAccess, setHasAccess] = useState(isAuthTokenValid);
  const { login, isAccount } = useToken();

  useEffect(() => {
    setHasAccess(isAccount || isAuthTokenValid);
    return () => {
      setHasAccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAccount]);

  return (
    <>
      {
        hasAccess || allowLocalhostLogin ?
          <div className="App">
            <Router />
          </div>
          :
         <Login></Login>
      }
    </>
  );
}

export default App;