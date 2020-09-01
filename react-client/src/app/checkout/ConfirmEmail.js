import React from "react";
import { Button, Header, Segment } from "semantic-ui-react";

const ConfirmEmail = ({ registeredEmail }) => {
  return (
    <div className="confirm-email">
      <Segment vertical>
        <Header as="h2">
          Order confirmation e-mail sent to: {registeredEmail}
        </Header>
      </Segment>
      <Segment vertical>
        <Button></Button>
      </Segment>
    </div>
  );
};

export default ConfirmEmail;
