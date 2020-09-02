import React from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

const ConfirmEmail = ({ registeredEmail }) => {
  const BackToBrowseButton = withRouter(({ history }) => (
    <Button
      onClick={() => {
        history.push("/");
      }}
    >
      Back to homepage
    </Button>
  ));

  return (
    <div className="confirm-email">
      <Segment vertical>
        <Header as="h2">
          Order confirmation e-mail sent to: {registeredEmail}
        </Header>
      </Segment>
      <Segment vertical>
        <BackToBrowseButton />
      </Segment>
    </div>
  );
};

export default ConfirmEmail;
