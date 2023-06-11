import { Theme, Header, HeaderName, Grid, Row, Column } from "@carbon/react";
import { APP_NAME, APP_THEME } from "../../utils/constants";

const LoginLayout = ({ children }) => {
  return (
    <Theme theme={APP_THEME}>
      <Header aria-label={APP_NAME}>
        <HeaderName href="#" prefix="IBM">
          {APP_NAME}
        </HeaderName>
      </Header>
      <div
        className="login-container"
        style={{
          background: `var(--color-black) url('/images/circuit_primary_b.svg') no-repeat right center`,
          backgroundSize: "contain",
        }}
      >
        <Grid>
          <Row>
            <Column md={{ offset: 1 }} className="login-content">
              {children}
            </Column>
          </Row>
        </Grid>
      </div>
    </Theme>
  );
};

export default LoginLayout;
