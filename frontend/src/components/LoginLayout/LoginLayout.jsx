import { Theme, Header, HeaderName, Grid, Row, Column } from "@carbon/react";

const LoginLayout = ({ children }) => {
  return (
    <Theme theme="g100">
      <Header aria-label={`Kafka Console}`}>
        <HeaderName href="#" prefix="Kafka">
          Console Manager
        </HeaderName>
      </Header>
      <div className="login-container">
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
