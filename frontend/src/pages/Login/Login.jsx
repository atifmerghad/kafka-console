// import TextInput from "../../components/FormControls/TextInput";
import LoginLayout from "../../components/LoginLayout/LoginLayout";
import { TextInput, Button, PasswordInput, Link } from "@carbon/react";
import { useEffect, useState } from "react";

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [isAsyncInProgress, setIsAsyncInProgress] = useState(false);
  const login = false;
  const isAccount = false;

  useEffect(() => {
    console.log("isaccount updates ", isAccount);
    if (isAccount) {
      completeLogin();
    }
    return () => setIsAsyncInProgress(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAccount]);

  const handleConsoleIDChange = (e) => {
    setInvalidEmail(false);
    setUserEmail(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };
  const handleLogin = () => {
    login();
  }

  const completeLogin = () => {
   // navigate(routes.DASHBOARD);
  };

  return (
    <LoginLayout>
      <div className="">
        <img src="/images/logo.svg" alt="Console logo" width="26%" height="auto" />
        <h3 className="title">
          Kafka <strong>Orchestration Hub</strong>
        </h3>
        <h6 className="title-desc">Login using your Console credentials.</h6>
      </div>
      <div style={{ margin: "2rem 0 1rem", width:"max-content" }}>
        <TextInput
          size="md"
          id="login-ibm-id"
          placeholder="username@Console.com"
          labelText="Email ID"
          invalidText="Incorrect email address"
          invalid={invalidEmail}
          value={userEmail}
          autoFocus
          onChange={handleConsoleIDChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <PasswordInput
        type="password"
        size="md"
        id="password"
        value={userPassword}
        placeholder="password"
        labelText="Password"
        onChange={handlePasswordChange}
        onKeyDown={handleKeyDown}
        disabled={isAsyncInProgress}
      />
      <Button className="login-btn" onClick={handleLogin}>
        <span>Login</span>
      </Button>
      <Link href="#" className="forgot-link">Forgot password?</Link>
    </LoginLayout>
  );
};

export default Login;
