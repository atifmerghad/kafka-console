// import TextInput from "../../Components/FormControls/TextInput";
import LoginLayout from "../../components/LoginLayout/LoginLayout";
import {
  TextInput,
  Button,
  PasswordInput,
  Link,
  InlineNotification,
  NotificationActionButton,
} from "@carbon/react";
import { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import routes from "../../utils/routes";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [isAsyncInProgress, setIsAsyncInProgress] = useState(false);
  const { login, isAccount, errorResponse, setErrorResponse } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isaccount updates ", isAccount);
    if (!isAccount) {
      completeLogin();
    }
    return () => setIsAsyncInProgress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAccount, errorResponse]);

  const handleKafkaConsoleIDChange = (e) => {
    setInvalidEmail(false);
    setErrorResponse(false);
    setUserEmail(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      //handleLogin();
    }
  };

  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleLogin = () => {
    navigate(routes.DASHBOARD);
    login({
      username: userEmail,
      password: userPassword,
    });
  };

  const completeLogin = () => {
   // navigate(routes.DASHBOARD);
  };

  const onErrorClose = () => {
    setUserEmail("");
    setUserPassword("");
  };

  return (
    <LoginLayout>
      <div>
        <img src="/images/kafka.svg" alt="KafkaConsole logo" width="26%" height="auto" />
        <h3 className="title">
          Kafka <strong>Console</strong>
        </h3>
        <h6 className="title-desc">Login using your credentials.</h6>
      </div>
      <div className="login-wrapper">
        {errorResponse["message"]?.length > 0 && (
          <InlineNotification
            kind="error"
            actions={<NotificationActionButton>Error</NotificationActionButton>}
            status="alert"
            title="Error: "
            subtitle={errorResponse?.message}
            onCloseButtonClick={onErrorClose}
          />
        )}
        <div className="user-input">
          <TextInput
            size="md"
            id="login-ibm-id"
            className="userid-input"
            placeholder="username@KafkaConsole.com"
            labelText="KafkaConsole ID"
            invalidText="Incorrect email address"
            invalid={invalidEmail}
            value={userEmail}
            autoFocus
            onChange={handleKafkaConsoleIDChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="user-input">
          <PasswordInput
            type="password"
            size="md"
            id="password"
            className="password-input"
            value={userPassword}
            placeholder="password"
            labelText="Password"
            onChange={handlePasswordChange}
            onKeyDown={handleKeyDown}
            disabled={isAsyncInProgress}
          />
        </div>
        <Button className="login-btn" onClick={handleLogin}>
          <span>Login</span>
        </Button>
        <Link to="#" className="forgot-link">
          Forgot password?
        </Link>
      </div>
    </LoginLayout>
  );
};

export default Login;