import React from "react";
import { Segment, Container, Header } from "semantic-ui-react";

const AppFooter = () => {
  return (
    <div className="footer">
      <Segment inverted vertical style={{ padding: "2em 0em" }}>
        <Container>
          <Header inverted as="h3" content="Like this website?" />
          <Header inverted as="h4">
            Check out the git repository{" "}
            <a href="https://github.com/Harrison-Hughes/fish-man-dan-stripped">
              here
            </a>
            , or compliment me via e-mail{" "}
            <a href="mailto:harr.hughes@gmail.com">here</a>.
          </Header>
        </Container>
      </Segment>
    </div>
  );
};

export default AppFooter;
